import * as fs from 'node:fs';
import * as path from 'node:path';
import type { AngularWorkspace, AngularProject } from './types';

export async function parseAngularWorkspace(root: string): Promise<AngularWorkspace> {
  const angularJsonPath = path.join(root, 'angular.json');
  const projectJsonPath = path.join(root, 'project.json');

  if (fs.existsSync(angularJsonPath)) {
    const content = JSON.parse(await fs.promises.readFile(angularJsonPath, 'utf-8'));
    return normalizeWorkspace(content);
  }

  if (fs.existsSync(projectJsonPath)) {
    const content = JSON.parse(await fs.promises.readFile(projectJsonPath, 'utf-8'));
    return normalizeNxProject(content, root);
  }

  throw new Error('No angular.json or project.json found in ' + root);
}

function normalizeWorkspace(raw: any): AngularWorkspace {
  const projects: Record<string, AngularProject> = {};
  for (const [name, proj] of Object.entries(raw.projects || {})) {
    const p = proj as any;
    projects[name] = {
      name,
      root: p.root || '',
      sourceRoot: p.sourceRoot || (p.root ? p.root + '/src' : 'src'),
      projectType: p.projectType || 'application',
    };
  }
  return {
    version: raw.version || 1,
    projects,
    defaultProject: raw.defaultProject,
  };
}

function normalizeNxProject(raw: any, root: string): AngularWorkspace {
  const name = path.basename(root);
  return {
    version: 1,
    projects: {
      [name]: {
        name,
        root: '.',
        sourceRoot: raw.sourceRoot || 'src',
        projectType: raw.projectType || 'application',
      },
    },
  };
}

export function getProjectPaths(workspace: AngularWorkspace): string[] {
  return Object.values(workspace.projects).map((p) => p.sourceRoot);
}
