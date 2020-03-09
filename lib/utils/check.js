"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const broken_link_checker_1 = __importDefault(require("broken-link-checker"));
const checker_1 = __importDefault(require("./checker"));
exports.checkLinks = (url, recursive, options, logger) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(resolve => {
        logger.log('=========================');
        logger.info('url:');
        console.log(url);
        logger.info('options:');
        console.log(options);
        logger.log('=========================');
        logger.log();
        const brokenLinks = Array();
        const notBrokenLinks = Array();
        const events = {
            junk: (result) => {
                logger.info('skipped: %s', result.url.original);
                logger.info(broken_link_checker_1.default[result.excludedReason]);
                logger.log();
                notBrokenLinks.push(result.url.original);
            },
            link: (result) => {
                if (result.broken) {
                    logger.warn('broken: %s', result.url.original);
                    logger.info(broken_link_checker_1.default[result.brokenReason]);
                    logger.log();
                    brokenLinks.push({ originalURL: result.url.original, redirectedURL: result.url.redirected, brokenReason: result.brokenReason });
                }
                else if (!result.excluded) {
                    notBrokenLinks.push(result.url.original);
                }
            },
            end: () => resolve({ brokenLinks, notBrokenLinks }),
        };
        (new checker_1.default(recursive)).start(url, options, events);
    });
});
