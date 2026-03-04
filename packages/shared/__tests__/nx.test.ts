import { describe, it, expect } from 'vitest';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as os from 'node:os';
import { detectNxWorkspace } from '../src/nx';

const NX_FIXTURES = path.resolve(__dirname, '../../../fixtures/nx-workspace');
const NON_NX_FIXTURES = path.resolve(__dirname, '../../../fixtures');

describe('detectNxWorkspace', () => {
  it('detects NX workspace with nx.json', async () => {
    const result = await detectNxWorkspace(NX_FIXTURES);
    expect(result.isNx).toBe(true);
    expect(result.projects.length).toBeGreaterThanOrEqual(2);
    expect(result.defaultProject).toBe('demo-app');
  });

  it('discovers projects from project.json files', async () => {
    const result = await detectNxWorkspace(NX_FIXTURES);
    const names = result.projects.map(p => p.name);
    expect(names).toContain('demo-app');
    expect(names).toContain('shared-lib');
  });

  it('detects project types correctly', async () => {
    const result = await detectNxWorkspace(NX_FIXTURES);
    const demoApp = result.projects.find(p => p.name === 'demo-app');
    const sharedLib = result.projects.find(p => p.name === 'shared-lib');
    expect(demoApp?.type).toBe('app');
    expect(sharedLib?.type).toBe('lib');
  });

  it('reads tags from project.json', async () => {
    const result = await detectNxWorkspace(NX_FIXTURES);
    const demoApp = result.projects.find(p => p.name === 'demo-app');
    expect(demoApp?.tags).toContain('type:app');
    expect(demoApp?.tags).toContain('scope:frontend');
  });

  it('falls back to angular.json for multi-project workspaces', async () => {
    // Create temp NX workspace with nx.json but no project.json files
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ngpulse-nx-fallback-'));
    fs.writeFileSync(path.join(tmpDir, 'nx.json'), '{"defaultProject":"app1"}');
    fs.writeFileSync(path.join(tmpDir, 'angular.json'), JSON.stringify({
      version: 1,
      projects: {
        app1: { root: 'apps/app1', projectType: 'application' },
        lib1: { root: 'libs/lib1', projectType: 'library' },
      },
    }));
    try {
      const result = await detectNxWorkspace(tmpDir);
      expect(result.isNx).toBe(true);
      expect(result.projects.length).toBe(2);
      const names = result.projects.map(p => p.name);
      expect(names).toContain('app1');
      expect(names).toContain('lib1');
    } finally {
      fs.rmSync(tmpDir, { recursive: true });
    }
  });

  it('returns isNx false for non-NX project', async () => {
    const result = await detectNxWorkspace(NON_NX_FIXTURES);
    expect(result.isNx).toBe(false);
    expect(result.projects).toEqual([]);
  });

  it('returns isNx false for empty temp dir', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ngpulse-nx-empty-'));
    try {
      const result = await detectNxWorkspace(tmpDir);
      expect(result.isNx).toBe(false);
      expect(result.projects).toEqual([]);
    } finally {
      fs.rmSync(tmpDir, { recursive: true });
    }
  });
});
