"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtmlCheckerOptions = exports.getStringValue = exports.getBoolValue = exports.getNumberValue = exports.getArrayValue = exports.filterInput = exports.getInterval = exports.isRecursive = exports.getIssueAssignees = exports.getIssueLabels = exports.getIssueBody = exports.getIssueTitle = exports.getReplaceVariables = exports.getTargetLink = void 0;
const core_1 = require("@actions/core");
const github_action_helper_1 = require("@technote-space/github-action-helper");
const constant_1 = require("../constant");
const getTargetLink = () => (0, core_1.getInput)('TARGET', { required: true });
exports.getTargetLink = getTargetLink;
const getReplaceVariables = (context, brokenLink) => [
    { key: 'URL', replace: typeof brokenLink === 'string' ? brokenLink : brokenLink.originalURL },
    { key: 'REDIRECTED_URL', replace: typeof brokenLink === 'string' ? '' : brokenLink.redirectedURL },
    { key: 'REASON', replace: typeof brokenLink === 'string' ? '' : brokenLink.brokenReason },
    { key: 'TARGET', replace: (0, exports.getTargetLink)() },
    { key: 'OWNER', replace: context.repo.owner },
    { key: 'REPO', replace: context.repo.repo },
    { key: 'SHA', replace: context.sha },
    { key: 'REF', replace: context.ref },
    { key: 'EVENT_NAME', replace: context.eventName },
    { key: 'ACTION', replace: context.action },
    { key: 'ACTOR', replace: context.actor },
];
exports.getReplaceVariables = getReplaceVariables;
const getIssueTitle = (link, context) => github_action_helper_1.Utils.replaceVariables((0, core_1.getInput)('TITLE', { required: true }), (0, exports.getReplaceVariables)(context, link));
exports.getIssueTitle = getIssueTitle;
const getIssueBody = (brokenLink, context) => github_action_helper_1.Utils.replaceVariables((0, core_1.getInput)('BODY', { required: true }), (0, exports.getReplaceVariables)(context, brokenLink));
exports.getIssueBody = getIssueBody;
const getIssueLabels = () => github_action_helper_1.Utils.getArrayInput('LABELS');
exports.getIssueLabels = getIssueLabels;
const getIssueAssignees = () => github_action_helper_1.Utils.getArrayInput('ASSIGNEES');
exports.getIssueAssignees = getIssueAssignees;
const isRecursive = () => github_action_helper_1.Utils.getBoolValue((0, core_1.getInput)('RECURSIVE'));
exports.isRecursive = isRecursive;
const getInterval = () => {
    const value = (0, core_1.getInput)('INTERVAL');
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
const getArrayValue = (name) => (0, exports.filterInput)(name, () => github_action_helper_1.Utils.getArrayInput(name));
exports.getArrayValue = getArrayValue;
const getNumberValue = (name) => (0, exports.filterInput)(name, () => /^\d+$/.test((0, core_1.getInput)(name)) ? Number((0, core_1.getInput)(name)) : undefined);
exports.getNumberValue = getNumberValue;
const getBoolValue = (name) => (0, exports.filterInput)(name, () => github_action_helper_1.Utils.getBoolValue((0, core_1.getInput)(name)));
exports.getBoolValue = getBoolValue;
const getStringValue = (name) => (0, exports.filterInput)(name, () => (0, core_1.getInput)(name));
exports.getStringValue = getStringValue;
const getHtmlCheckerOptions = () => {
    const options = {
        acceptedSchemes: (0, exports.getArrayValue)('ACCEPTED_SCHEMES'),
        excludedKeywords: (0, exports.getArrayValue)('EXCLUDED_KEYWORDS'),
        excludedSchemes: (0, exports.getArrayValue)('EXCLUDED_SCHEMES'),
        includedKeywords: (0, exports.getArrayValue)('INCLUDED_KEYWORDS'),
        excludeExternalLinks: (0, exports.getBoolValue)('EXCLUDE_EXTERNAL_LINKS'),
        excludeInternalLinks: (0, exports.getBoolValue)('EXCLUDE_INTERNAL_LINKS'),
        excludeLinksToSamePage: (0, exports.getBoolValue)('EXCLUDE_LINKS_TO_SAME_PAGE'),
        honorRobotExclusions: (0, exports.getBoolValue)('HONOR_ROBOT_EXCLUSIONS'),
        filterLevel: (0, exports.getNumberValue)('FILTER_LEVEL'),
        userAgent: (0, exports.getStringValue)('USER_AGENT'),
        rateLimit: (0, exports.getNumberValue)('RATE_LIMIT'),
    };
    Object.keys(options).forEach(key => {
        if (options[key] === undefined) {
            delete options[key];
        }
    });
    return options;
};
exports.getHtmlCheckerOptions = getHtmlCheckerOptions;
