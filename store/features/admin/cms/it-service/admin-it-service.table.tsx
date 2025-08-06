'use client';
import { Loader5, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn, ErrorAlert, tableSrCount, textCount } from '@/lib';
import { DynamicIcon } from '@/lib/icon/dynamic-icon';
import { useState } from 'react';
import { useAdminViewCrmITServiceQuery } from './admin-it-service.api.slice';
import { CrmITServiceDelete } from './admin-it-service.delete';
import { CrmITServiceEdit } from './admin-it-service.edit';

export function CrmITServiceTable() {
	const [page, setPage] = useState(1);
	const { data, isFetching, isLoading, isError } =
		useAdminViewCrmITServiceQuery({
			page,
		});

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
								<TableHead className="bg-stone-100">Icon </TableHead>
								<TableHead className="bg-stone-100">Title </TableHead>
								<TableHead className="bg-stone-100">Description </TableHead>
								<TableHead className="bg-stone-100">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.data?.data?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={5}
										className="text-center py-8 text-muted-foreground"
									>
										No CrmITService found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								data?.data?.data?.map((item, i) => (
									<TableRow key={item.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(1, i)}
										</TableCell>

										<TableCell className="py-2">
											<DynamicIcon icon={item.icon} className="!w-8 !h-8" />
										</TableCell>

										<TableCell className="py-2">
											{textCount(item.title, 25)}
										</TableCell>
										<TableCell className={cn('py-2 whitespace-pre-wrap')}>
											{item.description}
										</TableCell>

										<TableCell className="py-2 space-x-2">
											<CrmITServiceEdit editData={item} />
											<CrmITServiceDelete data={item} />
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
				{data?.data && (
					<Pagination1 pagination={data?.data} setPage={setPage} />
				)}
			</>
		</div>
	);
}
