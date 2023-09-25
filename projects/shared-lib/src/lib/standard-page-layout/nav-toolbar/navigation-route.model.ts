export interface NavigationRoute {
  label: string;
  route?: string;
  requireAuth?: boolean;
  children?: NavigationRoute[];
}
