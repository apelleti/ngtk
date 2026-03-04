import * as fs from 'node:fs';
import * as path from 'node:path';
import fg from 'fast-glob';

export interface NxWorkspace {
  isNx: boolean;
  projects: NxProject[];
  defaultProject?: string;
}

export interface NxProject {
  name: string;
  root: string;
  type: 'app' | 'lib' | 'e2e';
  tags: string[];
}

function inferType(projectRoot: string): 'app' | 'lib' | 'e2e' {
  if (projectRoot.includes('/e2e') || projectRoot.endsWith('-e2e')) return 'e2e';
  if (projectRoot.startsWith('libs/') || projectRoot.startsWith('libs\\')) return 'lib';
  return 'app';
}

async function readJson(filePath: string): Promise<Record<string, unknown> | null> {
  try {
    const raw = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function discoverFromProjectJsonFiles(root: string): Promise<NxProject[]> {
  const projectJsonFiles = await fg('**/project.json', {
    cwd: root,
    absolute: true,
    ignore: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
  });

  const projects: NxProject[] = [];
  for (const pjFile of projectJsonFiles) {
    const json = await readJson(pjFile);
    if (!json) continue;
    const projectDir = path.relative(root, path.dirname(pjFile));
    if (projectDir === '') continue; // skip root project.json (NX config itself)
    const name = (json['name'] as string) || path.basename(projectDir);
    const projectType = (json['projectType'] as string) || '';
    let type: NxProject['type'];
    if (projectType === 'library') type = 'lib';
    else if (projectType === 'application') type = 'app';
    else type = inferType(projectDir);
    const tags = Array.isArray(json['tags']) ? (json['tags'] as string[]) : [];
    projects.push({ name, root: projectDir, type, tags });
  }
  return projects;
}

async function discoverFromAngularJson(root: string): Promise<{ projects: NxProject[]; defaultProject?: string }> {
  const json = await readJson(path.join(root, 'angular.json'));
  if (!json) return { projects: [] };

  const projectsRecord = (json['projects'] ?? {}) as Record<string, Record<string, unknown>>;
  const projects: NxProject[] = [];

  for (const [name, config] of Object.entries(projectsRecord)) {
    const projectRoot = (config['root'] as string) || '';
    const projectType = (config['projectType'] as string) || '';
    let type: NxProject['type'];
    if (projectType === 'library') type = 'lib';
    else if (projectType === 'application') type = 'app';
    else type = inferType(projectRoot);
    projects.push({ name, root: projectRoot, type, tags: [] });
  }

  return { projects, defaultProject: json['defaultProject'] as string | undefined };
}

export async function detectNxWorkspace(root: string): Promise<NxWorkspace> {
  const nxJsonPath = path.join(root, 'nx.json');
  if (!fs.existsSync(nxJsonPath)) {
    return { isNx: false, projects: [] };
  }

  // Try discovering from project.json files first
  let projects = await discoverFromProjectJsonFiles(root);

  let defaultProject: string | undefined;

  // Fallback to angular.json if no project.json files found
  if (projects.length === 0) {
    const result = await discoverFromAngularJson(root);
    projects = result.projects;
    defaultProject = result.defaultProject;
  }

  // Read default project from nx.json if not set
  if (!defaultProject) {
    const nxJson = await readJson(nxJsonPath);
    if (nxJson) {
      defaultProject = nxJson['defaultProject'] as string | undefined;
    }
  }

  return { isNx: true, projects, defaultProject };
}
