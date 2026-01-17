'use client';
import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { SessionProvider } from '@/provider';
import { VendorServiceView } from '@/store/features/vendor/services/vendor-service-view';
import { useVendorServicesSingleQuery } from '@/store/features/vendor/services/vendor-services-api-slice';
import { useParams } from 'next/navigation';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Services', path: '/services' },
	{ name: 'Service View' },
];

export default function Page() {
	const { id } = useParams();
	const { data, isLoading, isError } = useVendorServicesSingleQuery(
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
				{data && <VendorServiceView service={data.message} />}
			</Container1>
		</SessionProvider>
	);
}
