import {Context} from '@actions/github/lib/context';
import {Octokit} from '@technote-space/github-action-helper/dist/types';
import {PaginateInterface} from '@octokit/plugin-paginate-rest';
import {RestEndpointMethods} from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types';
import {
  IssuesListForRepoResponseData,
  IssuesCreateResponseData,
  IssuesUpdateResponseData,
} from '@octokit/types';
import {getIssueTitle, getIssueBody, getIssueLabels, getIssueAssignees} from './misc';
import {BrokenLink} from '../types';

export const getIssues = async(octokit: Octokit, context: Context): Promise<IssuesListForRepoResponseData> => (await (octokit.paginate as PaginateInterface)(
  (octokit as RestEndpointMethods).issues.listForRepo,
  {
    ...context.repo,
  },
)).filter(item => !('pull_request' in item));

export const createIssue = async(brokenLink: BrokenLink, octokit: Octokit, context: Context): Promise<IssuesCreateResponseData> => (await (octokit as RestEndpointMethods).issues.create({
  ...context.repo,
  title: await getIssueTitle(brokenLink.originalURL, context),
  body: await getIssueBody(brokenLink, context),
  labels: getIssueLabels(),
  assignees: getIssueAssignees(),
})).data;

export const closeIssue = async(issue: { number: number }, octokit: Octokit, context: Context): Promise<IssuesUpdateResponseData> => (await (octokit as RestEndpointMethods).issues.update({
  ...context.repo,
  'issue_number': issue.number,
  state: 'closed',
})).data;
