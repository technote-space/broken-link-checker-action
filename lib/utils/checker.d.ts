import type { HtmlCheckerOptions } from '../types';
/**
 * Checker
 */
export default class Checker {
    private checkerClass;
    /**
     * @param {boolean} recursive recursive
     */
    constructor(recursive: boolean);
    /**
     * @param {string} url url
     * @param {object} options options
     * @param {object} events events
     */
    start(url: string, options: HtmlCheckerOptions, events: any): void;
}
