import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as os from 'node:os';
import { run } from '../src/index';

const FIXTURES = path.resolve(__dirname, '../../../fixtures');

describe('@ngtk/test-coverage', () => {
  let output: string[];
  const originalLog = console.log;

  beforeEach(() => {
    output = [];
    console.log = (...args: any[]) => { output.push(args.map(String).join(' ')); };
  });

  afterEach(() => {
    console.log = originalLog;
  });

  it('parses coverage-summary.json in JSON mode', async () => {
    await run({ root: FIXTURES, json: true, verbose: false, more: false });
    const data = JSON.parse(output.join('\n'));
    expect(data.source).toBe('coverage/coverage-summary.json');
    expect(data.files.length).toBeGreaterThan(0);
    expect(data.total.totalPercent).toBeDefined();
  });

  it('runs in text mode without error', async () => {
    await run({ root: FIXTURES, json: false, verbose: false, more: false });
    expect(output.length).toBeGreaterThan(0);
  });

  it('shows helpful message when no coverage file exists', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ngtk-tc-'));
    fs.writeFileSync(path.join(tmpDir, 'angular.json'), '{"projects":{}}');
    try {
      await run({ root: tmpDir, json: true, verbose: false, more: false });
      const data = JSON.parse(output.join('\n'));
      expect(data.error).toBe('no_coverage_file');
    } finally {
      fs.rmSync(tmpDir, { recursive: true });
    }
  });

  it('coverage values are numeric percentages', async () => {
    await run({ root: FIXTURES, json: true, verbose: false, more: false });
    const data = JSON.parse(output.join('\n'));
    expect(typeof data.total.totalPercent).toBe('number');
    expect(data.total.totalPercent).toBeGreaterThanOrEqual(0);
    expect(data.total.totalPercent).toBeLessThanOrEqual(100);
  });

  it('files array has per-file coverage data', async () => {
    await run({ root: FIXTURES, json: true, verbose: false, more: false });
    const data = JSON.parse(output.join('\n'));
    const first = data.files[0];
    expect(first.file).toBeDefined();
    expect(typeof first.lines).toBe('number');
    expect(typeof first.percent).toBe('number');
  });
});
