'use client';

import { Headset, Package, PackageCheck, PackageOpen } from 'lucide-react';

import { sidebarItem } from './sidebar.type';

const products: sidebarItem[] = [
	{
		title: 'Product Utilities',
		icon: Package,
		isActive: false,
		items: [
			{
				title: 'Category',
				url: '/category',
			},
			{
				title: 'Sub Category',
				url: '/sub-category',
			},
			{
				title: 'Brand',
				url: '/brand',
			},
			{
				title: 'Unit',
				url: '/unit',
			},
			{
				title: 'Color',
				url: '/color',
			},
			{
				title: 'Variation',
				url: '/variation',
			},
			{
				title: 'Supplier',
				url: '/supplier',
			},
			{
				title: 'Warehouse',
				url: '/warehouse',
			},
		],
	},
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
				url: '/customer',
			},
			{
				title: 'POS Sales',
				url: '/sales',
			},
			{
				title: 'POS Orders',
				url: '/orders',
			},
			{
				title: 'POS Sales History',
				url: '/sales-history',
			},
			{
				title: 'POS Sales Return',
				url: '/sales-return',
			},
			{
				title: 'Add Wastage',
				url: '/wastage',
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
				url: '/purchase',
			},
			{
				title: 'Purchase Products',
				url: '/purchase-products',
			},
			{
				title: 'Purchase History',
				url: '/purchase-history',
			},
			{
				title: 'Purchase Return',
				url: '/purchase-return',
			},
			{
				title: 'All Wastage',
				url: '/wastage',
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
				url: '/barcode-generator',
			},
			{
				title: 'Manage Barcode',
				url: '/manage-barcode',
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
				url: '/create-damage',
			},
			{
				title: 'Damage Products',
				url: '/damage-products',
			},
		],
	},
];
const settings: sidebarItem[] = [
	{
		title: 'Settings',
		icon: Package,
		isActive: false,
		items: [
			{
				title: 'Order Source',
				url: '/order-source',
			},
			{
				title: 'Courier Company',
				url: '/courier-company',
			},
			{
				title: 'Apply Courier',
				url: '/apply-courier',
			},
			{
				title: 'Delivery Area',
				url: '/delivery-area',
			},
			{
				title: 'Woo Commerce',
				url: '/woo-commerce',
			},
			{
				title: 'Pickup Area',
				url: '/pickup-area',
			},
			{
				title: 'Payment Methods',
				url: '/payment-methods',
			},
			{
				title: 'Invoice Generate',
				url: '/invoice-generate',
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
				url: '/create-employee',
			},
			{
				title: 'Manage Employee',
				url: '/manage-employee',
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
				url: '/recharge',
			},
			{
				title: 'History',
				url: '/history',
			},
			{
				title: 'Withdraw',
				url: '/withdraw',
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
				url: '/stock-report',
			},
			{
				title: 'Sales Report',
				url: '/sales-report',
			},
			{
				title: 'Due Sales Report',
				url: '/due-sales-report',
			},
			{
				title: 'Purchase Report',
				url: '/purchase-report',
			},
			{
				title: 'Warehouse Report',
				url: '/warehouse-report',
			},
			{
				title: 'Stock Shortage Report',
				url: '/stock-shortage-report',
			},
			{
				title: 'Top Repeat Customers',
				url: '/top-repeat-customers',
			},
			{
				title: 'Daily Sales Report',
				url: '/daily-sales-report',
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
				url: '/create-service',
			},
			{
				title: 'All Services',
				url: '/all-services',
			},
			{
				title: 'Service Order',
				url: '/service-order',
			},
			{
				title: 'Purchase Service',
				url: '/purchase-service',
			},
		],
	},
	{
		title: 'Purchase Advertise',
		url: '/purchase-advertise',
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
				url: '/create-support',
			},
			{
				title: 'All Supports',
				url: '/all-supports',
			},
		],
	},
	{
		title: 'Customer Chat',
		icon: Headset,
		isActive: false,
		url: '/customer-chat',
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
