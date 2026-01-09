'use client';

import { Loader5, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	alertConfirm,
	badgeFormat,
	env,
	ErrorAlert,
	tableSrCount,
	textCount,
} from '@/lib';
import { LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
	useTenantDeleteHomePageCategoryMutation,
	useTenantViewHomePageCategoryQuery,
} from './api-slice';
import { iHomePageCategory } from './type';
import { CategoryUpdate } from './update';

// Delete Button Component
function CategoryDelete({ data }: { data: iHomePageCategory }) {
	const [mutation, { isLoading }] = useTenantDeleteHomePageCategoryMutation();
	const [clicked, setClicked] = useState(false);

	const handleClick = async () => {
		if (clicked || isLoading) return;

		setClicked(true);

		alertConfirm({
			onOk: async () => {
				try {
					const res = await mutation({
						id: data.id,
					}).unwrap();
					if (res.status === 200) {
						toast.success('Category removed from home page successfully');
					}
				} catch (err) {
					toast.error('Failed to remove category from home page');
				} finally {
					setClicked(false);
				}
			},
			onCancel: () => {
				setClicked(false);
			},
		});
	};

	return (
		<Button onClick={handleClick} variant="outline" size="icon">
			{isLoading ? (
				<LoaderCircle className="size-4 animate-spin text-destructive" />
			) : (
				<X className="size-4 text-destructive" />
			)}
			<span className="sr-only">Remove</span>
		</Button>
	);
}

export function CategoryTable() {
	const [page, setPage] = useState(1);
	const {
		data: categories,
		isFetching,
		isLoading,
		isError,
	} = useTenantViewHomePageCategoryQuery({ page });

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
							<TableHead className="bg-stone-100">Category Image</TableHead>
							<TableHead className="bg-stone-100">Category Name</TableHead>
							<TableHead className="bg-stone-100">Display Order</TableHead>
							<TableHead className="bg-stone-100">Status</TableHead>
							<TableHead className="bg-stone-100">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{categories?.categories?.data?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className="text-center py-8 text-muted-foreground"
								>
									No categories selected for home page. Add categories to get started.
								</TableCell>
							</TableRow>
						) : (
							categories?.categories.data?.map((homeCategory, i) => (
								<TableRow key={homeCategory.id}>
									<TableCell className="py-2 pl-4">
										{tableSrCount(categories?.categories.current_page, i)}
									</TableCell>
									<TableCell className="py-2">
										<Avatar className="h-10 w-10 rounded-lg">
											<AvatarImage
												src={env.baseAPI + '/' + homeCategory.category.image}
												alt={homeCategory.category.name}
												className="object-cover"
											/>
											<AvatarFallback className="rounded-lg bg-sky-100">
												{homeCategory.category.name.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</TableCell>
									<TableCell className="py-2">
										{textCount(homeCategory.category.name, 30)}
									</TableCell>
									<TableCell className="py-2">{homeCategory.order}</TableCell>
									<TableCell className="py-2">
										<Badge
											className="capitalize"
											variant={badgeFormat(homeCategory.status)}
										>
											{homeCategory.status}
										</Badge>
									</TableCell>
									<TableCell className="py-2 space-x-2">
										<CategoryUpdate editData={homeCategory} />
										<CategoryDelete data={homeCategory} />
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
			{categories?.categories && (
				<Pagination1 pagination={categories?.categories} setPage={setPage} />
			)}
		</>
	);
}