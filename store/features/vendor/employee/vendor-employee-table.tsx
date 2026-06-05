'use client';

import { Loader5, Loader8 } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { badgeFormat, cn, ErrorAlert, textCount } from '@/lib';
import { useVendorEmployeeListQuery } from './vendor-employee-api-slice';
import { VendorEmployeeDelete } from './vendor-employee-delete';
import { VendorEmployeeEdit } from './vendor-employee-edit';

export function VendorEmployeeTable({ page }: { page: number | string }) {
	const {
		data: res,
		isFetching,
		isLoading,
		isError,
	} = useVendorEmployeeListQuery({ page });

	if (isError) return <ErrorAlert />;

	if (isLoading) {
		return (
			<>
				<Loader5 />
				<Loader5 />
				<Loader5 />
				<Loader5 />
			</>
		);
	}

	const employees = res?.employees || [];

	return (
		<div className="border rounded-lg relative">
			{isFetching && <Loader8 />}
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="bg-stone-100">#SL.</TableHead>
						<TableHead className="bg-stone-100">Name</TableHead>
						<TableHead className="bg-stone-100">Email</TableHead>
						<TableHead className="bg-stone-100">Phone</TableHead>
						<TableHead className="bg-stone-100">Role</TableHead>
						<TableHead className="bg-stone-100">Status</TableHead>
						<TableHead className="bg-stone-100">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{employees.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={7}
								className="text-center py-8 text-muted-foreground"
							>
								No data found matching your criteria
							</TableCell>
						</TableRow>
					) : (
						employees.map((emp, i) => (
							<TableRow key={emp.id}>
								<TableCell className="py-2 pl-4">{i + 1}</TableCell>
								<TableCell className="py-2 font-medium">
									{textCount(emp.name, 25)}
								</TableCell>
								<TableCell className={cn('py-2 whitespace-pre-wrap')}>
									{emp.email}
								</TableCell>
								<TableCell className={cn('py-2 whitespace-pre-wrap')}>
									{emp.number || ''}
								</TableCell>
								<TableCell className="py-2">
									<Badge variant="outline" className="capitalize">
										{emp.vendor_role?.name || '—'}
									</Badge>
								</TableCell>
								<TableCell className="py-2">
									<Badge
										className="capitalize"
										variant={badgeFormat(emp.status)}
									>
										{emp.status}
									</Badge>
								</TableCell>
								<TableCell className="py-2 space-x-2">
									<VendorEmployeeEdit editData={emp} />
									<VendorEmployeeDelete data={emp} />
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
