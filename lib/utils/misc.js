"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtmlCheckerOptions = exports.getStringValue = exports.getBoolValue = exports.getNumberValue = exports.getArrayValue = exports.filterInput = exports.getInterval = exports.isRecursive = exports.getIssueAssignees = exports.getIssueLabels = exports.getIssueBody = exports.getIssueTitle = exports.getReplaceVariables = exports.getTargetLink = void 0;
const core_1 = require("@actions/core");
const github_action_helper_1 = require("@technote-space/github-action-helper");
const constant_1 = require("../constant");
const getTargetLink = () => core_1.getInput('TARGET', { required: true });
exports.getTargetLink = getTargetLink;
const getReplaceVariables = (context, brokenLink) => [
    { key: 'URL', replace: typeof brokenLink === 'string' ? brokenLink : brokenLink.originalURL },
    { key: 'REDIRECTED_URL', replace: typeof brokenLink === 'string' ? '' : brokenLink.redirectedURL },
    { key: 'REASON', replace: typeof brokenLink === 'string' ? '' : brokenLink.brokenReason },
    { key: 'TARGET', replace: exports.getTargetLink() },
    { key: 'OWNER', replace: context.repo.owner },
    { key: 'REPO', replace: context.repo.repo },
    { key: 'SHA', replace: context.sha },
    { key: 'REF', replace: context.ref },
    { key: 'EVENT_NAME', replace: context.eventName },
    { key: 'ACTION', replace: context.action },
    { key: 'ACTOR', replace: context.actor },
];
exports.getReplaceVariables = getReplaceVariables;
const getIssueTitle = (link, context) => github_action_helper_1.Utils.replaceVariables(core_1.getInput('TITLE', { required: true }), exports.getReplaceVariables(context, link));
exports.getIssueTitle = getIssueTitle;
const getIssueBody = (brokenLink, context) => github_action_helper_1.Utils.replaceVariables(core_1.getInput('BODY', { required: true }), exports.getReplaceVariables(context, brokenLink));
exports.getIssueBody = getIssueBody;
const getIssueLabels = () => github_action_helper_1.Utils.getArrayInput('LABELS');
exports.getIssueLabels = getIssueLabels;
const getIssueAssignees = () => github_action_helper_1.Utils.getArrayInput('ASSIGNEES');
exports.getIssueAssignees = getIssueAssignees;
const isRecursive = () => github_action_helper_1.Utils.getBoolValue(core_1.getInput('RECURSIVE'));
exports.isRecursive = isRecursive;
const getInterval = () => {
    const value = core_1.getInput('INTERVAL');
    if (value && value.match(/^\d+$/)) {
        const interval = Number(value);
        // eslint-disable-next-line no-magic-numbers
        if (interval > 0) {
            return interval;
        }
    }
    return constant_1.INTERVAL_MS;
};
exports.getInterval = getInterval;
const filterInput = (name, getValue) => {
    const key = `INPUT_${name.replace(/ /g, '_').toUpperCase()}`;
    if (!(key in process.env)) {
        return undefined;
    }
    if ('' === process.env[key]) {
        return undefined;
    }
    return getValue();
};
exports.filterInput = filterInput;
const getArrayValue = (name) => exports.filterInput(name, () => github_action_helper_1.Utils.getArrayInput(name));
exports.getArrayValue = getArrayValue;
const getNumberValue = (name) => exports.filterInput(name, () => /^\d+$/.test(core_1.getInput(name)) ? Number(core_1.getInput(name)) : undefined);
exports.getNumberValue = getNumberValue;
const getBoolValue = (name) => exports.filterInput(name, () => github_action_helper_1.Utils.getBoolValue(core_1.getInput(name)));
exports.getBoolValue = getBoolValue;
const getStringValue = (name) => exports.filterInput(name, () => core_1.getInput(name));
exports.getStringValue = getStringValue;
const getHtmlCheckerOptions = () => {
    const options = {
        acceptedSchemes: exports.getArrayValue('ACCEPTED_SCHEMES'),
        excludedKeywords: exports.getArrayValue('EXCLUDED_KEYWORDS'),
        excludedSchemes: exports.getArrayValue('EXCLUDED_SCHEMES'),
        includedKeywords: exports.getArrayValue('INCLUDED_KEYWORDS'),
        excludeExternalLinks: exports.getBoolValue('EXCLUDE_EXTERNAL_LINKS'),
        excludeInternalLinks: exports.getBoolValue('EXCLUDE_INTERNAL_LINKS'),
        excludeLinksToSamePage: exports.getBoolValue('EXCLUDE_LINKS_TO_SAME_PAGE'),
        honorRobotExclusions: exports.getBoolValue('HONOR_ROBOT_EXCLUSIONS'),
        filterLevel: exports.getNumberValue('FILTER_LEVEL'),
        userAgent: exports.getStringValue('USER_AGENT'),
        rateLimit: exports.getNumberValue('RATE_LIMIT'),
    };
    Object.keys(options).forEach(key => {
        if (options[key] === undefined) {
            delete options[key];
        }
    });
    return options;
};
exports.getHtmlCheckerOptions = getHtmlCheckerOptions;
