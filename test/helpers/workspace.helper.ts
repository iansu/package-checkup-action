import path from 'path';

const getWorkspace = (fixtureName: string): string => {
  return path.join(process.cwd(), 'test', 'fixtures', fixtureName);
};

const setWorkspace = (fixtureName: string): void => {
  process.env.GITHUB_WORKSPACE = path.join(process.cwd(), 'test', 'fixtures', fixtureName);
};

export { getWorkspace, setWorkspace };
