import execa from 'execa';
import { setFailed } from '@actions/core';

import { OutdatedPackage } from '.';

const yarnParseOutdatedOutput = (yarnOutput: string): OutdatedPackage[] => {
  const outdated = JSON.parse(yarnOutput.split('\n')[1]);

  return outdated.data.body.map((value: string[]) => ({
    name: `[${value[0]}](${value[5]})`,
    current: value[1],
    wanted: value[2],
    latest: value[3],
    type: value[4]
  }));
};

const yarn = {
  getOutdatedPackages: async function(): Promise<OutdatedPackage[]> {
    try {
      await execa('yarn', ['outdated', '--json']);
    } catch (error) {
      if (error.exitCode !== 1) {
        setFailed(error);
      } else {
        return yarnParseOutdatedOutput(error.stdout);
      }
    }

    return [];
  }
};

export { yarn, yarnParseOutdatedOutput };
