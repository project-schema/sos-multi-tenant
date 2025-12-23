'use client';
import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { SessionProvider } from '@/provider';
import {
	UserServiceOrderView,
	useUserSingleServiceOrderQuery,
} from '@/store/features/user/service';
import { useParams } from 'next/navigation';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/user' },
	{ name: 'Service Order', path: '/user/order' },
	{ name: 'Order View' },
];

export default function Page() {
	const { id } = useParams();
	const { data, isLoading, isError } = useUserSingleServiceOrderQuery(
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
				{data && <UserServiceOrderView order={data.message} />}
			</Container1>
		</SessionProvider>
	);
}
