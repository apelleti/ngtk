import { describe, it, expect } from 'vitest';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as os from 'node:os';
import { loadConfig } from '../src/config';

const FIXTURES = path.resolve(__dirname, '../../../fixtures');

describe('loadConfig', () => {
  it('loads valid .ngpulserc.json from fixtures', async () => {
    const config = await loadConfig(FIXTURES);
    expect(config.thresholds).toBeDefined();
    expect(config.thresholds!.standalone).toBe(80);
    expect(config.thresholds!.signals).toBe(50);
    expect(config.thresholds!.lazyRoutes).toBe(60);
    expect(config.ignore).toEqual(['**/legacy/**']);
  });

  it('returns empty object when file is missing', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ngpulse-config-'));
    try {
      const config = await loadConfig(tmpDir);
      expect(config).toEqual({});
    } finally {
      fs.rmSync(tmpDir, { recursive: true });
    }
  });

  it('returns empty object for invalid JSON', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ngpulse-config-bad-'));
    fs.writeFileSync(path.join(tmpDir, '.ngpulserc.json'), 'not-json{{{');
    try {
      const config = await loadConfig(tmpDir);
      expect(config).toEqual({});
    } finally {
      fs.rmSync(tmpDir, { recursive: true });
    }
  });

  it('returns empty object for non-object JSON', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ngpulse-config-arr-'));
    fs.writeFileSync(path.join(tmpDir, '.ngpulserc.json'), '[1,2,3]');
    try {
      const config = await loadConfig(tmpDir);
      expect(config).toEqual({});
    } finally {
      fs.rmSync(tmpDir, { recursive: true });
    }
  });
});
