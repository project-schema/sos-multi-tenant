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
import { useVendorColorQuery } from './vendor-color-api-slice';
import { VendorColorDelete } from './vendor-color-delete';
import { VendorColorEdit } from './vendor-color-edit';

export function VendorColorTable() {
	const {
		data: colors,
		isFetching,
		isLoading,
		isError,
	} = useVendorColorQuery({ page: '' });

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
						{colors?.color?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className="text-center py-8 text-muted-foreground"
								>
									No Category found matching your criteria
								</TableCell>
							</TableRow>
						) : (
							colors?.color?.map((color, i) => (
								<TableRow key={color.id}>
									<TableCell className="py-2 pl-4">
										{tableSrCount(1, i)}
									</TableCell>

									<TableCell className="py-2">
										{textCount(color.name, 25)}
									</TableCell>

									<TableCell className="py-2">
										<Badge
											className="capitalize"
											variant={badgeFormat(color.status)}
										>
											{color.status}
										</Badge>
									</TableCell>
									<TableCell className="py-2 space-x-2">
										<VendorColorEdit editData={color} />
										<VendorColorDelete data={color} />
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
