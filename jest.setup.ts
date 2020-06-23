import {setupGlobal} from '@technote-space/github-action-test-helper';

setupGlobal();

jest.mock('./src/constant', () => Object.assign(jest.requireActual('./src/constant'), {
  INTERVAL_MS: 0,
}));
