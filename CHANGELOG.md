# Changelog

All notable changes to ngpulse are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.1.1] — 2026-03-04

### Fixed
- **e2e**: `test-coverage` E2E tests now accept both "no coverage file" and actual coverage data as valid outputs — no longer fails in CI where `coverage/` is gitignored
- **lint**: Removed unused `lines` variable in `circular-deps`
- **lint**: Removed unused `BLOCK_COMMENT_RE` constant in `debt-log`
- **lint**: Removed unnecessary regex escapes (`\[`, `\*`) in `signal-migrate` and `style-audit`
- **lint**: Replaced `any[]` with proper types in `info` angular.json parser
- **lint**: Replaced `'gray' as any` casts with typed color values in `info`

---

## [0.1.0] — 2026-03-04

### Added

#### CLI & Infrastructure
- Initial monorepo setup with pnpm workspaces (22 packages)
- `@ngpulse/cli` — Commander.js CLI entry point with 20 commands
- Global options: `--root`, `--json`, `--verbose`, `--more`
- `-m, --more` flag for detailed file-level breakdowns
- E2E test suite (31 tests) against real Angular fixtures
- CI workflow (GitHub Actions) with build + unit + E2E steps
- npm publish workflow triggered on `v*` tags

#### Commands
- **`info`** — Angular neofetch dashboard
  - Project name, type, Angular/TS/RxJS/Node versions (installed + range)
  - Build tool detection (esbuild vs webpack)
  - Strict mode, zoneless, HttpClient, Angular Material, NX detection
  - Artifact counts (components, services, pipes, directives, guards, interceptors, modules)
  - Health indicators with progress bars: Standalone %, Signals %, Lazy Routes %
  - `--more`: adds OnPush %, inject() %, Lines of Code + per-file detail
- **`env-compare`** — Diff Angular environment files, surface missing keys
- **`component-weight`** — Rank components by TS + HTML + SCSS total size
- **`dep-map`** — Categorize all dependencies (Angular / ecosystem / generic)
- **`orphans`** — Find `.ts`, `.html`, `.scss` files not referenced by any import
- **`empty-barrel`** — Detect empty stylesheets, trivial specs, skeleton services
- **`dead-css`** — Find unused CSS classes per component (template analysis)
- **`route-tree`** — ASCII route tree with guards, lazy markers, component names
- **`component-catalog`** — List all components: standalone, selectors, change detection
- **`compat-matrix`** — Angular / TypeScript / RxJS / Node version compatibility matrix (Angular 12–21)
- **`debt-log`** — TODO / FIXME / HACK with git blame (age + author)
- **`input-output`** — Audit unused `@Input()` / `@Output()` decorators
- **`circular-deps`** — Detect circular import chains across the codebase
- **`test-coverage`** — Parse and display lcov / Istanbul coverage reports
- **`i18n-check`** — Find text nodes missing `i18n` markers in HTML templates
- **`migration-hints`** — Prioritized list of Angular modernization opportunities
- **`signal-migrate`** — Identify properties ready for `signal()` migration
- **`naming-check`** — Enforce Angular naming conventions (selectors, suffixes, kebab-case files)
- **`style-audit`** — Find `::ng-deep`, `!important`, unscoped styles
- **`hardcoded-secrets`** — Detect API keys, tokens, JWT secrets in source files

#### Shared utilities (`@ngpulse/shared`)
- `boxDraw(title: string | null, lines: string[])` — bordered box renderer
- `progressBar(value, total, width, color)` — half-block progress bars (▄)
- `colorize(text, color)` — chalk wrapper with `darkGreen` support
- `GlobalOptions` interface with `root`, `json`, `verbose`, `more`
- `walkTs(root)`, `walkHtml(root)`, `walkScss(root)` — recursive file walkers
- `readFileContent(path)` — async file reader with error handling

#### Fixtures
- Angular 18 demo app (`^18.2.0`, TypeScript `~5.5.0`)
- 16 components (9 standalone, 7 module-based)
- 7 services, 2 guards, 1 pipe, 1 directive, 1 interceptor
- NgRx effects, date-fns, lodash-es dependencies
- 29 debt items (TODO / FIXME / HACK)
- Circular dependency chains
- Hardcoded secrets examples
- Naming convention violations
- Missing i18n markers
- `angular.json` with esbuild builder
- `package.json` with `packageManager: pnpm@9.0.0`

---

## Upcoming

- `report` — Full HTML health report (all metrics in one file)
- NX workspace support (`nx.json` detection, multi-project scanning)
- `.ngpulserc.json` — configurable thresholds per project
- `watch` mode — live re-run on file changes
