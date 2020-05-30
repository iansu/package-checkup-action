/* eslint-disable @typescript-eslint/camelcase */

import execa from 'execa';
import semver from 'semver';
import table from 'markdown-table';
import { setFailed } from '@actions/core';

import { isYarn, isNpm } from './lib';

interface NpmOutdatedPackage {
  homepage: string;
  current: string;
  wanted: string;
  latest: string;
  type: string;
}

interface NpmOutdatedOutput {
  [key: string]: NpmOutdatedPackage;
}

const getChangeType = (current: string, latest: string): string => {
  if (semver.major(latest) > semver.major(current)) {
    return ':no_entry: major';
  } else if (semver.minor(latest) > semver.minor(current)) {
    return ':warning: minor';
  } else if (semver.patch(latest) > semver.patch(current)) {
    return ':white_check_mark: patch';
  } else {
    return '';
  }
};

const getOutdatedPackages = async (): Promise<string> => {
  let outdatedPackages = '### Outdated Packages\n\n';

  if (isYarn()) {
    try {
      await execa('yarn', ['outdated', '--json']);
    } catch (error) {
      if (error.exitCode !== 1) {
        setFailed(error);
      } else {
        const outdated = JSON.parse(error.stdout.split('\n')[1]);
        const tableData = [
          ['Package', 'Current', 'Wanted', 'Latest', 'Update', 'Type'],
          ...outdated.data.body.map((value: string[]) => [
            `[${value[0]}](${value[5]})`,
            value[1],
            value[2],
            value[3],
            getChangeType(value[1], value[3]),
            value[4]
          ])
        ];

        outdatedPackages += table(tableData);
      }
    }
  } else if (isNpm()) {
    const { stdout } = await execa('npm', ['outdated', '--json', '--long']);
    const outdated = Object.entries(JSON.parse(stdout) as NpmOutdatedOutput);
    const tableData = [
      ['Package', 'Current', 'Wanted', 'Latest', 'Update', 'Type'],
      ...outdated.map(([key, value]) => [
        `[${key}](${value.homepage})`,
        value.current,
        value.wanted,
        value.latest,
        getChangeType(value.current, value.latest),
        value.type
      ])
    ];

    outdatedPackages += table(tableData);
  }

  return outdatedPackages;
};

export { getOutdatedPackages };
