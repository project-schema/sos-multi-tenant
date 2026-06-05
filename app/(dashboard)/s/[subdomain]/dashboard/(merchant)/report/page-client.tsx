'use client';

import { DbHeader } from '@/components/dashboard';
import { cn } from '@/lib';
import { SessionProvider } from '@/provider';
import {
	VendorDailySalesReportPage,
	VendorDueSalesReportPage,
	VendorPurchaseReportPage,
	VendorSalesReportPage,
	VendorStockReportPage,
	VendorStockShortageReportPage,
	VendorTopRepeatCustomerReportPage,
	VendorWarehouseReportPage,
} from '@/store/features/vendor/report';
import {
	AlertTriangle,
	CalendarDays,
	Clock,
	LucideIcon,
	Package,
	ShoppingCart,
	Users,
	Warehouse,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const reportItems: {
	title: string;
	type: string;
	icon: LucideIcon;
}[] = [
	{ title: 'Stock Report', type: 'stock', icon: Package },
	{ title: 'Sales Report', type: 'sales', icon: ShoppingCart },
	{ title: 'Due Sales Report', type: 'due-sales', icon: Clock },
	{ title: 'Purchase Report', type: 'purchase', icon: ShoppingCart },
	{ title: 'Warehouse Report', type: 'warehouse', icon: Warehouse },
	{
		title: 'Stock Shortage Report',
		type: 'stock-shortage',
		icon: AlertTriangle,
	},
	{
		title: 'Top Repeat Customers',
		type: 'top-repeat-customers',
		icon: Users,
	},
	{ title: 'Daily Sales Report', type: 'daily-sales', icon: CalendarDays },
];

export default function ReportPage() {
	const searchParams = useSearchParams();
	const type = searchParams.get('type') || 'stock';

	const currentItem =
		reportItems.find((item) => item.type === type) || reportItems[0];

	const breadcrumbItems = useMemo(
		() => [
			{ name: 'Dashboard', path: '/dashboard' },
			{ name: 'Reports', path: '/dashboard/report' },
			{ name: currentItem.title },
		],
		[currentItem.title]
	);

	const renderReportPage = () => {
		switch (type) {
			case 'stock':
				return <VendorStockReportPage />;
			case 'sales':
				return <VendorSalesReportPage />;
			case 'due-sales':
				return <VendorDueSalesReportPage />;
			case 'purchase':
				return <VendorPurchaseReportPage />;
			case 'warehouse':
				return <VendorWarehouseReportPage />;
			case 'stock-shortage':
				return <VendorStockShortageReportPage />;
			case 'top-repeat-customers':
				return <VendorTopRepeatCustomerReportPage />;
			case 'daily-sales':
				return <VendorDailySalesReportPage />;
			default:
				return <VendorStockReportPage />;
		}
	};

	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="mx-6 mt-4 mb-4 flex flex-col gap-4 ">
				<div className="flex flex-wrap gap-2  pb-3 w-full px-2 xl:px-4">
					{reportItems.map((item) => {
						const isActive = item.type === type;
						return (
							<Link
								key={item.type}
								href={`/dashboard/report?type=${item.type}`}
								className={cn(
									'inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors',
									isActive
										? 'border-primary bg-primary text-primary-foreground font-semibold'
										: 'border-border bg-background text-muted-foreground hover:bg-muted'
								)}
							>
								<item.icon size={16} />
								<span>{item.title}</span>
							</Link>
						);
					})}
				</div>
				<div className="w-full">{renderReportPage()}</div>
			</div>
		</SessionProvider>
	);
}
