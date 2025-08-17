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
import { useAdminViewServiceCategoryQuery } from './service-category.api.slice';
import { ServiceCategoryDelete } from './service-category.delete';
import { ServiceCategoryEdit } from './service-category.edit';

export function ServiceCategoryTable() {
	const { data, isFetching, isLoading, isError } =
		useAdminViewServiceCategoryQuery({ page: '' });

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
								<TableHead className="bg-stone-100">Status </TableHead>
								<TableHead className="bg-stone-100">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.message.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={4}
										className="text-center py-8 text-muted-foreground"
									>
										No ServiceCategory found matching your criteria
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
											<Badge
												className="capitalize"
												variant={badgeFormat(category.status)}
											>
												{category.status}
											</Badge>
										</TableCell>
										<TableCell className="py-2 space-x-2">
											<ServiceCategoryEdit editData={category} />
											<ServiceCategoryDelete data={category} />
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
