import type { BrokenLink, HtmlCheckerOptions } from '../types';
import type { Context } from '@actions/github/lib/context';
export declare const getTargetLink: () => string;
export declare const getReplaceVariables: (context: Context, brokenLink: BrokenLink | string) => Array<{
    key: string;
    replace: string;
}>;
export declare const getIssueTitle: (link: string, context: Context) => Promise<string>;
export declare const getIssueBody: (brokenLink: BrokenLink, context: Context) => Promise<string>;
export declare const getIssueLabels: () => Array<string>;
export declare const getIssueAssignees: () => Array<string>;
export declare const isRecursive: () => boolean;
export declare const getInterval: () => number;
export declare const filterInput: <T>(name: string, getValue: () => T) => T | undefined;
export declare const getArrayValue: (name: string) => Array<string> | undefined;
export declare const getNumberValue: (name: string) => number | undefined;
export declare const getBoolValue: (name: string) => boolean | undefined;
export declare const getStringValue: (name: string) => string | undefined;
export declare const getHtmlCheckerOptions: () => HtmlCheckerOptions;
