'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { cn, dateFormat } from '@/lib';
import { AdminRoleDelete } from '@/store/features/admin/role-permission/admin-role-permissions-delete';
import { AdminRolePermissionsEdit } from '@/store/features/admin/role-permission/admin-role-permissions-edit';
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
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
						{data?.map((role) => (
							<Card
								key={role.id}
								className={cn('transition hover:shadow-md py-4 gap-2')}
							>
								<CardHeader>
									<CardTitle className={cn('xl:text-lg')}>
										{role.name}
									</CardTitle>
									<CardDescription className={cn('text-xs text-gray-500')}>
										Created: {dateFormat(role.created_at)}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground">
										Last updated: {dateFormat(role.updated_at)}
									</p>
								</CardContent>
								<CardFooter className={cn('flex justify-end gap-2')}>
									<AdminRolePermissionsEdit editData={role} />
									<AdminRoleDelete data={role} />
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</Container1>
		</>
	);
}
