import { SiteChecker, HtmlUrlChecker } from 'broken-link-checker';
import type { HtmlCheckerOptions } from '../types';

/**
 * Checker
 */
export default class Checker {
  private checkerClass;

  /**
   * @param {boolean} recursive recursive
   */
  constructor(recursive: boolean) {
    this.checkerClass = recursive ? SiteChecker : HtmlUrlChecker;
  }

  /**
   * @param {string} url url
   * @param {object} options options
   * @param {object} events events
   */
  public start(url: string, options: HtmlCheckerOptions, events: any): void { // eslint-disable-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    (new this.checkerClass(options, events)).enqueue(url);
  }
}
