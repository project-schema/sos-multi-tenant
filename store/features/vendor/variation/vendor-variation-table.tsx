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
import { useVendorVariationQuery } from './vendor-variation-api-slice';
import { VendorVariationDelete } from './vendor-variation-delete';
import { VendorVariationEdit } from './vendor-variation-edit';

export function VendorVariationTable() {
	const {
		data: variations,
		isFetching,
		isLoading,
		isError,
	} = useVendorVariationQuery({ page: '' });

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
						{variations?.size?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className="text-center py-8 text-muted-foreground"
								>
									No Variation found matching your criteria
								</TableCell>
							</TableRow>
						) : (
							variations?.size?.map((size, i) => (
								<TableRow key={size.id}>
									<TableCell className="py-2 pl-4">
										{tableSrCount(1, i)}
									</TableCell>

									<TableCell className="py-2">
										{textCount(size.name, 25)}
									</TableCell>

									<TableCell className="py-2">
										<Badge
											className="capitalize"
											variant={badgeFormat(size.status)}
										>
											{size.status}
										</Badge>
									</TableCell>
									<TableCell className="py-2 space-x-2">
										<VendorVariationEdit editData={size} />
										<VendorVariationDelete data={size} />
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
