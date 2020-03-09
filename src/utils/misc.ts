import { getInput } from '@actions/core';
import { Context } from '@actions/github/lib/context';
import { Utils } from '@technote-space/github-action-helper';
import { BrokenLink, HtmlCheckerOptions } from '../types';

export const getTargetLink       = (): string => getInput('TARGET', {required: true});
export const getReplaceVariables = (context: Context, brokenLink: BrokenLink | string): Array<{ key: string; replace: string }> => [
	{key: 'URL', replace: typeof brokenLink === 'string' ? brokenLink : brokenLink.originalURL},
	{key: 'REDIRECTED_URL', replace: typeof brokenLink === 'string' ? '' : brokenLink.redirectedURL},
	{key: 'REASON', replace: typeof brokenLink === 'string' ? '' : brokenLink.brokenReason},
	{key: 'TARGET', replace: getTargetLink()},
	{key: 'OWNER', replace: context.repo.owner},
	{key: 'REPO', replace: context.repo.repo},
	{key: 'SHA', replace: context.sha},
	{key: 'REF', replace: context.ref},
	{key: 'EVENT_NAME', replace: context.eventName},
	{key: 'ACTION', replace: context.action},
	{key: 'ACTOR', replace: context.actor},
];
export const getIssueTitle       = (link: string, context: Context): Promise<string> => Utils.replaceVariables(getInput('TITLE', {required: true}), getReplaceVariables(context, link));
export const getIssueBody        = (brokenLink: BrokenLink, context: Context): Promise<string> => Utils.replaceVariables(getInput('BODY', {required: true}), getReplaceVariables(context, brokenLink));
export const getIssueLabels      = (): Array<string> => Utils.getArrayInput('LABELS');
export const getIssueAssignees   = (): Array<string> => Utils.getArrayInput('ASSIGNEES');
export const isRecursive         = (): boolean => Utils.getBoolValue(getInput('RECURSIVE'));

export const filterInput    = <T>(name: string, getValue: () => T): T | undefined => `INPUT_${name.replace(/ /g, '_').toUpperCase()}` in process.env ? getValue() : undefined;
export const getArrayValue  = (name: string): Array<string> | undefined => filterInput(name, () => Utils.getArrayInput(name));
export const getNumberValue = (name: string): number | undefined => filterInput(name, () => /^\d+$/.test(getInput(name)) ? Number(getInput(name)) : undefined);
export const getBoolValue   = (name: string): boolean | undefined => filterInput(name, () => Utils.getBoolValue(getInput(name)));
export const getStringValue = (name: string): string | undefined => filterInput(name, () => getInput(name));

export const getHtmlCheckerOptions = (): HtmlCheckerOptions => ({
	acceptedSchemes: getArrayValue('ACCEPTED_SCHEMES'),
	excludedKeywords: getArrayValue('EXCLUDED_KEYWORDS'),
	excludedSchemes: getArrayValue('EXCLUDED_SCHEMES'),
	includedKeywords: getArrayValue('INCLUDED_KEYWORDS'),
	excludeExternalLinks: getBoolValue('EXCLUDE_EXTERNAL_LINKS'),
	excludeInternalLinks: getBoolValue('EXCLUDE_INTERNAL_LINKS'),
	excludeLinksToSamePage: getBoolValue('EXCLUDE_LINKS_TO_SAME_PAGE'),
	honorRobotExclusions: getBoolValue('HONOR_ROBOT_EXCLUSIONS'),
	filterLevel: getNumberValue('FILTER_LEVEL'),
	userAgent: getStringValue('USER_AGENT'),
});
