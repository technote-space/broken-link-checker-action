"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const broken_link_checker_1 = __importDefault(require("broken-link-checker"));
/**
 * Checker
 */
class Checker {
    /**
     * @param {boolean} recursive recursive
     */
    constructor(recursive) {
        this.checkerClass = recursive ? broken_link_checker_1.default.SiteChecker : broken_link_checker_1.default.HtmlUrlChecker;
    }
    /**
     * @param {string} url url
     * @param {object} options options
     * @param {object} events events
     */
    start(url, options, events) {
        (new this.checkerClass(options, events)).enqueue(url);
    }
}
exports.default = Checker;
