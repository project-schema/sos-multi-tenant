'use client';

import {
	BanknoteArrowDown,
	FileText,
	Headset,
	LandPlot,
	MailCheck,
	Megaphone,
	Package,
	Package2,
	PackageCheck,
	PackageOpen,
	Puzzle,
	Settings,
	ShieldCheck,
	Sparkles,
	Star,
	Tent,
	UserCog,
} from 'lucide-react';
import * as React from 'react';

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import AppRoot from './app-root';
import { NavMain } from './nav-main';
import { SearchForm } from './search-form';
import { sidebarItem } from './sidebar.type';

const products: sidebarItem[] = [
	{
		title: 'Product Categories',
		icon: LandPlot,
		isActive: false,
		items: [
			{
				title: 'Category',
				url: '/admin/category',
			},
			{
				title: 'Sub Category',
				url: '/admin/sub-category',
			},
		],
	},

	{
		title: 'Product Brands',
		url: '/admin/brand',
		icon: LandPlot,
		isActive: false,
	},
	{
		title: 'Merchant Products',
		url: '/admin/merchant-product',
		icon: Package,
		isActive: false,
	},
	{
		title: 'Dropshipper Requests',
		url: '/admin/dropshipper-request',
		icon: PackageOpen,
		isActive: false,
	},
	{
		title: 'Products Orders',
		url: '/admin/product-order',
		icon: PackageCheck,
		isActive: false,
	},
];
const services: sidebarItem[] = [
	{
		title: 'Service Categories',
		icon: LandPlot,
		isActive: false,
		items: [
			{
				title: 'Category',
				url: '/admin/service-category',
			},
			{
				title: 'Sub Category',
				url: '/admin/service-sub-category',
			},
		],
	},

	{
		title: 'Manage Services',
		url: '/admin/service',
		icon: Package2,
		isActive: false,
	},
	{
		title: 'Service Orders',
		url: '/admin/service-order',
		icon: PackageCheck,
		isActive: false,
	},
];
const crm: sidebarItem[] = [
	{
		title: 'Home Content',
		icon: FileText,
		isActive: false,
		items: [
			{
				title: 'Update Home',
				url: '/admin/crm/home-content',
			},
			{
				title: 'Service',
				url: '/admin/crm/service',
			},
			{
				title: 'Organization',
				url: '/admin/crm/organization',
			},
			{
				title: 'Organization Two',
				url: '/admin/crm/organization-two',
			},
			{
				title: 'IT Service',
				url: '/admin/crm/it-service',
			},
			{
				title: 'Partner',
				url: '/admin/crm/partner',
			},
			{
				title: 'Social',
				url: '/admin/crm/social',
			},
			{
				title: 'Contact',
				url: '/admin/crm/contact',
			},
		],
	},
	{
		title: 'About Content',
		icon: FileText,
		isActive: false,
		items: [
			{
				title: 'Update About',
				url: '/admin/crm/about',
			},
			{
				title: 'Companions',
				url: '/admin/crm/companions',
			},
			{
				title: 'Missions',
				url: '/admin/crm/missions',
			},
			{
				title: 'Testimonial',
				url: '/admin/crm/testimonial',
			},
			{
				title: 'Members',
				url: '/admin/crm/members',
			},
		],
	},
	{
		title: 'Others Content',
		icon: FileText,
		isActive: false,
		items: [
			{
				title: 'General',
				url: '/admin/crm/general',
			},
			{
				title: 'Advertise',
				url: '/admin/crm/advertise',
			},
			{
				title: 'Advertise Faq',
				url: '/admin/crm/advertise-faq',
			},
			{
				title: 'Service',
				url: '/admin/crm/service-content',
			},
		],
	},
];
const hrm: sidebarItem[] = [
	{
		title: 'Settings',
		url: '/admin/settings',
		icon: Settings,
		isActive: false,
	},
	{
		title: 'Role Permissions',
		url: '/admin/role-permissions',
		icon: ShieldCheck,
		isActive: false,
	},
	{
		title: 'Withdrawals',
		url: '/admin/withdrawal',
		icon: BanknoteArrowDown,
		isActive: false,
	},
	{
		title: 'User Responses',
		url: '/admin/user-responses',
		icon: MailCheck,
		isActive: false,
	},
];
const users: sidebarItem[] = [
	{
		title: 'Manage Users',
		url: '/admin/users',
		icon: UserCog,
		isActive: false,
	},
];

