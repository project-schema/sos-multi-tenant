'use client';
import { Loader5, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { badgeFormat, env, ErrorAlert, tableSrCount, textCount } from '@/lib';
import Link from 'next/link';
import { useState } from 'react';
import { useVendorViewCategoryQuery } from './vendor-category-api-slice';
import { VendorCategoryDelete } from './vendor-category-delete';
import { VendorCategoryEdit } from './vendor-category-edit';

export function VendorCategoryTable() {
	const [page, setPage] = useState(1);
	const {
		data: categories,
		isFetching,
		isLoading,
		isError,
	} = useVendorViewCategoryQuery({ page });

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
							<TableHead className="bg-stone-100">Profile </TableHead>
							<TableHead className="bg-stone-100">Name </TableHead>
							<TableHead className="bg-stone-100">Status </TableHead>
							<TableHead className="bg-stone-100">Action </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{categories?.category?.data?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className="text-center py-8 text-muted-foreground"
								>
									No Category found matching your criteria
								</TableCell>
							</TableRow>
						) : (
							categories?.category.data?.map((category, i) => (
								<TableRow key={category.id}>
									<TableCell className="py-2 pl-4">
										{tableSrCount(categories?.category.current_page, i)}
									</TableCell>
									<TableCell className="py-2">
										<Link href={`/Vendor/users/${category.id}`}>
											<Avatar className="h-12 w-12 rounded-xl">
												<AvatarImage
													src={env.baseAPI + '/' + category.image}
													alt={category.name}
												/>
												<AvatarFallback className="rounded-xl bg-sky-100">
													{category.name.charAt(0).toUpperCase()}
												</AvatarFallback>
											</Avatar>
										</Link>
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
										<VendorCategoryEdit editData={category} />
										<VendorCategoryDelete data={category} />
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
			{categories?.category && (
				<Pagination1 pagination={categories?.category} setPage={setPage} />
			)}
		</>
	);
}
