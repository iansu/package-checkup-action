/* eslint-disable @typescript-eslint/no-explicit-any */

import execa from 'execa';
import micromatch from 'micromatch';
import markdownTable from 'markdown-table';
import { getInput } from '@actions/core';

import { debug, getWorkspace } from './lib/actions';

interface DepcheckResults {
  dependencies: string[];
  devDependencies: string[];
  missing: {
    [dependencyName: string]: string[];
  };
}

const getUnusedPackageList = (depcheckResults: DepcheckResults): string[][] => {
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

const getMissingPackageList = (depcheckResults: DepcheckResults): string[][] => {
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

  debug('cwd', getWorkspace());

  try {
    if (getInput('showMissingPackages') === 'false') {
      await execa('npx', ['depcheck', '--skip-missing', '--json'], { cwd: getWorkspace() });
    } else {
      await execa('npx', ['depcheck', '--json'], { cwd: getWorkspace() });
    }

    return '';
  } catch (error) {
    debug('depcheck results', error.stdout);

    const results = JSON.parse(error.stdout);
    const unusedPackages = getUnusedPackageList(results);

    if (unusedPackages.length > 0) {
      output += '### Unused Packages\n\n';
      output += markdownTable([['Package', 'Type'], ...unusedPackages]);
    }

    if (getInput('showMissingPackages') !== 'false') {
      const missingPackages = getMissingPackageList(results);

      if (missingPackages.length > 0) {
        output += '\n\n### Missing Packages\n\n';
        output += markdownTable([['Package'], ...missingPackages]);
      }
    }

    return output;
  }
};

export { getUnusedPackages, getUnusedPackageList, getMissingPackageList };
