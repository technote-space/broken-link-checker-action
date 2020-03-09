import { Logger } from '@technote-space/github-action-helper';
import Checker from './checker';
import { HtmlCheckerOptions, BrokenLink } from '../types';

export const checkLinks = async(url: string, recursive: boolean, options: HtmlCheckerOptions, logger: Logger): Promise<{ brokenLinks: Array<BrokenLink>; notBrokenLinks: Array<string> }> => new Promise(resolve => {
	const brokenLinks    = Array<BrokenLink>();
	const notBrokenLinks = Array<string>();
	const events         = {
		junk: (result: { excludedReason }): void => logger.info('skipped: %s', result.excludedReason),
		link: (result: { isBroken; wasExcluded; brokenReason; originalURL; redirectedURL }): void => {
			if (result.isBroken) {
				logger.warn('broken: %s', result.originalURL);
				logger.info(result.brokenReason);
				brokenLinks.push({originalURL: result.originalURL, redirectedURL: result.redirectedURL, brokenReason: result.brokenReason});
			} else if (!result.wasExcluded) {
				notBrokenLinks.push(result.originalURL);
			}
		},
		end: (): void => resolve({brokenLinks, notBrokenLinks}),
	};
	(new Checker(recursive)).start(url, options, events);
});
