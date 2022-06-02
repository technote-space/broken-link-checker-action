import type { HtmlCheckerOptions, BrokenLink } from '../types';
import type { Logger } from '@technote-space/github-action-log-helper';
import blc from 'broken-link-checker';
import Checker from './checker';

export const checkLinks = async(url: string, recursive: boolean, options: HtmlCheckerOptions, logger: Logger): Promise<{ brokenLinks: Array<BrokenLink>; notBrokenLinks: Array<string> }> => new Promise(resolve => {
  logger.log('=========================');
  logger.info('url:');
  console.log(url);
  logger.info('options:');
  console.log(options);
  logger.log('=========================');
  logger.log();

  const brokenLinks    = Array<BrokenLink>();
  const notBrokenLinks = Array<string>();
  const events         = {
    junk: (result: { url; excludedReason }): void => {
      logger.info('skipped: %s', result.url.original);
      logger.info(blc[result.excludedReason]);
      logger.log();
      notBrokenLinks.push(result.url.original);
    },
    link: (result: { broken; excluded; brokenReason; url }): void => {
      if (result.broken) {
        logger.warn('broken: %s', result.url.original);
        logger.info(blc[result.brokenReason]);
        brokenLinks.push({
          originalURL: result.url.original,
          redirectedURL: result.url.redirected,
          brokenReason: result.brokenReason,
        });
      } else if (result.excluded) {
        logger.info('excluded: %s', result.url.original);
      } else {
        logger.info('passed: %s', result.url.original);
        notBrokenLinks.push(result.url.original);
      }
      logger.log();
    },
    end: (): void => resolve({ brokenLinks, notBrokenLinks }),
  };
  (new Checker(recursive)).start(url, options, events);
});
