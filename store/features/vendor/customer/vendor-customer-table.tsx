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
import { badgeFormat, cn, ErrorAlert, tableSrCount, textCount } from '@/lib';
import { useVendorCustomerQuery } from './vendor-customer-api-slice';
import { VendorCustomerDelete } from './vendor-customer-delete';
import { VendorCustomerEdit } from './vendor-customer-edit';

export function VendorCustomerTable() {
	const {
		data: customers,
		isFetching,
		isLoading,
		isError,
	} = useVendorCustomerQuery({ page: '' });

	if (isError) {
		return <ErrorAlert />;
	}

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
	return (
		<>
			<div className="border rounded-lg relative">
				{isFetching && <Loader8 />}
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="bg-stone-100">#SL.</TableHead>
							<TableHead className="bg-stone-100">Name </TableHead>
							<TableHead className="bg-stone-100"> Phone </TableHead>
							<TableHead className="bg-stone-100">Email </TableHead>
							<TableHead className="bg-stone-100">Address </TableHead>
							<TableHead className="bg-stone-100">Description </TableHead>
							<TableHead className="bg-stone-100">Status </TableHead>
							<TableHead className="bg-stone-100">Action </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{customers?.customers?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={8}
									className="text-center py-8 text-muted-foreground"
								>
									No data found matching your criteria
								</TableCell>
							</TableRow>
						) : (
							customers?.customers?.map((customer, i) => (
								<TableRow key={customer.id}>
									<TableCell className="py-2 pl-4">
										{tableSrCount(1, i)}
									</TableCell>

									<TableCell className="py-2">
										{textCount(customer.customer_name, 25)}
									</TableCell>

									<TableCell className={cn('py-2 whitespace-pre-wrap')}>
										{customer?.phone || ''}
									</TableCell>

									<TableCell className={cn('py-2 whitespace-pre-wrap')}>
										{customer?.email || ''}
									</TableCell>

									<TableCell className={cn('py-2 whitespace-pre-wrap')}>
										{customer?.address || ''}
									</TableCell>

									<TableCell className={cn('py-2 whitespace-pre-wrap')}>
										{customer?.description || ''}
									</TableCell>

									<TableCell className="py-2">
										<Badge
											className="capitalize"
											variant={badgeFormat(customer.status)}
										>
											{customer.status}
										</Badge>
									</TableCell>
									<TableCell className="py-2 space-x-2">
										<VendorCustomerEdit editData={customer} />
										<VendorCustomerDelete data={customer} />
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
