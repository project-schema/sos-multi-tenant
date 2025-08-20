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
import { useVendorSupplierQuery } from './vendor-supplier-api-slice';
import { VendorSupplierDelete } from './vendor-supplier-delete';
import { VendorSupplierEdit } from './vendor-supplier-edit';

export function VendorSupplierTable() {
	const {
		data: suppliers,
		isFetching,
		isLoading,
		isError,
	} = useVendorSupplierQuery({ page: '' });

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
							<TableHead className="bg-stone-100"> Company Name </TableHead>
							<TableHead className="bg-stone-100"> Email </TableHead>
							<TableHead className="bg-stone-100"> Phone </TableHead>
							<TableHead className="bg-stone-100">Address </TableHead>
							<TableHead className="bg-stone-100">Status </TableHead>
							<TableHead className="bg-stone-100">Action </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{suppliers?.supplies?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className="text-center py-8 text-muted-foreground"
								>
									No data found matching your criteria
								</TableCell>
							</TableRow>
						) : (
							suppliers?.supplies?.map((supplier, i) => (
								<TableRow key={supplier.id}>
									<TableCell className="py-2 pl-4">
										{tableSrCount(1, i)}
									</TableCell>

									<TableCell className="py-2">
										{textCount(supplier.supplier_name, 25)}
									</TableCell>

									<TableCell className={cn('py-2 whitespace-pre-wrap')}>
										{supplier?.business_name || ''}
									</TableCell>

									<TableCell className={cn('py-2 whitespace-pre-wrap')}>
										{supplier?.email || ''}
									</TableCell>

									<TableCell className={cn('py-2 whitespace-pre-wrap')}>
										{supplier?.phone || ''}
									</TableCell>

									<TableCell className={cn('py-2 whitespace-pre-wrap')}>
										{supplier?.address || ''}
									</TableCell>

									<TableCell className="py-2">
										<Badge
											className="capitalize"
											variant={badgeFormat(supplier.status)}
										>
											{supplier.status}
										</Badge>
									</TableCell>
									<TableCell className="py-2 space-x-2">
										<VendorSupplierEdit editData={supplier} />
										<VendorSupplierDelete data={supplier} />
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
