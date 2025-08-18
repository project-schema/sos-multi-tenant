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
import { badgeFormat, ErrorAlert, tableSrCount, textCount } from '@/lib';
import { useVendorUnitQuery } from './vendor-unit-api-slice';
import { VendorUnitDelete } from './vendor-unit-delete';
import { VendorUnitEdit } from './vendor-unit-edit';

export function VendorUnitTable() {
	const {
		data: units,
		isFetching,
		isLoading,
		isError,
	} = useVendorUnitQuery({ page: '' });

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
							<TableHead className="bg-stone-100">Status </TableHead>
							<TableHead className="bg-stone-100">Action </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{units?.units?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className="text-center py-8 text-muted-foreground"
								>
									No Category found matching your criteria
								</TableCell>
							</TableRow>
						) : (
							units?.units?.map((unit, i) => (
								<TableRow key={unit.id}>
									<TableCell className="py-2 pl-4">
										{tableSrCount(1, i)}
									</TableCell>

									<TableCell className="py-2">
										{textCount(unit.unit_name, 25)}
									</TableCell>

									<TableCell className="py-2">
										<Badge
											className="capitalize"
											variant={badgeFormat(unit.status)}
										>
											{unit.status}
										</Badge>
									</TableCell>
									<TableCell className="py-2 space-x-2">
										<VendorUnitEdit editData={unit} />
										<VendorUnitDelete data={unit} />
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
