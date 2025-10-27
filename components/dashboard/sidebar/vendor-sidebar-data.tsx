'use client';

import {
	BarChart3,
	CreditCard,
	DraftingCompass,
	Headset,
	LandPlot,
	Megaphone,
	MessageSquare,
	Package,
	PackageOpen,
	Percent,
	QrCode,
	Settings,
	ShoppingBag,
	ShoppingCart,
	Store,
	Trash2,
	UserCheck,
	Users,
} from 'lucide-react';

import { sidebarItem } from './sidebar.type';

const products: sidebarItem[] = [
	{
		title: 'Product Utilities',
		icon: LandPlot,
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
		url: '/product-order',
		icon: ShoppingBag,
		isActive: false,
	},
	{
		title: 'Dropshipper Requests',
		url: '/dropshipper-request',
		icon: PackageOpen,
		isActive: false,
	},
];

const pos: sidebarItem[] = [
	{
		title: 'Manage POS',
		icon: Store,
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
		icon: ShoppingCart,
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
		icon: QrCode,
		isActive: false,
		items: [
			{
				title: 'Barcode Generator',
				url: '/barcode/generator',
			},
			{
				title: 'Manage Barcode',
				url: '/barcode/manage',
			},
		],
	},

	{
		title: 'Wastage & Damaged',
		icon: Trash2,
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
		icon: Percent,
		isActive: false,
		url: '/coupon',
	},
	{
		title: 'Membership',
		icon: UserCheck,
		isActive: false,
		url: '/membership',
	},
	{
		title: 'Settings',
		icon: Settings,
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
		icon: Users,
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
		icon: CreditCard,
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
		icon: BarChart3,
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
		icon: DraftingCompass,
		isActive: false,
		items: [
			{
				title: 'Create Service',
				url: '/services/create',
			},
			{
				title: 'Services',
				url: '/services',
			},
			{
				title: 'Service Order',
				url: '/services/order',
			},
			{
				title: 'Purchase Service',
				url: '/services/purchase',
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
				url: '/advertise/create',
			},
			{
				title: 'All Advertise',
				url: '/advertise',
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

export const vendorSidebarData = {
	products,
	pos,
	settings,
	reports,
	servicesAndAdvertise,
	support,
};
