'use client';

import { Headset, Package, PackageCheck, PackageOpen } from 'lucide-react';

import { sidebarItem } from './sidebar.type';

const products: sidebarItem[] = [
	{
		title: 'All Products',
		url: '/admin/all-product',
		icon: Package,
		isActive: false,
	},
	{
		title: 'Products Orders',
		url: '/admin/product-order',
		icon: PackageCheck,
		isActive: false,
	},
	{
		title: 'Dropshipper Requests',
		url: '/admin/dropshipper-request',
		icon: PackageOpen,
		isActive: false,
	},
];
const pos: sidebarItem[] = [
	{
		title: 'Manage POS',
		icon: Package,
		isActive: false,
		items: [
			{
				title: 'POS Customer',
				url: '/admin/category',
			},
			{
				title: 'POS Sales',
				url: '/admin/category',
			},
			{
				title: 'POS Orders',
				url: '/admin/sub-category',
			},
			{
				title: 'POS Sales History',
				url: '/admin/support-topic',
			},
			{
				title: 'POS Sales Return',
				url: '/admin/support-topic',
			},
			{
				title: 'Add Wastage',
				url: '/admin/support-topic',
			},
		],
	},
	{
		title: 'Manage Purchase',
		icon: Package,
		isActive: false,
		items: [
			{
				title: 'New Purchase',
				url: '/admin/category',
			},
			{
				title: 'Purchase Products',
				url: '/admin/sub-category',
			},
			{
				title: 'Purchase History',
				url: '/admin/support-topic',
			},
			{
				title: 'Purchase Return',
				url: '/admin/support-topic',
			},
			{
				title: 'All Wastage',
				url: '/admin/support-topic',
			},
		],
	},
	{
		title: 'Barcode ',
		icon: Package,
		isActive: false,
		items: [
			{
				title: 'Barcode Generator',
				url: '/admin/category',
			},
			{
				title: 'Manage Barcode',
				url: '/admin/sub-category',
			},
		],
	},

	{
		title: 'Damaged Product',
		icon: Package,
		isActive: false,
		items: [
			{
				title: 'Create Damage',
				url: '/admin/category',
			},
			{
				title: 'Damage Products',
				url: '/admin/sub-category',
			},
		],
	},
];
const settings: sidebarItem[] = [
	{
		title: 'Setup First',
		icon: Package,
		isActive: false,
		items: [
			{
				title: 'Supplier',
				url: '/admin/category',
			},
			{
				title: 'Warehouse',
				url: '/admin/category',
			},
			{
				title: 'Delivery Charge',
				url: '/admin/category',
			},
			{
				title: 'Unit',
				url: '/admin/category',
			},
			{
				title: 'Color',
				url: '/admin/category',
			},
			{
				title: 'Variation',
				url: '/admin/category',
			},
		],
	},
	{
		title: 'Settings',
		icon: Package,
		isActive: false,
		items: [
			{
				title: 'Order Source',
				url: '/admin/sub-category',
			},
			{
				title: 'Courier Company',
				url: '/admin/support-topic',
			},
			{
				title: 'Apply Courier',
				url: '/admin/category',
			},
			{
				title: 'Delivery Area',
				url: '/admin/sub-category',
			},
			{
				title: 'Woo Commerce',
				url: '/admin/support-topic',
			},
			{
				title: 'Pickup Area',
				url: '/admin/category',
			},
			{
				title: 'Payment Methods',
				url: '/admin/sub-category',
			},
			{
				title: 'Invoice Generate',
				url: '/admin/support-topic',
			},
		],
	},
	{
		title: 'Employee',
		icon: Headset,
		isActive: false,
		items: [
			{
				title: 'Create Employee',
				url: '/admin/support-category',
			},
			{
				title: 'Manage Employee',
				url: '/admin/support',
			},
		],
	},
	{
		title: 'Balance',
		icon: Headset,
		isActive: false,
		items: [
			{
				title: 'Recharge',
				url: '/admin/support-category',
			},
			{
				title: 'History',
				url: '/admin/support',
			},
			{
				title: 'Withdraw',
				url: '/admin/support',
			},
		],
	},
];
const reports: sidebarItem[] = [
	{
		title: 'All Reports',
		icon: Package,
		isActive: false,
		items: [
			{
				title: 'Stock Report',
				url: '/admin/category',
			},
			{
				title: 'Sales Report',
				url: '/admin/category',
			},
			{
				title: 'Due Sales Report',
				url: '/admin/category',
			},
			{
				title: 'Purchase Report',
				url: '/admin/category',
			},
			{
				title: 'Warehouse Report',
				url: '/admin/category',
			},
			{
				title: 'Stock Shortage Report',
				url: '/admin/category',
			},
			{
				title: 'Top Repeat Customers',
				url: '/admin/category',
			},
			{
				title: 'Daily Sales Report',
				url: '/admin/category',
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
				url: '/admin/category',
			},
			{
				title: 'All Services',
				url: '/admin/category',
			},
			{
				title: 'Service Order',
				url: '/admin/category',
			},
			{
				title: 'Purchase Service',
				url: '/admin/category',
			},
		],
	},
	{
		title: 'Purchase Advertise',
		url: '/admin/category',
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
				url: '/admin/support-category',
			},
			{
				title: 'All Supports',
				url: '/admin/support',
			},
		],
	},
	{
		title: 'Customer Chat',
		icon: Headset,
		isActive: false,
		url: '/admin/support',
	},
];

export const vendorSidebarData = {
	products,
	pos,
	settings,
	reports,
	servicesAndAdvertise,
	support,
};