const support: sidebarItem[] = [
	{
		title: 'Manage Supports',
		icon: Headset,
		isActive: false,
		items: [
			{
				title: 'All Supports',
				url: '/admin/support',
			},
			{
				title: 'Support Categories',
				url: '/admin/support-category',
			},
			{
				title: 'Problem Topics',
				url: '/admin/support-sub-category',
			},
		],
	},
];
const advertise: sidebarItem[] = [
	{
		title: 'Manage Advertise',
		icon: Megaphone,
		isActive: false,
		items: [
			{
				title: 'All Advertise',
				url: '/admin/advertise',
			},
			{
				title: 'Advertise Utilities',
				url: '/admin/advertise-utilities',
			},
		],
	},
];
const sass: sidebarItem[] = [
	{
		title: 'Manage Coupon',
		icon: Puzzle,
		isActive: false,
		items: [
			{
				title: 'Active Coupons',
				url: '/admin/coupon/active',
			},
			{
				title: 'Request Coupons',
				url: '/admin/coupon/request',
			},
			{
				title: 'Rejected Coupons',
				url: '/admin/coupon/rejected',
			},
		],
	},
	{
		title: 'Membership',
		url: '/admin/membership',
		icon: Star,
		isActive: false,
	},
	{
		title: 'Subscription',
		url: '/admin/subscription',
		icon: Sparkles,
		isActive: false,
	},
];
export function AppSidebarForAdmin({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const [searchQuery, setSearchQuery] = React.useState('');

	const filterItems = (items: sidebarItem[]) => {
		return items
			.map((item) => {
				const subItems = item.items?.filter((sub) =>
					sub.title.toLowerCase().includes(searchQuery.toLowerCase())
				);

				const isMatch =
					item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					(subItems && subItems.length > 0);

				if (isMatch) {
					return {
						...item,
						items: subItems,
					};
				}
				return null;
			})
			.filter(Boolean) as sidebarItem[];
	};

	const filteredUtility = filterItems(products);
	const filterUser = filterItems(users);
	const filteredServices = filterItems(services);
	const filteredCRM = filterItems(crm);
	const filteredHRM = filterItems(hrm);
	const filteredSupport = filterItems(support);
	const filteredAdvertise = filterItems(advertise);
	const filteredSaas = filterItems(sass);

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="mb-4">
				<Link href="/" className="flex items-center gap-2">
					<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
						<Tent className="size-4" />
					</div>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium text-lg">
							Start Own Startup
						</span>
						<span className="truncate text-xs">This is your Business</span>
					</div>
				</Link>
			</SidebarHeader>

			{/* 🔍 Search Input */}
			<SearchForm value={searchQuery} onChange={setSearchQuery as any} />

			{/* 📚 Filtered Navigation */}
			<SidebarContent className="gap-0 pb-8">
				<AppRoot />
				<NavMain items={filterUser} groupLabel="Users" />
				<NavMain items={filteredUtility} groupLabel="Products" />
				<NavMain items={filteredServices} groupLabel="Services" />
				<NavMain items={filteredAdvertise} groupLabel="Advertise" />
				<NavMain items={filteredSaas} groupLabel="Saas" />
				<NavMain items={filteredSupport} groupLabel="Support" />
				<NavMain items={filteredCRM} groupLabel="CRM" />
				<NavMain items={filteredHRM} groupLabel="HRM" />
			</SidebarContent>
		</Sidebar>
	);
}
