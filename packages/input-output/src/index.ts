import * as path from 'node:path';
import type { GlobalOptions, ClassDeclaration } from '@ngpulse/shared';
import {
  scanFiles,
  readFileContent,
  colorize,
  createTable,
  boxDraw,
  createProject,
  addSourceFiles,
  getClasses,
  getDecorator,
  getPropsWithDecorator,
} from '@ngpulse/shared';

interface InputOutputEntry {
  component: string;
  filePath: string;
  name: string;
  kind: 'input' | 'output';
  used: boolean;
}

function extractInputsOutputs(cls: ClassDeclaration): { name: string; kind: 'input' | 'output' }[] {
  const results: { name: string; kind: 'input' | 'output' }[] = [];

  // @Input() decorated properties
  for (const prop of getPropsWithDecorator(cls, 'Input')) {
    const decorator = prop.getDecorator('Input')!;
    const args = decorator.getArguments();
    // Check for alias: @Input('aliasName')
    let alias: string | undefined;
    if (args.length > 0) {
      const argText = args[0].getText().replace(/^['"`]|['"`]$/g, '');
      // Simple string alias (not object config)
      if (!argText.startsWith('{')) {
        alias = argText;
      }
    }
    results.push({ name: alias || prop.getName(), kind: 'input' });
  }

  // @Output() decorated properties
  for (const prop of getPropsWithDecorator(cls, 'Output')) {
    const decorator = prop.getDecorator('Output')!;
    const args = decorator.getArguments();
    let alias: string | undefined;
    if (args.length > 0) {
      const argText = args[0].getText().replace(/^['"`]|['"`]$/g, '');
      if (!argText.startsWith('{')) {
        alias = argText;
      }
    }
    results.push({ name: alias || prop.getName(), kind: 'output' });
  }

  // Signal-based input()/output() properties
  for (const prop of cls.getProperties()) {
    const init = prop.getInitializer();
    if (!init) continue;
    const text = init.getText();
    if (/^input\s*[<(]/.test(text) || /^input\.required\s*[<(]/.test(text)) {
      results.push({ name: prop.getName(), kind: 'input' });
    } else if (/^output\s*[<(]/.test(text)) {
      results.push({ name: prop.getName(), kind: 'output' });
    }
  }

  return results;
}

const HTML_STANDARD_ATTRS = new Set([
  'type', 'class', 'href', 'id', 'style', 'value', 'name', 'src', 'alt',
  'title', 'disabled', 'placeholder', 'hidden', 'for', 'action', 'method',
  'target', 'rel', 'media', 'lang',
]);

function isUsedInTemplate(name: string, kind: 'input' | 'output', templates: string[]): boolean {
  for (const tpl of templates) {
    if (kind === 'input') {
      if (new RegExp(`\\[${name}\\]\\s*=`).test(tpl)) return true;
      if (!HTML_STANDARD_ATTRS.has(name) && new RegExp(`\\b${name}\\s*=\\s*"`, 'i').test(tpl)) return true;
    } else {
      if (new RegExp(`\\(${name}\\)\\s*=`).test(tpl)) return true;
    }
  }
  return false;
}

export async function run(options: GlobalOptions): Promise<void> {
  const { root, json: jsonMode, more } = options;

  const tsFiles = await scanFiles(root, ['**/*.component.ts']);
  const htmlFiles = await scanFiles(root, ['**/*.html']);

  const templates: string[] = [];
  for (const f of htmlFiles) {
    templates.push(await readFileContent(f));
  }

  const project = createProject();
  const sfList = addSourceFiles(project, tsFiles);
  const entries: InputOutputEntry[] = [];

  for (const sf of sfList) {
    const filePath = sf.getFilePath();
    const componentName = path.basename(filePath, '.component.ts');

    for (const cls of getClasses(sf)) {
      if (!getDecorator(cls, 'Component')) continue;

      const ios = extractInputsOutputs(cls);
      for (const io of ios) {
        entries.push({
          component: componentName,
          filePath: path.relative(root, filePath),
          name: io.name,
          kind: io.kind,
          used: isUsedInTemplate(io.name, io.kind, templates),
        });
      }
    }
  }

  entries.sort((a, b) => {
    if (a.used !== b.used) return a.used ? 1 : -1;
    return a.component.localeCompare(b.component);
  });

  const totalInputs = entries.filter((e) => e.kind === 'input').length;
  const totalOutputs = entries.filter((e) => e.kind === 'output').length;
  const unusedInputs = entries.filter((e) => e.kind === 'input' && !e.used).length;
  const unusedOutputs = entries.filter((e) => e.kind === 'output' && !e.used).length;

  if (jsonMode) {
    console.log(
      JSON.stringify({
        entries,
        summary: { totalInputs, totalOutputs, unusedInputs, unusedOutputs },
      }),
    );
    return;
  }

  if (entries.length === 0) {
    console.log(colorize('No @Input() or @Output() decorators found.', 'green'));
    return;
  }

  const headers = more
    ? ['Component', 'Name', 'Kind', 'Used', 'File']
    : ['Component', 'Name', 'Kind', 'Used'];

  const rows = entries.map((e) => {
    const usedStr = e.used ? colorize('yes', 'green') : colorize('NO', 'red');
    const row = [e.component, e.name, e.kind, usedStr];
    if (more) row.push(e.filePath);
    return row;
  });

  console.log(createTable(headers, rows));
  console.log(
    boxDraw(null, [
      `Inputs:  ${totalInputs} total, ${colorize(String(unusedInputs), unusedInputs > 0 ? 'yellow' : 'green')} unused`,
      `Outputs: ${totalOutputs} total, ${colorize(String(unusedOutputs), unusedOutputs > 0 ? 'yellow' : 'green')} unused`,
    ]),
  );
}
