'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { SessionProvider } from '@/provider';
import { useVendorSupportViewQuery } from '@/store/features/vendor/support/vendor-support-api-slice';
import { VendorSupportView } from '@/store/features/vendor/support/vendor-support-view';
import { useParams } from 'next/navigation';

export default function Page() {
	const breadcrumbItems = [
		{ name: 'Dashboard', path: '/dashboard' },
		{ name: 'Support', path: '/support' },
		{ name: 'View' },
	];

	const { id } = useParams();
	const { isLoading, isError } = useVendorSupportViewQuery(
		{ id: id as string },
		{
			skip: !id,
		},
	);

	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isLoading={isLoading}
				isError={isError}
				header={<CardTitle>Support</CardTitle>}
			>
				<VendorSupportView />
			</Container1>
		</SessionProvider>
	);
}
