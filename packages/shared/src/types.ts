export interface GlobalOptions {
  root: string;
  json: boolean;
  verbose: boolean;
  more: boolean;
}

export interface ComponentMeta {
  name: string;
  selector: string;
  standalone: boolean;
  templateUrl?: string;
  styleUrls: string[];
  filePath: string;
  inlineTemplate: boolean;
  inlineStyles: boolean;
}

export interface ServiceMeta {
  name: string;
  filePath: string;
  methods: string[];
  providedIn: string | null;
}

export interface AngularProject {
  name: string;
  root: string;
  sourceRoot: string;
  projectType: 'application' | 'library';
}

export interface AngularWorkspace {
  version: number;
  projects: Record<string, AngularProject>;
  defaultProject?: string;
}

export interface RouteNode {
  path: string;
  component?: string;
  lazy: boolean;
  guards: string[];
  children: RouteNode[];
}

export interface DebtItem {
  type: 'TODO' | 'FIXME' | 'HACK';
  message: string;
  file: string;
  line: number;
  age?: string;
  author?: string;
}

export interface DependencyInfo {
  name: string;
  version: string;
  depType: 'dependencies' | 'devDependencies';
  category: 'angular' | 'ecosystem' | 'generic';
  deprecated: boolean;
}

export interface ComponentWeight {
  name: string;
  filePath: string;
  tsSize: number;
  templateSize: number;
  styleSize: number;
  totalSize: number;
}

export interface OrphanFile {
  filePath: string;
  size: number;
  extension: string;
}

export interface EmptyBarrel {
  filePath: string;
  reason: string;
  type: 'empty-style' | 'trivial-spec' | 'empty-service' | 'empty-template';
}

export interface DeadCssResult {
  component: string;
  filePath: string;
  declared: string[];
  used: string[];
  unused: string[];
}

export interface CompatEntry {
  package: string;
  currentVersion: string;
  compatible: boolean;
  recommended?: string;
}
