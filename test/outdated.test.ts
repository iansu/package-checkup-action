import { getChangeType } from '../src/outdated';

describe('outdated', () => {
  describe('getChangeType', () => {
    test('major change', () => {
      expect(getChangeType('1.0.0', '2.0.0')).toBe(':no_entry: major');
    });

    test('minor change', () => {
      expect(getChangeType('1.0.0', '1.1.0')).toBe(':warning: minor');
    });

    test('patch change', () => {
      expect(getChangeType('1.0.0', '1.0.1')).toBe(':white_check_mark: patch');
    });

    test('no change', () => {
      expect(getChangeType('1.0.0', '1.0.0')).toBe('');
    });
  });
});
