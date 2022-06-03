import type { Context } from '@actions/github/lib/context';
import type { Octokit } from '@technote-space/github-action-helper/dist/types';
import type { Logger } from '@technote-space/github-action-log-helper';
import { Utils } from '@technote-space/github-action-helper';
import { checkLinks } from './utils/check';
import { closeIssue, createIssue, getIssues } from './utils/issue';
import { getTargetLink, getIssueTitle, getHtmlCheckerOptions, isRecursive, getInterval } from './utils/misc';

export const execute = async(logger: Logger, octokit: Octokit, context: Context): Promise<void> => {
  logger.startProcess('Checking...');
  const { brokenLinks, notBrokenLinks } = await checkLinks(getTargetLink(), isRecursive(), getHtmlCheckerOptions(), logger);

  logger.startProcess('Get issues...');
  const issues = await getIssues(octokit, context);
  logger.info('count: %d', issues.length);

  logger.startProcess('Creating...');
  console.log(
    await brokenLinks.reduce(async(prev, link) => {
      const acc   = await prev;
      const title = await getIssueTitle(link.originalURL, context);
      if (issues.find(issue => issue.title === title)) {
        return acc;
      }

      if (acc.length) {
        await Utils.sleep(getInterval());
      }

      return acc.concat((await createIssue(link, octokit, context)).html_url);
    }, Promise.resolve([] as Array<string>)),
  );

  logger.startProcess('Closing...');
  console.log(
    await notBrokenLinks.reduce(async(prev, link) => {
      const acc     = await prev;
      const title   = await getIssueTitle(link, context);
      const targets = issues.filter(issue => issue.title === title);
      if (!targets.length) {
        return acc;
      }

      if (acc.length) {
        await Utils.sleep(getInterval());
      }

      await Promise.all(targets.map(issue => closeIssue(issue, octokit, context)));

      return acc.concat(link);
    }, Promise.resolve([] as Array<string>)),
  );

  logger.endProcess();
};
