import fs from 'fs';
import path from 'path';
import createDebug from 'debug';
import { debug as githubDebug } from '@actions/core';

const localDebug = createDebug('package-check-up');

const getWorkspace = (): string => process.env.GITHUB_WORKSPACE || process.cwd();
const isGitHubActions = (): boolean => !!process.env.GITHUB_WORKSPACE;
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

const debug = (...args: string[]): void => {
  if (isGitHubActions()) {
    githubDebug(args.join('\n'));
  } else {
    localDebug(args);
  }
};

export { getWorkspace, isGitHubActions, isNpm, isYarn, hasLockfile, debug };
