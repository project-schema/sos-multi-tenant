'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { cn, dateFormat } from '@/lib';
import {
	useVendorEmployeeAllRoleQuery,
	VendorEmployeeCreateRole,
	VendorEmployeeRoleDelete,
	VendorEmployeeRolePermissionsEdit,
} from '@/store/features/vendor/employee/role-permission';
import { useRouter } from 'next/navigation';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Employee', path: '/dashboard/employee' },
	{ name: 'Role & Permissions' },
];

export default function Page() {
	const { data, isLoading, isError } = useVendorEmployeeAllRoleQuery(undefined);

	const router = useRouter();

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isLoading={isLoading}
				isError={isError}
				header={
					<div className="flex justify-between items-center">
						<CardTitle>Employee Role & Permissions</CardTitle>
						<div className="flex items-center gap-2">
							<Button
								onClick={() => router.push('/dashboard/employee')}
								variant="outline"
							>
								Employees
							</Button>
							<VendorEmployeeCreateRole />
						</div>
					</div>
				}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
					{data?.roles?.map((role) => (
						<Card
							key={role.id}
							className={cn('transition hover:shadow-md py-4 gap-2')}
						>
							<CardHeader>
								<CardTitle className={cn('xl:text-lg')}>{role.name}</CardTitle>
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
								<VendorEmployeeRolePermissionsEdit editData={role} />
								<VendorEmployeeRoleDelete data={role} />
							</CardFooter>
						</Card>
					))}
				</div>
			</Container1>
		</>
	);
}
