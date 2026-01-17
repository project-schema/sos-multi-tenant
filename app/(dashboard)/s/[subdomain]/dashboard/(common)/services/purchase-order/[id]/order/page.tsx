'use client';
import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { SessionProvider } from '@/provider';
import { useVendorServicesPurchaseSingleQuery } from '@/store/features/vendor/services-purchase/api-slice';
import { VendorServicePurchaseView } from '@/store/features/vendor/services-purchase/service-view';
import { useParams } from 'next/navigation';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Services', path: '/services' },
	{ name: 'Service View' },
];

export default function Page() {
	const { id } = useParams();
	const { data, isLoading, isError } = useVendorServicesPurchaseSingleQuery(
		{ id: id?.toString() || '' },
		{ skip: !id }
	);

	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Service View</CardTitle>}
			>
				{data && <VendorServicePurchaseView order={data.message} />}
			</Container1>
		</SessionProvider>
	);
}
