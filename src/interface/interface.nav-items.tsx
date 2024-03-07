export interface INavItem {
	label: string;
	icon: unknown;
	href: string;
	isActive?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setActiveNav?: any;
}
