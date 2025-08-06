'use client';
import { Loader5, Loader8 } from '@/components/dashboard';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { ErrorAlert, tableSrCount, textCount } from '@/lib';
import { useState } from 'react';
import { useAdminViewSupportSubCategoryQuery } from './support-sub-category.api.slice';
import { SupportSubCategoryDelete } from './support-sub-category.delete';
import { SupportSubCategoryEdit } from './support-sub-category.edit';

export function SupportSubCategoryTable() {
	const [page, setPage] = useState(1);
	const {
		data: subCategories,
		isFetching,
		isLoading,
		isError,
	} = useAdminViewSupportSubCategoryQuery({ page: '' });
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
								<TableHead className="bg-stone-100">Problem topic</TableHead>
								<TableHead className="bg-stone-100">Category </TableHead>
								<TableHead className="bg-stone-100">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{subCategories?.message.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={4}
										className="text-center py-8 text-muted-foreground"
									>
										No Category found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								subCategories?.message?.map((category, i) => (
									<TableRow key={category.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(1, i)}
										</TableCell>

										<TableCell className="py-2">
											{textCount(category.name, 25)}
										</TableCell>

										<TableCell className="py-2">
											<Badge className="capitalize" variant="outline">
												{category.support_category_name || ''}
											</Badge>
										</TableCell>

										<TableCell className="py-2 space-x-2">
											<SupportSubCategoryEdit editData={category} />
											<SupportSubCategoryDelete data={category} />
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
