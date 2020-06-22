import depcheck from 'depcheck';
import micromatch from 'micromatch';
import markdownTable from 'markdown-table';
import { getInput } from '@actions/core';

import { getWorkspace, debug } from './lib/actions';

const getUnusedPackageList = (depcheckResults: depcheck.Results): string[][] => {
  const unusedIgnore = getInput('unusedIgnore');
  const unusedPackages = [];

  for (const pkg of depcheckResults.dependencies) {
    if (unusedIgnore) {
      if (!micromatch.isMatch(pkg, unusedIgnore)) {
        unusedPackages.push([pkg, 'dependencies']);
      }
    } else {
      unusedPackages.push([pkg, 'dependencies']);
    }
  }

  for (const pkg of depcheckResults.devDependencies) {
    if (unusedIgnore) {
      if (!micromatch.isMatch(pkg, unusedIgnore)) {
        unusedPackages.push([pkg, 'devDependencies']);
      }
    } else {
      unusedPackages.push([pkg, 'devDependencies']);
    }
  }

  unusedPackages.sort((a, b) => (a[0] < b[0] ? 1 : -1));

  debug('unusedPackages');
  debug(unusedPackages);

  return unusedPackages;
};

const getMissingPackageList = (depcheckResults: depcheck.Results): string[][] => {
  const missingIgnore = getInput('missingIgnore');
  const missingPackages = [];

  for (const pkg of Object.keys(depcheckResults.missing)) {
    if (missingIgnore) {
      if (!micromatch.isMatch(pkg, missingIgnore)) {
        missingPackages.push([pkg]);
      }
    } else {
      missingPackages.push([pkg]);
    }
  }

  debug('missingPackages');
  debug(missingPackages);

  return missingPackages;
};

const getUnusedPackages = async (): Promise<string> => {
  let output = '';

  const results = await depcheck(getWorkspace(), {
    skipMissing: getInput('showMissingPackages') === 'false'
  });
  const unusedPackages = getUnusedPackageList(results);

  if (unusedPackages.length > 0) {
    output += '### Unused Packages\n\n';
    output += markdownTable([['Package', 'Type'], ...unusedPackages]);
  }

  if (getInput('showMissingPackages') !== 'false') {
    const missingPackages = getMissingPackageList(results);

    if (missingPackages.length > 0) {
      output += '### Missing Packages\n\n';
      output += markdownTable([['Package'], ...missingPackages]);
    }
  }

  return output;
};

export { getUnusedPackages, getUnusedPackageList, getMissingPackageList };
