export interface NavItem {
    displayName: string;
    disabled?: boolean;
    icon: string;
    route?: string;
    children?: NavItem[];
    uuid: string;
}
