/* eslint-disable no-magic-numbers */
import { resolve } from 'path';
import { generateContext, testEnv } from '@technote-space/github-action-test-helper';
import { getArrayValue, getNumberValue, getBoolValue, getStringValue, getIssueTitle, getIssueBody } from '../../src/utils/misc';

const rootDir = resolve(__dirname, '../..');

describe('getArrayValue', () => {
	testEnv(rootDir);

	it('should return array', () => {
		process.env.INPUT_TEST = '123, 234';
		expect(getArrayValue('test')).toEqual(['123', '234']);
	});

	it('should return undefined', () => {
		expect(getArrayValue('test')).toBeUndefined();
	});
});

describe('getNumberValue', () => {
	testEnv(rootDir);

	it('should return number', () => {
		process.env.INPUT_TEST = '123';
		expect(getNumberValue('test')).toBe(123);
	});

	it('should return undefined', () => {
		process.env.INPUT_TEST = 'aaa';
		expect(getNumberValue('abc')).toBeUndefined();
		expect(getNumberValue('test')).toBeUndefined();
	});
});

describe('getBoolValue', () => {
	testEnv(rootDir);

	it('should return boolean', () => {
		process.env.INPUT_TEST1 = 'true';
		process.env.INPUT_TEST2 = 'false';
		process.env.INPUT_TEST3 = '';
		expect(getBoolValue('test1')).toBe(true);
		expect(getBoolValue('test2')).toBe(false);
		expect(getBoolValue('test3')).toBe(false);
	});

	it('should return undefined', () => {
		expect(getBoolValue('test')).toBeUndefined();
	});
});

describe('getStringValue', () => {
	testEnv(rootDir);

	it('should return array', () => {
		process.env.INPUT_TEST = '123';
		expect(getStringValue('test')).toBe('123');
	});

	it('should return undefined', () => {
		expect(getStringValue('test')).toBeUndefined();
	});
});

describe('getIssueTitle', () => {
	testEnv(rootDir);

	it('should title', async() => {
		process.env.INPUT_TARGET = 'http://example.com/test';
		process.env.INPUT_TITLE  = '${URL}::${REDIRECTED_URL}::${REASON}::${TARGET}::${OWNER}::${REPO}';
		expect(await getIssueTitle('http://test', generateContext({owner: 'hello', repo: 'world'}))).toBe('http://test::::::http://example.com/test::hello::world');
	});
});

describe('getIssueBody', () => {
	testEnv(rootDir);

	it('should body', async() => {
		process.env.INPUT_TARGET = 'http://example.com/test';
		process.env.INPUT_TITLE  = '${URL}::${REDIRECTED_URL}::${REASON}::${TARGET}::${OWNER}::${REPO}';
		expect(await getIssueBody({
			originalURL: 'http://original',
			redirectedURL: 'http://redirected',
			brokenReason: 'reason',
		}, generateContext({owner: 'hello', repo: 'world', sha: '1234'}))).toBe(`\
## Broken link found

Broken Link Checker found a broken link on http://example.com/test

  \`http://original\`

  [View Results](https://github.com/hello/world/commit/1234/checks)`);
	});
});
