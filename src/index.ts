import glob from 'glob-promise';
import { join, basename } from 'path';
import { promisify } from 'es6-promisify';
import mv from 'mv';

const mvPromise = promisify(mv);

export type Options = Parameters<typeof glob>[1] & {
  clobber?: boolean;
};

async function mvglob(srcPattern: string, destDir: string, options?: Options) {
  const copiedPaths: string[] = [];
  const paths = await glob(srcPattern, options);
  const mvActions = paths.map(path => {
    copiedPaths.push(path);
    return (mvPromise as any)(path, join(destDir, basename(path)), {
      mkdirp: true,
      clobber: options?.clobber ?? false,
    });
  });
  await Promise.all(mvActions);
  return copiedPaths;
}

export default mvglob;
