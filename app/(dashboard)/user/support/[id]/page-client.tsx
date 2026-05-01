'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { VendorSupportView } from '@/store/features/vendor/support/vendor-support-view';
import { useParams } from 'next/navigation';

export default function Page() {
	const { id } = useParams();
	const breadcrumbItems = [
		{ name: 'Dashboard', path: '/user' },
		{ name: 'Support', path: '/user/support' },
		{ name: 'View' },
	];
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Support</CardTitle>}>
				<VendorSupportView />
			</Container1>
		</>
	);
}
