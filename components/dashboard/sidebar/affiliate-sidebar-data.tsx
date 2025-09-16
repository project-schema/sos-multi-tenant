'use client';

import { Headset, Package, PackageCheck } from 'lucide-react';

import { sidebarItem } from './sidebar.type';

const products: sidebarItem[] = [
	{
		title: 'All Products',
		icon: Package,
		isActive: false,
		items: [
			{
				title: 'Merchant Products',
				url: '/merchant-products/all',
			},
			{
				title: 'Active Products',
				url: '/merchant-products/active',
			},
			{
				title: 'Pending Products',
				url: '/merchant-products/pending',
			},
			{
				title: 'Rejected Products',
				url: '/merchant-products/rejected',
			},
			{
				title: 'Expired Products',
				url: '/merchant-products/expired',
			},
		],
	},
	{
		title: 'Cart',
		url: '/cart',
		icon: Package,
		isActive: false,
	},
	{
		title: 'Products Orders',
		url: '/merchant-orders',
		icon: PackageCheck,
		isActive: false,
	},
];

const settings: sidebarItem[] = [
	{
		title: 'Coupons',
		icon: Package,
		isActive: false,
		url: '/merchant-coupon',
	},
	{
		title: 'Membership',
		icon: Package,
		isActive: false,
		url: '/merchant-membership',
	},

	{
		title: 'Balance',
		icon: Headset,
		isActive: false,
		items: [
			{
				title: 'Recharge',
				url: '/merchant-balance/recharge',
			},
			{
				title: 'History',
				url: '/merchant-balance',
			},
			{
				title: 'Withdraw',
				url: '/merchant-balance/withdraw',
			},
		],
	},
];

const servicesAndAdvertise: sidebarItem[] = [
	{
		title: 'Manage Services',
		icon: Package,
		isActive: false,
		items: [
			{
				title: 'Create Service',
				url: '/my-service/create',
			},
			{
				title: 'Services',
				url: '/my-service',
			},
			{
				title: 'Service Order',
				url: '/my-service/order',
			},
			{
				title: 'Purchase Service',
				url: '/my-service/purchase',
			},
		],
	},
	{
		title: 'Advertise',
		url: '/merchant-advertise',
		icon: Package,
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
				url: '/merchant-support/create',
			},
			{
				title: 'All Supports',
				url: '/merchant-support',
			},
		],
	},
	{
		title: 'Customer Chat',
		icon: Headset,
		isActive: false,
		url: '/merchant-support/customer-chat',
	},
];

export const affiliateSidebarData = {
	products,
	settings,
	servicesAndAdvertise,
	support,
};
