import { Context } from '@actions/github/lib/context';
import { Octokit } from '@octokit/rest';
import { getIssueTitle, getIssueBody, getIssueLabels, getIssueAssignees } from './misc';
import { BrokenLink } from '../types';

export const getIssues = async(octokit: Octokit, context: Context): Promise<Array<Octokit.IssuesListForRepoResponseItem>> => (await octokit.paginate(
	octokit.issues.listForRepo.endpoint.merge({
		...context.repo,
	}),
)).filter(item => !('pull_request' in item));

export const createIssue = async(brokenLink: BrokenLink, octokit: Octokit, context: Context): Promise<Octokit.IssuesCreateResponse> => (await octokit.issues.create({
	...context.repo,
	title: await getIssueTitle(brokenLink.originalURL, context),
	body: await getIssueBody(brokenLink, context),
	labels: getIssueLabels(),
	assignees: getIssueAssignees(),
})).data;

export const closeIssue = async(issue: { number: number }, octokit: Octokit, context: Context): Promise<object> => octokit.issues.update({
	...context.repo,
	'issue_number': issue.number,
	state: 'closed',
});
