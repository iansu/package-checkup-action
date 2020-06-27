import { yarnParseOutdatedOutput } from '../../src/package-manager/yarn';
import * as helpers from '../helpers';

describe('outdated', () => {
  test('yarnGetOutdatedPackages returns outdated packages', async () => {
    expect(yarnParseOutdatedOutput(helpers.getYarnFixture('outdated.txt'))).toStrictEqual([
      {
        current: '4.0.0',
        latest: '4.1.1',
        name: '[debug](https://github.com/visionmedia/debug#readme)',
        type: 'dependencies',
        wanted: '4.0.0'
      }
    ]);
  });


});
