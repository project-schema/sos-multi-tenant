'use client';

import { Container1 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import { useVendorEmployeeListQuery } from './vendor-employee-api-slice';
import { VendorEmployeeCreateModal } from './vendor-employee-create-modal';
import { VendorEmployeeTable } from './vendor-employee-table';

export function VendorEmployeePage() {
	const [page, setPage] = useState(1);

	// Fetch once for pagination object; table fetches with same args for spinner/empty.
	const { data, isLoading, isError } = useVendorEmployeeListQuery({ page });

	return (
		<Container1
			isLoading={isLoading}
			isError={isError}
			header={
				<div className="flex items-center justify-between gap-2">
					<CardTitle>Employees</CardTitle>
					<div className="flex items-center gap-2">
						<Button asChild variant="outline" size="sm">
							<Link href="/dashboard/employee/role-permissions">
								Role & Permissions
							</Link>
						</Button>
						<VendorEmployeeCreateModal />
					</div>
				</div>
			}
		>
			<VendorEmployeeTable page={page} />
		</Container1>
	);
}
