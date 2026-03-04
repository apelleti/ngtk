import * as fs from 'node:fs';
import * as path from 'node:path';
import fg from 'fast-glob';

const DEFAULT_IGNORE = ['**/node_modules/**', '**/dist/**', '**/.git/**'];

export async function scanFiles(
  root: string,
  patterns: string[],
  extraIgnore: string[] = [],
): Promise<string[]> {
  return fg(patterns, {
    cwd: root,
    absolute: true,
    ignore: [...DEFAULT_IGNORE, ...extraIgnore],
  });
}

export async function readFileContent(filePath: string): Promise<string> {
  return fs.promises.readFile(filePath, 'utf-8');
}

export async function getFileSize(filePath: string): Promise<number> {
  const stat = await fs.promises.stat(filePath);
  return stat.size;
}

export async function findAngularRoot(from?: string): Promise<string> {
  const start = from || process.cwd();
  let dir = start;
  while (dir !== path.dirname(dir)) {
    if (
      fs.existsSync(path.join(dir, 'angular.json')) ||
      fs.existsSync(path.join(dir, 'project.json'))
    ) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  throw new Error(
    `Not an Angular project: no angular.json or project.json found in ${start} (or any parent directory). Run this command from an Angular project root, or use --root <path>.`,
  );
}

export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}
