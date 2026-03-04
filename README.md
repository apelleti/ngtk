# ngtk

[![npm version](https://img.shields.io/npm/v/@ngtk/cli.svg)](https://www.npmjs.com/package/@ngtk/cli)
[![CI](https://github.com/AntoinePouworkaround/ngtk/actions/workflows/ci.yml/badge.svg)](https://github.com/AntoinePouworkaround/ngtk/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-3178c6.svg)](https://www.typescriptlang.org/)

**Diagnose, analyze, and maintain Angular projects from the terminal.**

ngtk is a zero-config CLI that gives you instant visibility into an Angular codebase: dependency health, route structure, dead code, tech debt, and more — in a single command.

## Demo

```
$ npx ngtk info

╭─────────────────────────────────────────────────╮
│  ngtk — Angular Project Info                    │
│                                                 │
│  Versions                                       │
│    Angular:      ^18.2.0                        │
│    TypeScript:   ~5.4.5                         │
│    RxJS:         ~7.8.1                         │
│    Node:         v20.11.0                       │
│    Pkg Manager:  pnpm                           │
│                                                 │
│  Artifact Counts                                │
│    Components:    47                            │
│    Services:      22                            │
│    Pipes:          5                            │
│    Directives:     8                            │
│    Guards:         3                            │
│    Interceptors:   2                            │
│    Modules:       12                            │
│                                                 │
│  Health Indicators                              │
│    Standalone:   ████████░░  38/47  (81%)       │
│    Signals:      ██████░░░░  14/47  (30%)       │
│    Lazy Routes:  █████████░  18/21  (86%)       │
╰─────────────────────────────────────────────────╯
```

## Installation

**Zero-install** — run directly with npx:

```bash
npx ngtk <command>
```

**Or install globally:**

```bash
npm install -g @ngtk/cli
# or
pnpm add -g @ngtk/cli
```

## Commands

| Command | Alias | Description |
|---------|-------|-------------|
| `info` | — | Neofetch-style project dashboard: versions, artifact counts, health indicators |
| `env-compare` | `env` | Compare `environment*.ts` files and spot missing keys across envs |
| `component-weight` | `cw` | Rank components by total file weight (TS + HTML + SCSS) |
| `dep-map` | `deps` | Map all dependencies, categorized as Angular / ecosystem / generic |
| `orphans` | — | Find `.ts`, `.html`, `.scss` files not referenced by any import |
| `empty-barrel` | `eb` | Detect boilerplate: empty stylesheets, trivial specs, empty services |
| `dead-css` | `dc` | Find unused CSS classes per component |
| `route-tree` | `rt` | Print the full route tree as an ASCII tree with guards and lazy markers |
| `component-catalog` | `cc` | List all components with metadata: standalone, selectors, change detection |
| `compat-matrix` | `compat` | Check Angular/TypeScript/RxJS/Node version compatibility |
| `debt-log` | `debt` | Aggregate TODO/FIXME/HACK comments with git blame age and author |

## Global Options

Every command accepts these flags:

```
-r, --root <path>   Angular project root (default: cwd)
    --json           Output as JSON (pipe-friendly)
-v, --verbose        Verbose output with debug info
-V, --version        Print version
```

## Examples

**CI pipeline — fail on dead code:**

```bash
npx ngtk orphans --json | jq 'if length > 0 then halt_error(1) else empty end'
```

**Onboarding — get a project overview in seconds:**

```bash
npx ngtk info
npx ngtk route-tree
npx ngtk compat-matrix
```

**Refactoring audit — find cleanup targets:**

```bash
npx ngtk dead-css
npx ngtk empty-barrel
npx ngtk debt-log
```

**Compare environment files before a deploy:**

```bash
npx ngtk env-compare --json | jq '.missing'
```

## Contributing

```bash
git clone https://github.com/AntoinePouworkaround/ngtk.git
cd ngtk
pnpm install
pnpm build
pnpm test
```

The project is a pnpm workspace monorepo with 14 packages under `packages/`. Each command is its own package (`@ngtk/<command>`) with shared utilities in `@ngtk/shared`.

```
packages/
  cli/              # CLI entry point (commander)
  shared/           # Shared utilities, types, AST helpers
  info/             # info command
  env-compare/      # env-compare command
  component-weight/ # component-weight command
  dep-map/          # dep-map command
  orphans/          # orphans command
  empty-barrel/     # empty-barrel command
  dead-css/         # dead-css command
  route-tree/       # route-tree command
  component-catalog/# component-catalog command
  compat-matrix/    # compat-matrix command
  debt-log/         # debt-log command
```

**Scripts:**

| Script | Description |
|--------|-------------|
| `pnpm build` | Build all packages |
| `pnpm test` | Run all tests (Vitest) |
| `pnpm lint` | ESLint (typescript-eslint) |
| `pnpm format` | Prettier |

## License

MIT
