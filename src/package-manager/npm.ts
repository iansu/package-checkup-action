import execa from 'execa';

import { OutdatedPackage } from '.';

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

const npmParseOutdatedOutput = (npmOutput: string): OutdatedPackage[] => {
  return Object.entries(JSON.parse(npmOutput) as NpmOutdatedOutput).map(([key, value]) => ({
    name: `[${key}](${value.homepage})`,
    current: value.current,
    wanted: value.wanted,
    latest: value.latest,
    type: value.type
  }));
};

const npm = {
  getOutdatedPackages: async function(): Promise<OutdatedPackage[]> {
    const { stdout } = await execa('npm', ['outdated', '--json', '--long']);

    return npmParseOutdatedOutput(stdout);
  }
};

export { npm, npmParseOutdatedOutput };
