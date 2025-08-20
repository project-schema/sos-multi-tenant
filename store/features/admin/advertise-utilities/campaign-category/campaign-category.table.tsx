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
import { ErrorAlert, tableSrCount, textCount } from '@/lib';
import { DynamicIcon } from '@/lib/icon/dynamic-icon';
import { useState } from 'react';
import { useAdminCampaignCategoryQuery } from './campaign-category.api.slice';
import { CampaignCategoryDelete } from './campaign-category.delete';
import { CampaignCategoryEdit } from './campaign-category.edit';

export function CampaignCategoryTable() {
	const [page, setPage] = useState(1);
	const {
		data: categories,
		isFetching,
		isLoading,
		isError,
	} = useAdminCampaignCategoryQuery({ page });

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
								<TableHead className="bg-stone-100">Name </TableHead>
								<TableHead className="bg-stone-100">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{categories?.message?.data?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={4}
										className="text-center py-8 text-muted-foreground"
									>
										No data found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								categories?.message.data?.map((category, i) => (
									<TableRow key={category.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(categories?.message.current_page, i)}
										</TableCell>
										<TableCell className="py-2 pl-4">
											<DynamicIcon icon={category.icon} className="!w-8 !h-8" />
										</TableCell>

										<TableCell className="py-2">
											{textCount(category.name, 25)}
										</TableCell>

										<TableCell className="py-2 space-x-2">
											<CampaignCategoryEdit editData={category} />
											<CampaignCategoryDelete data={category} />
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
				{categories?.message && (
					<Pagination1 pagination={categories?.message} setPage={setPage} />
				)}
			</>
		</div>
	);
}
