import {Context} from '@actions/github/lib/context';
import {Octokit} from '@technote-space/github-action-helper/dist/types';
import {PaginateInterface} from '@octokit/plugin-paginate-rest';
import {components} from '@octokit/openapi-types';
import {getIssueTitle, getIssueBody, getIssueLabels, getIssueAssignees} from './misc';
import {BrokenLink} from '../types';

type IssuesListForRepoResponseData = components['schemas']['issue-simple'];
type IssuesCreateResponseData = components['schemas']['issue'];
type IssuesUpdateResponseData = components['schemas']['issue'];

export const getIssues = async(octokit: Octokit, context: Context): Promise<Array<IssuesListForRepoResponseData>> => (await (octokit.paginate as PaginateInterface)(
  octokit.rest.issues.listForRepo,
  {
    ...context.repo,
  },
)).filter(item => !('pull_request' in item));

export const createIssue = async(brokenLink: BrokenLink, octokit: Octokit, context: Context): Promise<IssuesCreateResponseData> => (await octokit.rest.issues.create({
  ...context.repo,
  title: await getIssueTitle(brokenLink.originalURL, context),
  body: await getIssueBody(brokenLink, context),
  labels: getIssueLabels(),
  assignees: getIssueAssignees(),
})).data;

export const closeIssue = async(issue: { number: number }, octokit: Octokit, context: Context): Promise<IssuesUpdateResponseData> => (await octokit.rest.issues.update({
  ...context.repo,
  'issue_number': issue.number,
  state: 'closed',
})).data;
