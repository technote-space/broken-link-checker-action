/* eslint-disable no-magic-numbers */
import { resolve } from 'path';
import nock from 'nock';
import { Logger } from '@technote-space/github-action-helper';
import {
	testEnv,
	getOctokit,
	disableNetConnect,
	generateContext,
	spyOnStdout,
	stdoutCalledWith,
	getApiFixture,
	getLogStdout,
} from '@technote-space/github-action-test-helper';
import { execute } from '../src/process';

jest.mock('../src/utils/checker', () => {
	return jest.fn().mockImplementation(() => {
		return {
			start: (url, options, events): void => {
				events.link({
					isBroken: false,
					wasExcluded: true,
					brokenReason: undefined,
					originalURL: 'http://example.com/excluded',
					redirectedURL: 'http://example.com/excluded',
				});
				events.junk({excludedReason: 'junk test1'});
				events.link({isBroken: true, wasExcluded: false, brokenReason: 'broken test1', originalURL: 'http://example.com/404', redirectedURL: 'http://example.com/404'});
				events.link({isBroken: false, wasExcluded: false, brokenReason: undefined, originalURL: 'http://example.com/ok1', redirectedURL: 'http://example.com/redirect'});
				events.junk({excludedReason: 'junk test2'});
				events.link({isBroken: true, wasExcluded: false, brokenReason: 'broken test2', originalURL: 'http://example.com/400', redirectedURL: 'http://example.com/400'});
				events.link({isBroken: false, wasExcluded: false, brokenReason: undefined, originalURL: 'http://example.com/ok2', redirectedURL: 'http://example.com/ok2'});
				events.link({isBroken: true, wasExcluded: false, brokenReason: 'broken test3', originalURL: 'http://example.com/500', redirectedURL: 'http://example.com/500'});
				events.link({isBroken: false, wasExcluded: false, brokenReason: undefined, originalURL: 'http://example.com/ok3', redirectedURL: 'http://example.com/ok3'});
				events.end();
			},
		};
	});
});

const rootDir     = resolve(__dirname, '..');
const fixturesDir = resolve(__dirname, 'fixtures');

beforeEach(() => {
	Logger.resetForTesting();
});

describe('execute', () => {
	testEnv(rootDir);
	disableNetConnect(nock);

	it('should run', async() => {
		process.env.INPUT_GITHUB_TOKEN = 'token';
		process.env.INPUT_TARGET       = 'https://example.com/test';

		const mockStdout = spyOnStdout();

		nock('https://api.github.com')
			.persist()
			.get('/repos/hello/world/issues')
			.reply(200, () => getApiFixture(fixturesDir, 'issues.get'))
			.post('/repos/hello/world/issues')
			.reply(201, () => getApiFixture(fixturesDir, 'issues.create'))
			.patch('/repos/hello/world/issues/1347')
			.reply(200);

		await execute(new Logger(), getOctokit(), generateContext({owner: 'hello', repo: 'world', sha: '1234'}));

		stdoutCalledWith(mockStdout, [
			'::group::Checking...',
			'> skipped: junk test1',
			'::warning::broken: http://example.com/404',
			'> broken test1',
			'> skipped: junk test2',
			'::warning::broken: http://example.com/400',
			'> broken test2',
			'::warning::broken: http://example.com/500',
			'> broken test3',
			'::endgroup::',
			'::group::Get issues...',
			'::endgroup::',
			'::group::Creating...',
			getLogStdout([
				'https://github.com/octocat/Hello-World/issues/1347',
				'https://github.com/octocat/Hello-World/issues/1347',
			]),
			'::endgroup::',
			'::group::Closing...',
			getLogStdout([
				'http://example.com/ok2',
				'http://example.com/ok3',
			]),
			'::endgroup::',
		]);
	});
});
