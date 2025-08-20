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
import { ErrorAlert, tableSrCount, textCount } from '@/lib';
import { useAdminAdFormatQuery } from './ad_format.api.slice';
import { AdFormatDelete } from './ad_format.delete';
import { AdFormatEdit } from './ad_format.edit';

export function AdFormatTable() {
	const { data, isFetching, isLoading, isError } =
		useAdminAdFormatQuery(undefined);

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
		<div>
			<>
				<div className="border rounded-lg relative">
					{isFetching && <Loader8 />}
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="bg-stone-100">#SL.</TableHead>
								<TableHead className="bg-stone-100">Name </TableHead>
								<TableHead className="bg-stone-100">
									Campaign Category{' '}
								</TableHead>
								<TableHead className="bg-stone-100">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.message?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={4}
										className="text-center py-8 text-muted-foreground"
									>
										No data found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								data?.message?.map((item, i) => (
									<TableRow key={item.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(1, i)}
										</TableCell>
										<TableCell className="py-2">
											{textCount(item.add_format, 25)}
										</TableCell>
										<TableCell className="py-2">
											<Badge className="capitalize" variant="outline">
												{item.category.name || ''}
											</Badge>
										</TableCell>
										<TableCell className="py-2 space-x-2">
											<AdFormatEdit editData={item} />
											<AdFormatDelete data={item} />
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</>
		</div>
	);
}
