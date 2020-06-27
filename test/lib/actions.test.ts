import { getWorkspace, isGitHubActions } from '../../src/lib/actions';

describe('lib', () => {
  describe('running in actions', () => {
    beforeAll(() => {
      process.env.GITHUB_WORKSPACE = '/a/b/c';
    });

    afterAll(() => {
      delete process.env.GITHUB_WORKSPACE;
    });

    test('getWorkspace', () => {
      expect(getWorkspace()).toBe('/a/b/c');
    });

    test('isGitHubActions', () => {
      expect(isGitHubActions()).toBe(true);
    });
  });

  describe('running locally', () => {
    test('getWorkspace', () => {
      expect(getWorkspace()).toBe(process.cwd());
    });

    test('isGitHubActions', () => {
      expect(isGitHubActions()).toBe(false);
    });
  });
});
