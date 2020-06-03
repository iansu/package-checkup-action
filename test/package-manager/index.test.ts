import path from 'path';

import { isNpm, isYarn, hasLockfile } from '../../src/package-manager';

const npmProjectWorkspace = path.join(process.cwd(), 'test', 'fixtures', 'npm-project');
const yarnProjectWorkspace = path.join(process.cwd(), 'test', 'fixtures', 'yarn-project');

describe('package-mangaer', () => {
  describe('npm project', () => {
    beforeAll(() => {
      process.env.GITHUB_WORKSPACE = npmProjectWorkspace;
    });

    afterAll(() => {
      delete process.env.GITHUB_WORKSPACE;
    });

    test('isNpm', () => {
      expect(isNpm()).toBe(true);
    });

    test('isYarn', () => {
      expect(isYarn()).toBe(false);
    });

    test('hasLockfile', () => {
      expect(hasLockfile()).toBe(true);
    });
  });

  describe('yarn project', () => {
    beforeAll(() => {
      process.env.GITHUB_WORKSPACE = yarnProjectWorkspace;
    });

    afterAll(() => {
      delete process.env.GITHUB_WORKSPACE;
    });

    test('isNpm', () => {
      expect(isNpm()).toBe(false);
    });

    test('isYarn', () => {
      expect(isYarn()).toBe(true);
    });

    test('hasLockfile', () => {
      expect(hasLockfile()).toBe(true);
    });
  });
});
