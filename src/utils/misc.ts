import type { BrokenLink, HtmlCheckerOptions } from '../types';
import type { Context } from '@actions/github/lib/context';
import { getInput } from '@actions/core';
import { Utils } from '@technote-space/github-action-helper';
import { INTERVAL_MS } from '../constant';

export const getTargetLink       = (): string => getInput('TARGET', { required: true });
export const getReplaceVariables = (context: Context, brokenLink: BrokenLink | string): Array<{ key: string; replace: string }> => [
  { key: 'URL', replace: typeof brokenLink === 'string' ? brokenLink : brokenLink.originalURL },
  { key: 'REDIRECTED_URL', replace: typeof brokenLink === 'string' ? '' : brokenLink.redirectedURL },
  { key: 'REASON', replace: typeof brokenLink === 'string' ? '' : Object.values(brokenLink.brokenReasons).join(', ') },
  { key: 'TARGET', replace: getTargetLink() },
  { key: 'OWNER', replace: context.repo.owner },
  { key: 'REPO', replace: context.repo.repo },
  { key: 'SHA', replace: context.sha },
  { key: 'REF', replace: context.ref },
  { key: 'EVENT_NAME', replace: context.eventName },
  { key: 'ACTION', replace: context.action },
  { key: 'ACTOR', replace: context.actor },
];
export const getIssueTitle       = (link: string, context: Context): Promise<string> => Utils.replaceVariables(getInput('TITLE', { required: true }), getReplaceVariables(context, link));
export const getIssueBody        = (brokenLink: BrokenLink, context: Context): Promise<string> => Utils.replaceVariables(getInput('BODY', { required: true }), getReplaceVariables(context, brokenLink));
export const getIssueLabels      = (): Array<string> => Utils.getArrayInput('LABELS');
export const getIssueAssignees   = (): Array<string> => Utils.getArrayInput('ASSIGNEES');
export const isRecursive         = (): boolean => Utils.getBoolValue(getInput('RECURSIVE'));
export const getInterval         = (): number => {
  const value = getInput('INTERVAL');
  if (value && value.match(/^\d+$/)) {
    const interval = Number(value);
    // eslint-disable-next-line no-magic-numbers
    if (interval > 0) {
      return interval;
    }
  }

  return INTERVAL_MS;
};

export const filterInput    = <T>(name: string, getValue: () => T): T | undefined => {
  const key = `INPUT_${name.replace(/ /g, '_').toUpperCase()}`;
  if (!(key in process.env)) {
    return undefined;
  }
  if ('' === process.env[key]) {
    return undefined;
  }
  return getValue();
};
export const getArrayValue  = (name: string): Array<string> | undefined => filterInput(name, () => Utils.getArrayInput(name));
export const getNumberValue = (name: string): number | undefined => filterInput(name, () => /^\d+$/.test(getInput(name)) ? Number(getInput(name)) : undefined);
export const getBoolValue   = (name: string): boolean | undefined => filterInput(name, () => Utils.getBoolValue(getInput(name)));
export const getStringValue = (name: string): string | undefined => filterInput(name, () => getInput(name));

export const getHtmlCheckerOptions = (): HtmlCheckerOptions => {
  const options = {
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
    rateLimit: getNumberValue('RATE_LIMIT'),
  };
  Object.keys(options).forEach(key => {
    if (options[key] === undefined) {
      delete options[key];
    }
  });
  return options;
};
