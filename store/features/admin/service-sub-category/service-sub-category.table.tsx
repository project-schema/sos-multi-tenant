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
import { badgeFormat, ErrorAlert, tableSrCount, textCount } from '@/lib';
import { useAdminViewServiceSubCategoryQuery } from './service-sub-category.api.slice';
import { ServiceSubCategoryDelete } from './service-sub-category.delete';
import { ServiceSubCategoryEdit } from './service-sub-category.edit';

export function ServiceSubCategoryTable() {
	const { data, isFetching, isLoading, isError } =
		useAdminViewServiceSubCategoryQuery({ page: '' });
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
							{data?.message?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={5}
										className="text-center py-8 text-muted-foreground"
									>
										No Category found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								data?.message?.map((category, i) => (
									<TableRow key={category.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(1, i)}
										</TableCell>

										<TableCell className="py-2">
											{textCount(category.name, 25)}
										</TableCell>

										<TableCell className="py-2">
											<Badge className="capitalize" variant="outline">
												{category.service_category.name || ''}
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
											<ServiceSubCategoryEdit editData={category} />
											<ServiceSubCategoryDelete data={category} />
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
