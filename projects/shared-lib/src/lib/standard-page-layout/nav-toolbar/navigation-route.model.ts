export interface SimpleNavigationRoute {
  label: string;
  route?: string;
  href?: string;
  requireAuth?: boolean;
}

export interface NestedNavigationRoute extends SimpleNavigationRoute {
  children?: SimpleNavigationRoute[];
}
