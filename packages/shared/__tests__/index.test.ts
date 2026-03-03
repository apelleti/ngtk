import { describe, it, expect } from 'vitest';
import * as path from 'node:path';
import { scanFiles, readFileContent, parseAngularWorkspace, formatBytes, createTable, boxDraw, progressBar } from '../src/index';

const FIXTURES = path.resolve(__dirname, '../../../fixtures');

describe('@ngtk/shared', () => {
  it('scanFiles finds .ts files', async () => {
    const files = await scanFiles(FIXTURES, ['**/*.component.ts']);
    expect(files.length).toBeGreaterThan(0);
  });

  it('readFileContent reads a file', async () => {
    const content = await readFileContent(path.join(FIXTURES, 'package.json'));
    expect(content).toContain('demo-app');
  });

  it('parseAngularWorkspace parses angular.json', async () => {
    const ws = await parseAngularWorkspace(FIXTURES);
    expect(ws.projects).toHaveProperty('demo-app');
  });

  it('formatBytes formats correctly', () => {
    expect(formatBytes(500)).toBe('500 B');
    expect(formatBytes(1500)).toBe('1.5 KB');
  });

  it('createTable returns a string', () => {
    const result = createTable(['A', 'B'], [['1', '2']]);
    expect(result).toContain('1');
  });

  it('boxDraw creates a box', () => {
    const result = boxDraw('Title', ['line1', 'line2']);
    expect(result).toContain('Title');
  });

  it('progressBar shows percentage', () => {
    const result = progressBar(50, 100);
    expect(result).toContain('50%');
  });
});
