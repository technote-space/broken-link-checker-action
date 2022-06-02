import { describe, expect, it, vi } from 'vitest';
import Checker from './checker';

vi.mock('broken-link-checker', () => ({
  SiteChecker: class {
    enqueue(url: string): void {
      expect(url).toBe('http://example.com/site-checker-test');
    }
  },
  HtmlUrlChecker: class {
    enqueue(url: string): void {
      expect(url).toBe('http://example.com/html-url-checker-test');
    }
  },
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
