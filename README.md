# ngtk — Angular Toolkit CLI

> Une collection de micro-CLI pour diagnostiquer, analyser et maintenir les projets Angular.

## Installation

```bash
pnpm install
pnpm build
```

## Usage

```bash
# Run from an Angular project directory, or use --root
npx ngtk <command> [options]
```

### Global Options

| Option | Description |
|--------|------------|
| `-r, --root <path>` | Angular project root (default: cwd) |
| `--json` | Output as JSON |
| `-v, --verbose` | Verbose output |

### Commands

| Command | Alias | Description |
|---------|-------|-------------|
| `info` | | Dashboard neofetch-style du projet Angular |
| `env-compare` | `env` | Comparateur d'environnements |
| `component-weight` | `cw` | Classement composants par poids |
| `dep-map` | `deps` | Cartographie des dépendances |
| `orphans` | | Fichiers non référencés |
| `empty-barrel` | `eb` | Fichiers boilerplate inutiles |
| `dead-css` | `dc` | CSS mort par composant |
| `route-tree` | `rt` | Arbre ASCII des routes |
| `component-catalog` | `cc` | Catalogue composants |
| `compat-matrix` | `compat` | Matrice de compatibilité |
| `debt-log` | `debt` | Agrégateur TODO/FIXME/HACK |

## Development

```bash
pnpm install
pnpm build
pnpm test
```

## Stack

TypeScript, Commander.js, ts-morph, chalk, cli-table3, postcss, Vitest

## Architecture

pnpm workspaces monorepo with packages:
- `@ngtk/cli` — Main CLI entry point
- `@ngtk/shared` — Shared utilities (fs, ast, format, workspace)
- `@ngtk/info` through `@ngtk/debt-log` — Individual command packages
