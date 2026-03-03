export function readVersionFromDeps(pkg: Record<string, any>, dep: string): string {
  return (
    pkg.dependencies?.[dep] ||
    pkg.devDependencies?.[dep] ||
    'not found'
  );
}
