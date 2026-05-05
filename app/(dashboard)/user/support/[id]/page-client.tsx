'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { useUserSupportViewQuery } from '@/store/features/user/support/api-slice';
import { UserSupportView } from '@/store/features/user/support/view';
import { useParams } from 'next/navigation';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/user' },
	{ name: 'Support', path: '/user/support' },
	{ name: 'View' },
];
export default function Page() {
	const { id } = useParams();

	const { data, isLoading, isError, isFetching } = useUserSupportViewQuery(
		{ id: id as string },
		{
			skip: !id,
		},
	);
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Support</CardTitle>}
			>
				<UserSupportView />
			</Container1>
		</>
	);
}
