import fs from 'fs';
import path from 'path';

import { npm } from './npm';
import { yarn } from './yarn';
import { getWorkspace } from '../lib/actions';

export interface OutdatedPackage {
  name: string;
  current: string;
  wanted: string;
  latest: string;
  type: string;
}

const isNpm = (): boolean => fs.existsSync(path.join(getWorkspace(), 'package-lock.json'));
const isYarn = (): boolean => fs.existsSync(path.join(getWorkspace(), 'yarn.lock'));

const hasLockfile = (): boolean => {
  if (isNpm()) {
    return true;
  } else if (isYarn()) {
    return true;
  } else {
    return false;
  }
};

const packageManager = {
  getOutdatedPackages: async function(): Promise<OutdatedPackage[]> {
    if (isNpm()) {
      return npm.getOutdatedPackages();
    } else if (isYarn()) {
      return yarn.getOutdatedPackages();
    } else {
      throw new Error('Unknown package manager');
    }
  }
};

export { packageManager, isNpm, isYarn, hasLockfile };
