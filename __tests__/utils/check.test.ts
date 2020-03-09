/* eslint-disable no-magic-numbers */
import { Logger } from '@technote-space/github-action-helper';
import { spyOnStdout, stdoutCalledWith } from '@technote-space/github-action-test-helper';
import { checkLinks } from '../../src/utils/check';

jest.mock('../../src/utils/checker', () => {
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
				events.link({isBroken: false, wasExcluded: false, brokenReason: undefined, originalURL: 'http://example.com/ok', redirectedURL: 'http://example.com/redirect'});
				events.junk({excludedReason: 'junk test2'});
				events.link({isBroken: true, wasExcluded: false, brokenReason: 'broken test2', originalURL: 'http://example.com/400', redirectedURL: 'http://example.com/400'});
				events.end();
			},
		};
	});
});

beforeEach(() => {
	Logger.resetForTesting();
});

describe('checkLinks', () => {
	it('should return checked links', async() => {
		const mockStdout = spyOnStdout();

		const {brokenLinks, notBrokenLinks} = await checkLinks('https://example.com/test', false, {}, new Logger());

		stdoutCalledWith(mockStdout, [
			'> skipped: junk test1',
			'::warning::broken: http://example.com/404',
			'> broken test1',
			'> skipped: junk test2',
			'::warning::broken: http://example.com/400',
			'> broken test2',
		]);
		expect(brokenLinks).toHaveLength(2);
		expect(notBrokenLinks).toHaveLength(1);
	});
});
