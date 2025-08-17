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

import { Pagination1 } from '@/components/dashboard/pagination';
import { Badge } from '@/components/ui/badge';
import { badgeFormat, ErrorAlert, tableSrCount, textCount } from '@/lib';
import { useState } from 'react';
import { useAdminViewSubCategoryQuery } from './sub-category.api.slice';
import { SubCategoryDelete } from './sub-category.delete';
import { SubCategoryEdit } from './sub-category.edit';

export function SubCategoryTable() {
	const [page, setPage] = useState(1);
	const {
		data: subCategories,
		isFetching,
		isLoading,
		isError,
	} = useAdminViewSubCategoryQuery({ page });
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
								<TableHead className="bg-stone-100">
									Sub Category Name{' '}
								</TableHead>
								<TableHead className="bg-stone-100">Category </TableHead>
								<TableHead className="bg-stone-100">Status </TableHead>
								<TableHead className="bg-stone-100">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{subCategories?.subcategory?.data?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={5}
										className="text-center py-8 text-muted-foreground"
									>
										No Category found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								subCategories?.subcategory?.data?.map((category, i) => (
									<TableRow key={category.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(subCategories?.subcategory.current_page, i)}
										</TableCell>

										<TableCell className="py-2">
											{textCount(category.name, 25)}
										</TableCell>

										<TableCell className="py-2">
											<Badge className="capitalize" variant="outline">
												{category.category.name || ''}
											</Badge>
										</TableCell>

										<TableCell className="py-2">
											<Badge
												className="capitalize"
												variant={badgeFormat(category.status)}
											>
												{category.status}
											</Badge>
										</TableCell>
										<TableCell className="py-2 space-x-2">
											<SubCategoryEdit editData={category} />
											<SubCategoryDelete data={category} />
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
				{subCategories?.subcategory && (
					<Pagination1
						pagination={subCategories?.subcategory}
						setPage={setPage}
					/>
				)}
			</>
		</div>
	);
}
