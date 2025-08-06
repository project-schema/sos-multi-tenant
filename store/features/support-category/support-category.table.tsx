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
import { ErrorAlert, tableSrCount, textCount } from '@/lib';
import { useAdminViewSupportCategoryQuery } from './support-category.api.slice';
import { SupportCategoryDelete } from './support-category.delete';
import { SupportCategoryEdit } from './support-category.edit';

export function SupportCategoryTable() {
	const {
		data: categories,
		isFetching,
		isLoading,
		isError,
	} = useAdminViewSupportCategoryQuery({ page: '' });

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
								<TableHead className="bg-stone-100">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{categories?.message?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={3}
										className="text-center py-8 text-muted-foreground"
									>
										No SupportCategory found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								categories?.message?.map((category, i) => (
									<TableRow key={category.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(1, i)}
										</TableCell>

										<TableCell className="py-2">
											{textCount(category.name, 50)}
										</TableCell>

										<TableCell className="py-2 space-x-2">
											<SupportCategoryEdit editData={category} />
											<SupportCategoryDelete data={category} />
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
