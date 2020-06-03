import { npmParseOutdatedOutput } from '../../src/package-manager/npm';
import * as helpers from '../helpers';

describe('outdated', () => {
  test('npmGetOutdatedPackages returns outdated packages', async () => {
    expect(npmParseOutdatedOutput(helpers.getNpmFixture('outdated.txt'))).toStrictEqual([
      {
        current: '4.0.0',
        latest: '4.1.1',
        name: '[debug](https://github.com/visionmedia/debug#readme)',
        type: 'dependencies',
        wanted: '4.1.1'
      }
    ]);
  });
});
