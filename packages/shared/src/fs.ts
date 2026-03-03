import * as fs from 'node:fs';
import * as path from 'node:path';
import fg from 'fast-glob';

export async function scanFiles(root: string, patterns: string[]): Promise<string[]> {
  return fg(patterns, {
    cwd: root,
    absolute: true,
    ignore: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
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
  let dir = from || process.cwd();
  while (dir !== path.dirname(dir)) {
    if (
      fs.existsSync(path.join(dir, 'angular.json')) ||
      fs.existsSync(path.join(dir, 'project.json'))
    ) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return from || process.cwd();
}

export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}
