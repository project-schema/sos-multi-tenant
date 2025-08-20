'use client';
import { Loader5, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
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
import { useState } from 'react';
import { useAdminPerformanceGoalQuery } from './performance-goal.api.slice';
import { PerformanceGoalDelete } from './performance-goal.delete';
import { PerformanceGoalEdit } from './performance-goal.edit';

export function PerformanceGoalTable() {
	const [page, setPage] = useState(1);
	const { data, isFetching, isLoading, isError } = useAdminPerformanceGoalQuery(
		{ page }
	);

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
								<TableHead className="bg-stone-100">
									Conversion Location{' '}
								</TableHead>
								<TableHead className="bg-stone-100">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.message?.data?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={5}
										className="text-center py-8 text-muted-foreground"
									>
										No data found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								data?.message.data?.map((item, i) => (
									<TableRow key={item.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(data?.message.current_page, i)}
										</TableCell>
										<TableCell className="py-2">
											{textCount(item.name, 25)}
										</TableCell>
										<TableCell className="py-2">
											<Badge className="capitalize" variant="outline">
												{item.category?.name || ''}
											</Badge>
										</TableCell>
										<TableCell className="py-2">
											<Badge className="capitalize" variant="info">
												{item?.conversion_location?.name || ''}
											</Badge>
										</TableCell>
										<TableCell className="py-2 space-x-2">
											<PerformanceGoalEdit editData={item} />
											<PerformanceGoalDelete data={item} />
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
				{data?.message && (
					<Pagination1 pagination={data?.message} setPage={setPage} />
				)}
			</>
		</div>
	);
}
