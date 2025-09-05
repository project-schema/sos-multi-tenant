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
		title: 'Products',
		icon: Package,
		isActive: false,
		items: [
			{
				title: 'Create Product',
				url: '/product/create',
			},
			{
				title: 'All Products',
				url: '/product',
			},
		],
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
				url: '/pos-sales/create',
			},
			{
				title: 'POS Orders',
				url: '/pos-sales',
			},
			{
				title: 'POS Payment History',
				url: '/pos-sales/payment-history',
			},
			{
				title: 'POS Sales Return',
				url: '/pos-sales/return',
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
				url: '/purchase/create',
			},
			{
				title: 'All Purchases',
				url: '/purchase',
			},
			{
				title: 'Payment History',
				url: '/purchase/payment-history',
			},
			{
				title: 'Purchase Return',
				url: '/purchase/return',
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
		title: 'Wastage & Damaged',
		icon: Package,
		isActive: false,
		items: [
			{
				title: 'Create Damage',
				url: '/damage-products/create',
			},
			{
				title: 'All Damage',
				url: '/damage-products',
			},
			{
				title: 'Create Wastage',
				url: '/wastage-products/create',
			},
			{
				title: 'All Wastage',
				url: '/wastage-products',
			},
		],
	},
];
const settings: sidebarItem[] = [
	{
		title: 'Coupons',
		icon: Package,
		isActive: false,
		url: '/coupon',
	},
	{
		title: 'Membership',
		icon: Package,
		isActive: false,
		url: '/membership',
	},
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
				title: 'Pickup Area',
				url: '/pickup-area',
			},
			{
				title: 'Delivery Area',
				url: '/delivery-area',
			},
			{
				title: 'Delivery Charge',
				url: '/delivery-charge',
			},
			{
				title: 'Woo Commerce',
				url: '/woo-commerce',
			},

			{
				title: 'Payment Methods',
				url: '/payment-methods',
			},
			// {
			// 	title: 'Invoice Generate',
			// 	url: '/invoice-generate',
			// },
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
				url: '/report?type=stock',
			},
			{
				title: 'Sales Report',
				url: '/report?type=sales',
			},
			{
				title: 'Due Sales Report',
				url: '/report?type=due-sales',
			},
			{
				title: 'Purchase Report',
				url: '/report?type=purchase',
			},
			{
				title: 'Warehouse Report',
				url: '/report?type=warehouse',
			},
			{
				title: 'Stock Shortage Report',
				url: '/report?type=stock-shortage',
			},
			{
				title: 'Top Repeat Customers',
				url: '/report?type=top-repeat-customers',
			},
			{
				title: 'Daily Sales Report',
				url: '/report?type=daily-sales',
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
				title: 'Services',
				url: '/services',
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
		title: 'Advertise',
		url: '/advertise',
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
