"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeIssue = exports.createIssue = exports.getIssues = void 0;
const misc_1 = require("./misc");
const getIssues = async (octokit, context) => (await octokit.paginate(octokit.issues.listForRepo, {
    ...context.repo,
})).filter(item => !('pull_request' in item));
exports.getIssues = getIssues;
const createIssue = async (brokenLink, octokit, context) => (await octokit.issues.create({
    ...context.repo,
    title: await misc_1.getIssueTitle(brokenLink.originalURL, context),
    body: await misc_1.getIssueBody(brokenLink, context),
    labels: misc_1.getIssueLabels(),
    assignees: misc_1.getIssueAssignees(),
})).data;
exports.createIssue = createIssue;
const closeIssue = async (issue, octokit, context) => (await octokit.issues.update({
    ...context.repo,
    'issue_number': issue.number,
    state: 'closed',
})).data;
exports.closeIssue = closeIssue;
