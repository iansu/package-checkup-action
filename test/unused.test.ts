import * as actionsCore from '@actions/core';

import * as helpers from './helpers';

import { getUnusedPackageList, getMissingPackageList } from '../src/unused';

describe('getUnusedPackageList', () => {
  test.skip('returns unused packages for npm project', async () => {
    const depcheckResults = await depcheck(helpers.getWorkspace('npm-project'), {});
    const unusedPackages = getUnusedPackageList(depcheckResults);

    expect(unusedPackages).toStrictEqual([['is-string', 'dependencies']]);
  });

  test.skip('returns unused packages for yarn project', async () => {
    const depcheckResults = await depcheck(helpers.getWorkspace('yarn-project'), {});
    const unusedPackages = getUnusedPackageList(depcheckResults);

    expect(unusedPackages).toStrictEqual([['is-string', 'dependencies']]);
  });

  test.skip('ignores specified unused packages', async () => {
    jest.spyOn(actionsCore, 'getInput').mockReturnValueOnce('is-string');

    const depcheckResults = await depcheck(helpers.getWorkspace('npm-project'), {});
    const unusedPackages = getUnusedPackageList(depcheckResults);

    expect(unusedPackages).toHaveLength(0);
  });
});

describe('getMissingPackageList', () => {
  test.skip('returns missing packages for npm project', async () => {
    const depcheckResults = await depcheck(helpers.getWorkspace('npm-project'), {});
    const missingPackages = getMissingPackageList(depcheckResults);

    expect(missingPackages).toStrictEqual([['lodash']]);
  });

  test.skip('returns missing packages for yarn project', async () => {
    const depcheckResults = await depcheck(helpers.getWorkspace('yarn-project'), {});
    const missingPackages = getMissingPackageList(depcheckResults);

    expect(missingPackages).toStrictEqual([['lodash']]);
  });

  test.skip('ignores specified missing packages', async () => {
    jest.spyOn(actionsCore, 'getInput').mockReturnValueOnce('lodash');

    const depcheckResults = await depcheck(helpers.getWorkspace('npm-project'), {});
    const unusedPackages = getMissingPackageList(depcheckResults);

    expect(unusedPackages).toHaveLength(0);
  });
});
