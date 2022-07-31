import type { BrokenLink } from '../types';
import type { Context } from '@actions/github/lib/context';
import type { components } from '@octokit/openapi-types';
import type { Octokit } from '@technote-space/github-action-helper/dist/types';
declare type IssuesListForRepoResponseData = components['schemas']['issue'];
declare type IssuesCreateResponseData = components['schemas']['issue'];
declare type IssuesUpdateResponseData = components['schemas']['issue'];
export declare const getIssues: (octokit: Octokit, context: Context) => Promise<Array<IssuesListForRepoResponseData>>;
export declare const createIssue: (brokenLink: BrokenLink, octokit: Octokit, context: Context) => Promise<IssuesCreateResponseData>;
export declare const closeIssue: (issue: {
    number: number;
}, octokit: Octokit, context: Context) => Promise<IssuesUpdateResponseData>;
export {};
