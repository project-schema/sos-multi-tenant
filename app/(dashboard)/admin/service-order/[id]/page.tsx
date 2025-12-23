'use client';
import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { SessionProvider } from '@/provider';
import {
	AdminServiceOrderView,
	useAdminSingleServiceOrderQuery,
} from '@/store/features/admin/service-order';
import { useParams } from 'next/navigation';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Service Order', path: '/admin/service-order' },
	{ name: 'Order View' },
];

export default function Page() {
	const { id } = useParams();
	const { data, isLoading, isError } = useAdminSingleServiceOrderQuery(
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
				{data && <AdminServiceOrderView order={data.message} />}
			</Container1>
		</SessionProvider>
	);
}
