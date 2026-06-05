'use client';

import {
	BarChart3,
	Crown,
	DraftingCompass,
	FileText,
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
	Users,
	Wallet,
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
				url: '/dashboard/category',
			},
			{
				title: 'Sub Category',
				url: '/dashboard/sub-category',
			},
			{
				title: 'Brand',
				url: '/dashboard/brand',
			},
			{
				title: 'Unit',
				url: '/dashboard/unit',
			},
			{
				title: 'Color',
				url: '/dashboard/color',
			},
			{
				title: 'Variation',
				url: '/dashboard/variation',
			},
			{
				title: 'Supplier',
				url: '/dashboard/supplier',
			},
			{
				title: 'Warehouse',
				url: '/dashboard/warehouse',
			},
		],
	},
	{
		title: 'Products',
		icon: Package,
		isActive: false,
		url: '/dashboard/product',
	},
	{
		title: 'Products Orders',
		url: '/dashboard/product-order',
		icon: ShoppingBag,
		isActive: false,
	},
	{
		title: 'Register Customers',
		url: '/dashboard/product-customer',
		icon: Users,
		isActive: false,
	},
	{
		title: 'Dropshipper Requests',
		url: '/dashboard/dropshipper-request',
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
				url: '/dashboard/customer',
			},
			{
				title: 'POS Sales',
				url: '/dashboard/pos-sales/create',
			},
			{
				title: 'POS Orders',
				url: '/dashboard/pos-sales',
			},
			{
				title: 'POS Payment History',
				url: '/dashboard/pos-sales/payment-history',
			},
			{
				title: 'POS Sales Return',
				url: '/dashboard/pos-sales/return',
			},
		],
	},
	{
		title: 'Manage Purchase',
		icon: ShoppingCart,
		isActive: false,
		items: [
			{
				title: 'All Purchases',
				url: '/dashboard/purchase',
			},
			{
				title: 'Payment History',
				url: '/dashboard/purchase/payment-history',
			},
			{
				title: 'Purchase Return',
				url: '/dashboard/purchase/return',
			},
		],
	},
	{
		title: 'Barcode ',
		icon: QrCode,
		isActive: false,
		url: '/dashboard/barcode/manage',
	},

	{
		title: 'Wastage & Damaged',
		icon: Trash2,
		isActive: false,
		items: [
			{
				title: 'All Damage',
				url: '/dashboard/damage-products',
			},

			{
				title: 'All Wastage',
				url: '/dashboard/wastage-products',
			},
		],
	},
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
			{
				title: 'Blog',
				url: '/dashboard/cms/blog',
			},
			{
				title: 'Blog Category',
				url: '/dashboard/cms/blog-category',
			},
		],
	},
];

const settings: sidebarItem[] = [
	{
		title: 'Coupons',
		icon: Percent,
		isActive: false,
		url: '/dashboard/coupon/generate',
	},
	{
		title: 'Membership',
		icon: Crown,
		isActive: false,
		url: '/dashboard/membership',
	},
	{
		title: 'Settings',
		icon: Settings,
		isActive: false,
		items: [
			{
				title: 'Order Source',
				url: '/dashboard/order-source',
			},
			{
				title: 'Courier Company',
				url: '/dashboard/courier-company',
			},
			// {
			// 	title: 'Pickup Area',
			// 	url: '/dashboard/pickup-area',
			// },
			// {
			// 	title: 'Delivery Area',
			// 	url: '/dashboard/delivery-area',
			// },
			{
				title: 'Delivery Charge',
				url: '/dashboard/delivery-charge',
			},
			{
				title: 'Woo Commerce',
				url: '/dashboard/woo-commerce',
			},

			{
				title: 'Payment Methods',
				url: '/dashboard/payment-methods',
			},
			{
				title: 'Invoice Generate',
				url: '/dashboard/invoice-generate',
			},
		],
	},
	{
		title: 'Employee',
		icon: Users,
		isActive: false,
		url: '/dashboard/employee',
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

const reports: sidebarItem[] = [
	{
		title: 'Reports',
		icon: BarChart3,
		isActive: false,
		url: '/dashboard/report',
	},
];

const servicesAndAdvertise: sidebarItem[] = [
	{
		title: 'Manage Services',
		icon: DraftingCompass,
		isActive: false,
		items: [
			{
				title: 'Services',
				url: '/dashboard/expertise',
			},
			{
				title: 'Service Order',
				url: '/dashboard/expertise/order',
			},
		],
	},
	{
		title: 'Services Purchase',
		icon: DraftingCompass,
		isActive: false,
		items: [
			{
				title: 'All Services',
				url: '/dashboard/expertise/purchase',
			},
			{
				title: 'Purchase Service',
				url: '/dashboard/expertise/purchase-order',
			},
		],
	},
	{
		title: 'Manage Advertise',
		icon: Megaphone,
		isActive: false,
		url: '/dashboard/advertise',
	},
];

const support: sidebarItem[] = [
	{
		title: 'Supports',
		icon: Headset,
		isActive: false,
		url: '/dashboard/support',
	},
	{
		title: 'Customer Chat',
		icon: MessageSquare,
		isActive: false,
		url: '/dashboard/customer-chat',
	},
];

export const vendorSidebarData = {
	products,
	pos,
	settings,
	reports,
	servicesAndAdvertise,
	support,
	cms,
};
