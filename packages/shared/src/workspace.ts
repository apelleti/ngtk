import * as fs from 'node:fs';
import * as path from 'node:path';
import type { AngularWorkspace, AngularProject } from './types';

interface AngularWorkspaceJson {
  version?: number;
  projects?: Record<string, {
    root?: string;
    sourceRoot?: string;
    projectType?: string;
  }>;
  defaultProject?: string;
}

interface NxProjectJson {
  sourceRoot?: string;
  projectType?: string;
}

export async function parseAngularWorkspace(root: string): Promise<AngularWorkspace> {
  const angularJsonPath = path.join(root, 'angular.json');
  const projectJsonPath = path.join(root, 'project.json');

  if (fs.existsSync(angularJsonPath)) {
    const raw = await fs.promises.readFile(angularJsonPath, 'utf-8');
    let content: unknown;
    try {
      content = JSON.parse(raw);
    } catch {
      throw new Error(`Invalid JSON in ${angularJsonPath}`);
    }
    return normalizeWorkspace(content as AngularWorkspaceJson);
  }

  if (fs.existsSync(projectJsonPath)) {
    const raw = await fs.promises.readFile(projectJsonPath, 'utf-8');
    let content: unknown;
    try {
      content = JSON.parse(raw);
    } catch {
      throw new Error(`Invalid JSON in ${projectJsonPath}`);
    }
    return normalizeNxProject(content as NxProjectJson, root);
  }

  throw new Error(`No angular.json or project.json found in ${root}`);
}

function normalizeWorkspace(raw: AngularWorkspaceJson): AngularWorkspace {
  const projects: Record<string, AngularProject> = {};
  for (const [name, proj] of Object.entries(raw.projects || {})) {
    projects[name] = {
      name,
      root: proj.root || '',
      sourceRoot: proj.sourceRoot || (proj.root ? `${proj.root}/src` : 'src'),
      projectType: (proj.projectType as AngularProject['projectType']) || 'application',
    };
  }
  return {
    version: raw.version || 1,
    projects,
    defaultProject: raw.defaultProject,
  };
}

function normalizeNxProject(raw: NxProjectJson, root: string): AngularWorkspace {
  const name = path.basename(root);
  return {
    version: 1,
    projects: {
      [name]: {
        name,
        root: '.',
        sourceRoot: raw.sourceRoot || 'src',
        projectType: (raw.projectType as AngularProject['projectType']) || 'application',
      },
    },
  };
}

export function getProjectPaths(workspace: AngularWorkspace): string[] {
  return Object.values(workspace.projects).map((p) => p.sourceRoot);
}
