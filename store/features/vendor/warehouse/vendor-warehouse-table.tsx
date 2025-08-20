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
import { useVendorWarehouseQuery } from './vendor-warehouse-api-slice';
import { VendorWarehouseDelete } from './vendor-warehouse-delete';
import { VendorWarehouseEdit } from './vendor-warehouse-edit';

export function VendorWarehouseTable() {
	const {
		data: warehouses,
		isFetching,
		isLoading,
		isError,
	} = useVendorWarehouseQuery({ page: '' });

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
							<TableHead className="bg-stone-100">Description </TableHead>
							<TableHead className="bg-stone-100">Status </TableHead>
							<TableHead className="bg-stone-100">Action </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{warehouses?.warehouses?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className="text-center py-8 text-muted-foreground"
								>
									No data found matching your criteria
								</TableCell>
							</TableRow>
						) : (
							warehouses?.warehouses?.map((warehouse, i) => (
								<TableRow key={warehouse.id}>
									<TableCell className="py-2 pl-4">
										{tableSrCount(1, i)}
									</TableCell>

									<TableCell className="py-2">
										{textCount(warehouse.name, 25)}
									</TableCell>

									<TableCell className={cn('py-2 whitespace-pre-wrap')}>
										{warehouse?.description || ''}
									</TableCell>

									<TableCell className="py-2">
										<Badge
											className="capitalize"
											variant={badgeFormat(warehouse.status)}
										>
											{warehouse.status}
										</Badge>
									</TableCell>
									<TableCell className="py-2 space-x-2">
										<VendorWarehouseEdit editData={warehouse} />
										<VendorWarehouseDelete data={warehouse} />
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
