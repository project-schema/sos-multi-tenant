'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { SessionProvider } from '@/provider';
import { TenantServicesEditPage } from '@/store/features/service/product/tenant/tenant-services-edit-page';
import { useVendorServicesSingleQuery } from '@/store/features/vendor/services/vendor-services-api-slice';
import { useParams } from 'next/navigation';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Services', path: '/dashboard/expertise' },
	{ name: 'Service Edit' },
];

export default function Page() {
	const { id } = useParams();
	const { data, isLoading, isError } = useVendorServicesSingleQuery(
		{ id: id?.toString() || '' },
		{ skip: !id },
	);

	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Service Edit</CardTitle>}
			>
				{data && <TenantServicesEditPage editData={data.message} />}
			</Container1>
		</SessionProvider>
	);
}
