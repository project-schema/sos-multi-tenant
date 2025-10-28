'use client';
import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { useVendorServicesSingleQuery } from '@/store/features/vendor/services/vendor-services-api-slice';
import { VendorServicesEdit } from '@/store/features/vendor/services/vendor-services-edit-page';
import { useParams } from 'next/navigation';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Services', path: '/services' },
	{ name: 'Service Edit' },
];

export default function Page() {
	const { id } = useParams();
	const { data, isLoading, isError } = useVendorServicesSingleQuery(
		{ id: id?.toString() || '' },
		{ skip: !id }
	);

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Service Edit</CardTitle>}
			>
				{data && <VendorServicesEdit editData={data} />}
			</Container1>
		</>
	);
}
