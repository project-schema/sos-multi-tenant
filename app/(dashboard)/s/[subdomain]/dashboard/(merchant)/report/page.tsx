'use client';

import { DbHeader } from '@/components/dashboard';
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
import { useSearchParams } from 'next/navigation';

export default function ReportPage() {
	const searchParams = useSearchParams();
	const type = searchParams.get('type');

	const breadcrumbItems = [
		{ name: 'Dashboard', path: '/dashboard' },
		{
			name: `${type && type?.charAt(0).toUpperCase() + type?.slice(1)} Report`,
		},
	];

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
			case 'top-repeat-customer':
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
			{renderReportPage()}
		</SessionProvider>
	);
}
