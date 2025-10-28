'use client';

import {
	Crown,
	DraftingCompass,
	Headset,
	Megaphone,
	MessageSquare,
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
				url: '/dropshipper-products/all',
			},
			{
				title: 'Active Products',
				url: '/dropshipper-products/active',
			},
			{
				title: 'Pending Products',
				url: '/dropshipper-products/pending',
			},
			{
				title: 'Rejected Products',
				url: '/dropshipper-products/rejected',
			},
			{
				title: 'Expired Products',
				url: '/dropshipper-products/expired',
			},
		],
	},
	{
		title: 'Cart',
		url: '/cart',
		icon: ShoppingCart,
		isActive: false,
	},
	{
		title: 'Products Orders',
		url: '/dropshipper-orders',
		icon: PackageCheck,
		isActive: false,
	},
];

const settings: sidebarItem[] = [
	{
		title: 'Coupons',
		icon: Percent,
		isActive: false,
		url: '/coupon',
	},
	{
		title: 'Membership',
		icon: Crown,
		isActive: false,
		url: '/membership',
	},

	{
		title: 'Balance',
		icon: Wallet,
		isActive: false,
		items: [
			{
				title: 'Recharge',
				url: '/balance/recharge',
			},
			{
				title: 'History',
				url: '/balance/history',
			},
			{
				title: 'Withdraw',
				url: '/balance/withdraw',
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
				url: '/service/create',
			},
			{
				title: 'Services',
				url: '/service',
			},
			{
				title: 'Service Order',
				url: '/service/order',
			},
			{
				title: 'Purchase Service',
				url: '/service/purchase',
			},
		],
	},
	{
		title: 'Advertise',
		url: '/advertise',
		icon: Megaphone,
		isActive: false,
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
				url: '/support/create',
			},
			{
				title: 'All Supports',
				url: '/support',
			},
		],
	},
	{
		title: 'Customer Chat',
		icon: MessageSquare,
		isActive: false,
		url: '/customer-chat',
	},
];

export const affiliateSidebarData = {
	products,
	settings,
	servicesAndAdvertise,
	support,
};
