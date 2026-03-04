import * as fs from 'node:fs';
import * as path from 'node:path';

export interface NgpulseConfig {
  thresholds?: { standalone?: number; signals?: number; lazyRoutes?: number };
  ignore?: string[];
}

export async function loadConfig(root: string): Promise<NgpulseConfig> {
  const configPath = path.join(root, '.ngpulserc.json');
  if (!fs.existsSync(configPath)) return {};
  try {
    const raw = await fs.promises.readFile(configPath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return {};
    return parsed as NgpulseConfig;
  } catch {
    return {};
  }
}
