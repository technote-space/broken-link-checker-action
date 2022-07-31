import type { HtmlCheckerOptions, BrokenLink } from '../types';
import type { Logger } from '@technote-space/github-action-log-helper';
export declare const checkLinks: (url: string, recursive: boolean, options: HtmlCheckerOptions, logger: Logger) => Promise<{
    brokenLinks: Array<BrokenLink>;
    notBrokenLinks: Array<string>;
}>;
