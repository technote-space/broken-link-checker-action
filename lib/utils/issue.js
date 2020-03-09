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
const misc_1 = require("./misc");
exports.getIssues = (octokit, context) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield octokit.paginate(octokit.issues.listForRepo.endpoint.merge(Object.assign({}, context.repo)))).filter(item => !('pull_request' in item));
});
exports.createIssue = (brokenLink, octokit, context) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield octokit.issues.create(Object.assign(Object.assign({}, context.repo), { title: yield misc_1.getIssueTitle(brokenLink.originalURL, context), body: yield misc_1.getIssueBody(brokenLink, context), labels: misc_1.getIssueLabels(), assignees: misc_1.getIssueAssignees() }))).data;
});
exports.closeIssue = (issue, octokit, context) => __awaiter(void 0, void 0, void 0, function* () {
    return octokit.issues.update(Object.assign(Object.assign({}, context.repo), { 'issue_number': issue.number, state: 'closed' }));
});
