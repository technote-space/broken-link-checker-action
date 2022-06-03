/* eslint-disable no-magic-numbers */
import { resolve } from 'path';
import { Logger } from '@technote-space/github-action-log-helper';
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
import nock from 'nock';
import { beforeEach, describe, it, vi } from 'vitest';
import { execute } from './process';

vi.mock('../src/utils/checker', () => ({
  default: class {
    start(_url, _options, events): void {
      events.link({
        broken: false,
        excluded: true,
        brokenReason: undefined,
        url: {
          original: 'http://example.com/excluded1',
          redirected: 'http://example.com/excluded1',
        },
      });
      events.junk({
        excludedReason: 'BLC_ROBOTS',
        excluded: true,
        url: {
          original: 'http://example.com/excluded2',
          redirected: 'http://example.com/excluded2',
        },
      });
      events.link({
        broken: true,
        excluded: false,
        brokenReason: 'BLC_INTERNAL',
        url: {
          original: 'http://example.com/404',
          redirected: 'http://example.com/404',
        },
      });
      events.link({
        broken: false,
        excluded: false,
        brokenReason: undefined,
        url: {
          original: 'http://example.com/ok1',
          redirected: 'http://example.com/redirect',
        },
      });
      events.junk({
        excludedReason: 'BLC_SAMEPAGE',
        excluded: true,
        url: {
          original: 'http://example.com/excluded3',
          redirected: 'http://example.com/excluded3',
        },
      });
      events.link({
        broken: true,
        excluded: false,
        brokenReason: 'BLC_HTML',
        url: {
          original: 'http://example.com/400',
          redirected: 'http://example.com/400',
        },
      });
      events.link({
        broken: false,
        excluded: false,
        brokenReason: undefined,
        url: {
          original: 'http://example.com/ok2',
          redirected: 'http://example.com/ok2',
        },
      });
      events.link({
        broken: true,
        excluded: false,
        brokenReason: 'BLC_INVALID',
        url: {
          original: 'http://example.com/500',
          redirected: 'http://example.com/500',
        },
      });
      events.link({
        broken: false,
        excluded: false,
        brokenReason: undefined,
        url: {
          original: 'http://example.com/ok3',
          redirected: 'http://example.com/ok3',
        },
      });
      events.end();
    }
  },
}));

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

    await execute(new Logger(), getOctokit(), generateContext({ owner: 'hello', repo: 'world', sha: '1234' }));

    stdoutCalledWith(mockStdout, [
      '::group::Checking...',
      '=========================', '> url:',
      '"https://example.com/test"',
      '> options:',
      getLogStdout({
        'excludedKeywords': [
          'camo.githubusercontent.com',
        ],
        'rateLimit': 1000,
      }),
      '=========================',
      '',
      '> excluded: http://example.com/excluded1',
      '',
      '> skipped: http://example.com/excluded2',
      '> Robots Exclusion',
      '',
      '::warning::broken: http://example.com/404',
      '> Internal URL Exclusion',
      '',
      '> passed: http://example.com/ok1',
      '',
      '> skipped: http://example.com/excluded3',
      '> Same-page URL Exclusion',
      '',
      '::warning::broken: http://example.com/400',
      '> HTML Exclusion',
      '',
      '> passed: http://example.com/ok2',
      '',
      '::warning::broken: http://example.com/500',
      '> Invalid URL',
      '',
      '> passed: http://example.com/ok3',
      '',
      '::endgroup::',
      '::group::Get issues...',
      '> count: 3',
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
