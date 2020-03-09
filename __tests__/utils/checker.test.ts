import Checker from '../../src/utils/checker';

jest.mock('broken-link-checker', () => ({
	SiteChecker: jest.fn().mockImplementation(() => ({
		enqueue: (url: string): void => expect(url).toBe('http://example.com/site-checker-test'),
	})),
	HtmlUrlChecker: jest.fn().mockImplementation(() => ({
		enqueue: (url: string): void => expect(url).toBe('http://example.com/html-url-checker-test'),
	})),
}));

describe('Checker', () => {
	it('should return checker', () => {
		const checker = new Checker(true);
		expect(checker).toHaveProperty('start');
		checker.start('http://example.com/site-checker-test', {}, {});
	});

	it('should return checker', () => {
		const checker = new Checker(false);
		expect(checker).toHaveProperty('start');
		checker.start('http://example.com/html-url-checker-test', {}, {});
	});
});
