export interface INavItem {
  label: string;
  icon: string;
  href: string;
  isActive?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCurrentNav?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose?: any;
  tag?: string;
}
