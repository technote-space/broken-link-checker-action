"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const github_action_helper_1 = require("@technote-space/github-action-helper");
const check_1 = require("./utils/check");
const issue_1 = require("./utils/issue");
const misc_1 = require("./utils/misc");
const constant_1 = require("./constant");
exports.execute = (logger, octokit, context) => __awaiter(void 0, void 0, void 0, function* () {
    logger.startProcess('Checking...');
    const { brokenLinks, notBrokenLinks } = yield check_1.checkLinks(misc_1.getTargetLink(), misc_1.isRecursive(), misc_1.getHtmlCheckerOptions(), logger);
    logger.startProcess('Get issues...');
    const issues = yield issue_1.getIssues(octokit, context);
    logger.info('count: %d', issues.length);
    logger.startProcess('Creating...');
    console.log(yield brokenLinks.reduce((prev, link) => __awaiter(void 0, void 0, void 0, function* () {
        const acc = yield prev;
        const title = yield misc_1.getIssueTitle(link.originalURL, context);
        if (issues.find(issue => issue.title === title)) {
            return acc;
        }
        if (acc.length) {
            yield github_action_helper_1.Utils.sleep(constant_1.INTERVAL_MS);
        }
        return acc.concat((yield issue_1.createIssue(link, octokit, context)).html_url);
    }), Promise.resolve([])));
    logger.startProcess('Closing...');
    console.log(yield notBrokenLinks.reduce((prev, link) => __awaiter(void 0, void 0, void 0, function* () {
        const acc = yield prev;
        const title = yield misc_1.getIssueTitle(link, context);
        const targets = issues.filter(issue => issue.title === title);
        if (!targets.length) {
            return acc;
        }
        if (acc.length) {
            yield github_action_helper_1.Utils.sleep(constant_1.INTERVAL_MS);
        }
        yield Promise.all(targets.map(issue => issue_1.closeIssue(issue, octokit, context)));
        return acc.concat(link);
    }), Promise.resolve([])));
    logger.endProcess();
});
