"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const github_action_helper_1 = require("@technote-space/github-action-helper");
const check_1 = require("./utils/check");
const issue_1 = require("./utils/issue");
const misc_1 = require("./utils/misc");
const execute = async (logger, octokit, context) => {
    logger.startProcess('Checking...');
    const { brokenLinks, notBrokenLinks } = await (0, check_1.checkLinks)((0, misc_1.getTargetLink)(), (0, misc_1.isRecursive)(), (0, misc_1.getHtmlCheckerOptions)(), logger);
    logger.startProcess('Get issues...');
    const issues = await (0, issue_1.getIssues)(octokit, context);
    logger.info('count: %d', issues.length);
    logger.startProcess('Creating...');
    console.log(await brokenLinks.reduce(async (prev, link) => {
        const acc = await prev;
        const title = await (0, misc_1.getIssueTitle)(link.originalURL, context);
        if (issues.find(issue => issue.title === title)) {
            return acc;
        }
        if (acc.length) {
            await github_action_helper_1.Utils.sleep((0, misc_1.getInterval)());
        }
        return acc.concat((await (0, issue_1.createIssue)(link, octokit, context)).html_url);
    }, Promise.resolve([])));
    logger.startProcess('Closing...');
    console.log(await notBrokenLinks.reduce(async (prev, link) => {
        const acc = await prev;
        const title = await (0, misc_1.getIssueTitle)(link, context);
        const targets = issues.filter(issue => issue.title === title);
        if (!targets.length) {
            return acc;
        }
        if (acc.length) {
            await github_action_helper_1.Utils.sleep((0, misc_1.getInterval)());
        }
        await Promise.all(targets.map(issue => (0, issue_1.closeIssue)(issue, octokit, context)));
        return acc.concat(link);
    }, Promise.resolve([])));
    logger.endProcess();
};
exports.execute = execute;
