'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { useAdminAllRoleQuery } from '@/store/features/admin/role-permission/role-permissions-api-slice';
import CreateRole from '@/store/features/admin/role-permission/role-permissions-create';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Role & Permissions' },
];

export default function Page() {
	const { data, isLoading, isError } = useAdminAllRoleQuery(undefined);
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isLoading={isLoading}
				isError={isError}
				header={
					<div className="flex justify-between items-center">
						<CardTitle>Role & Permissions</CardTitle>
						<CreateRole />
					</div>
				}
			>
				<div>
					{data?.map((role) => (
						<div key={role.id}>
							<CardTitle>{role.name}</CardTitle>
						</div>
					))}
				</div>
			</Container1>
		</>
	);
}
