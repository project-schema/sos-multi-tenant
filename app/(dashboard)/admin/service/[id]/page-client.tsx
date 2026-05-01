'use client';
import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { SessionProvider } from '@/provider';
import { useAdminVendorServiceSingleQuery } from '@/store/features/admin/service';
import { VendorServiceView } from '@/store/features/vendor/services/vendor-service-view';
import { useParams } from 'next/navigation';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Service', path: '/admin/service' },
	{ name: 'View' },
];

export default function Page() {
	const { id } = useParams();
	const { data, isLoading, isError } = useAdminVendorServiceSingleQuery(
		{ id: id?.toString() || '' },
		{ skip: !id },
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
