import {Context} from '@actions/github/lib/context';
import {Octokit} from '@technote-space/github-action-helper/dist/types';
import {Logger, Utils} from '@technote-space/github-action-helper';
import {checkLinks} from './utils/check';
import {closeIssue, createIssue, getIssues} from './utils/issue';
import {getTargetLink, getIssueTitle, getHtmlCheckerOptions, isRecursive} from './utils/misc';
import {INTERVAL_MS} from './constant';

export const execute = async(logger: Logger, octokit: Octokit, context: Context): Promise<void> => {
  logger.startProcess('Checking...');
  const {brokenLinks, notBrokenLinks} = await checkLinks(getTargetLink(), isRecursive(), getHtmlCheckerOptions(), logger);

  logger.startProcess('Get issues...');
  const issues = await getIssues(octokit, context);
  logger.info('count: %d', issues.length);

  logger.startProcess('Creating...');
  console.log(
    await brokenLinks.reduce(async(prev, link) => {
      const acc = await prev;
      const title = await getIssueTitle(link.originalURL, context);
      if (issues.find(issue => issue.title === title)) {
        return acc;
      }

      if (acc.length) {
        await Utils.sleep(INTERVAL_MS);
      }

      return acc.concat((await createIssue(link, octokit, context)).html_url);
    }, Promise.resolve([] as Array<string>)),
  );

  logger.startProcess('Closing...');
  console.log(
    await notBrokenLinks.reduce(async(prev, link) => {
      const acc = await prev;
      const title = await getIssueTitle(link, context);
      const targets = issues.filter(issue => issue.title === title);
      if (!targets.length) {
        return acc;
      }

      if (acc.length) {
        await Utils.sleep(INTERVAL_MS);
      }

      await Promise.all(targets.map(issue => closeIssue(issue, octokit, context)));

      return acc.concat(link);
    }, Promise.resolve([] as Array<string>)),
  );

  logger.endProcess();
};
