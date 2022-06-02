/* eslint-disable no-magic-numbers */
import { resolve } from 'path';
import {
  testEnv,
  getOctokit,
  disableNetConnect,
  generateContext,
  getApiFixture,
} from '@technote-space/github-action-test-helper';
import nock from 'nock';
import { describe, expect, it, vi } from 'vitest';
import { getIssues, createIssue, closeIssue } from './issue';

const rootDir     = resolve(__dirname, '../..');
const fixturesDir = resolve(__dirname, '..', 'fixtures');

describe('getIssues', () => {
  disableNetConnect(nock);
  testEnv(rootDir);

  it('should get issues', async() => {
    nock('https://api.github.com')
      .get('/repos/hello/world/issues')
      .reply(200, () => getApiFixture(fixturesDir, 'issues.get'));

    const issues = await getIssues(getOctokit(), generateContext({ owner: 'hello', repo: 'world' }));

    expect(issues).toHaveLength(3);
    expect(issues[0]!.id).toBe(1);
    expect(issues[1]!.id).toBe(3);
    expect(issues[2]!.id).toBe(4);
  });
});

describe('createIssue', () => {
  disableNetConnect(nock);
  testEnv(rootDir);

  it('should create issue', async() => {
    process.env.INPUT_TARGET = 'http://example.com/test';

    const fn = vi.fn();
    nock('https://api.github.com')
      .post('/repos/hello/world/issues', body => {
        fn();
        expect(body.title).toBe('Broken link found (test1)');
        return body;
      })
      .reply(201);

    await createIssue({
      originalURL: 'test1',
      redirectedURL: 'test2',
      brokenReason: 'test3',
    }, getOctokit(), generateContext({ owner: 'hello', repo: 'world' }));

    expect(fn).toBeCalledTimes(1);
  });
});

describe('closeIssue', () => {
  disableNetConnect(nock);
  testEnv(rootDir);

  it('should close issue', async() => {
    const fn = vi.fn();
    nock('https://api.github.com')
      .patch('/repos/hello/world/issues/123', body => {
        fn();
        return body;
      })
      .reply(200);

    await closeIssue({ number: 123 }, getOctokit(), generateContext({ owner: 'hello', repo: 'world' }));

    expect(fn).toBeCalledTimes(1);
  });
});
