'use client';
import { Loader8 } from '@/components/dashboard';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Pagination1 } from '@/components/dashboard/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { badgeFormat, env, tableSrCount, textCount } from '@/lib';
import Link from 'next/link';
import { useState } from 'react';
import { useAdminViewCategoryQuery } from './category.api.slice';
import { CategoryDelete } from './category.delete';
import { CategoryEdit } from './category.edit';

export function CategoryTable() {
	const [page, setPage] = useState(1);
	const { data: allUsers, isFetching } = useAdminViewCategoryQuery({ page });
	return (
		<div>
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
							{allUsers?.category?.data?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={6}
										className="text-center py-8 text-muted-foreground"
									>
										No Category found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								allUsers?.category.data?.map((category, i) => (
									<TableRow key={category.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(page, i)}
										</TableCell>
										<TableCell className="py-2">
											<Link href={`/admin/users/${category.id}`}>
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
											{textCount(category.name, 15)}
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
											<CategoryEdit editData={category} />
											<CategoryDelete data={category} />
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
				{allUsers?.category && (
					<Pagination1 pagination={allUsers?.category} setPage={setPage} />
				)}
			</>
		</div>
	);
}
