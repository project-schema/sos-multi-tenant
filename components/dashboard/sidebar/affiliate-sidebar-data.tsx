'use client';

import {
	Crown,
	DraftingCompass,
	FileText,
	Headset,
	Megaphone,
	Package,
	PackageCheck,
	Percent,
	ShoppingCart,
	Wallet,
} from 'lucide-react';

import { sidebarItem } from './sidebar.type';

const products: sidebarItem[] = [
	{
		title: 'All Products',
		icon: Package,
		isActive: false,
		items: [
			{
				title: 'Dropshipper Products',
				url: '/dashboard/dropshipper-products/all',
			},
			{
				title: 'Active Products',
				url: '/dashboard/dropshipper-products/active',
			},
			{
				title: 'Pending Products',
				url: '/dashboard/dropshipper-products/pending',
			},
			{
				title: 'Rejected Products',
				url: '/dashboard/dropshipper-products/rejected',
			},
			{
				title: 'Expired Products',
				url: '/dashboard/dropshipper-products/expired',
			},
		],
	},
	{
		title: 'Cart',
		url: '/dashboard/cart',
		icon: ShoppingCart,
		isActive: false,
	},
	{
		title: 'Products Orders',
		url: '/dashboard/dropshipper-orders',
		icon: PackageCheck,
		isActive: false,
	},
];

const settings: sidebarItem[] = [
	{
		title: 'Coupons',
		icon: Percent,
		isActive: false,
		url: '/dashboard/coupon',
	},
	{
		title: 'Membership',
		icon: Crown,
		isActive: false,
		url: '/dashboard/membership',
	},

	{
		title: 'Balance',
		icon: Wallet,
		isActive: false,
		items: [
			{
				title: 'Recharge',
				url: '/dashboard/balance/recharge',
			},
			{
				title: 'History',
				url: '/dashboard/balance/history',
			},
			{
				title: 'Withdraw',
				url: '/dashboard/balance/withdraw',
			},
		],
	},
];

const servicesAndAdvertise: sidebarItem[] = [
	{
		title: 'Manage Services',
		icon: DraftingCompass,
		isActive: false,
		items: [
			{
				title: 'Create Service',
				url: '/dashboard/services/create',
			},
			{
				title: 'Services',
				url: '/dashboard/services',
			},
			{
				title: 'Service Order',
				url: '/dashboard/services/order',
			},
			{
				title: 'Purchase Service',
				url: '/dashboard/services/purchase',
			},
		],
	},
	{
		title: 'Manage Advertise',
		icon: Megaphone,
		isActive: false,
		items: [
			{
				title: 'Create Advertise',
				url: '/dashboard/advertise/create',
			},
			{
				title: 'All Advertise',
				url: '/dashboard/advertise',
			},
		],
	},
];

const support: sidebarItem[] = [
	{
		title: 'Supports',
		icon: Headset,
		isActive: false,
		items: [
			{
				title: 'Create Support',
				url: '/dashboard/support/create',
			},
			{
				title: 'All Supports',
				url: '/dashboard/support',
			},
		],
	},
	// {
	// 	title: 'Customer Chat',
	// 	icon: MessageSquare,
	// 	isActive: false,
	// 	url: '/dashboard/customer-chat',
	// },
];

const cms: sidebarItem[] = [
	{
		title: 'CMS',
		icon: FileText,
		isActive: false,
		items: [
			{
				title: 'System',
				url: '/dashboard/cms/system',
			},
			{
				title: 'Home Page',
				url: '/dashboard/cms/home-page',
			},
		],
	},
];

export const affiliateSidebarData = {
	products,
	settings,
	servicesAndAdvertise,
	support,
	cms,
};
