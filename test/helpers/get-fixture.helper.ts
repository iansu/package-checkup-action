import fs from 'fs';
import path from 'path';

const getNpmFixture = (name: string): string => {
  return fs
    .readFileSync(path.join(process.cwd(), 'test', 'fixtures', 'npm-output', name))
    .toString();
};

const getYarnFixture = (name: string): string => {
  return fs
    .readFileSync(path.join(process.cwd(), 'test', 'fixtures', 'yarn-output', name))
    .toString();
};

export { getNpmFixture, getYarnFixture };
