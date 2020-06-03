import semver from 'semver';
import markdownTable from 'markdown-table';

import { packageManager } from './package-manager';

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
  let output = '### Outdated Packages\n\n';
  const table = [['Package', 'Current', 'Wanted', 'Latest', 'Update', 'Type']];

  const outdatedPackages = await packageManager.getOutdatedPackages();

  for (const pkg of outdatedPackages) {
    table.push([
      pkg.name,
      pkg.current,
      pkg.wanted,
      pkg.latest,
      getChangeType(pkg.current, pkg.latest),
      pkg.type
    ]);
  }

  output += markdownTable(table);

  return output;
};

export { getOutdatedPackages, getChangeType };
