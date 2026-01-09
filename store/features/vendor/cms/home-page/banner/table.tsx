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
	useTenantDeleteBannerMutation,
	useTenantViewBannerQuery,
} from './api-slice';
import { iBanner } from './type';
import { BannerUpdate } from './update';

// Delete Button Component
function BannerDelete({ data }: { data: iBanner }) {
	const [mutation, { isLoading }] = useTenantDeleteBannerMutation();
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
						toast.success('Banner deleted successfully');
					}
				} catch (err) {
					toast.error('Failed to delete banner');
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
			<span className="sr-only">Delete</span>
		</Button>
	);
}

export function BannerTable() {
	const [page, setPage] = useState(1);
	const {
		data: banners,
		isFetching,
		isLoading,
		isError,
	} = useTenantViewBannerQuery({ page });

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
							<TableHead className="bg-stone-100">Image</TableHead>
							<TableHead className="bg-stone-100">Title</TableHead>
							<TableHead className="bg-stone-100">Subtitle</TableHead>
							<TableHead className="bg-stone-100">Order</TableHead>
							<TableHead className="bg-stone-100">Status</TableHead>
							<TableHead className="bg-stone-100">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{banners?.banners?.data?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={7}
									className="text-center py-8 text-muted-foreground"
								>
									No banners found. Add your first banner to get started.
								</TableCell>
							</TableRow>
						) : (
							banners?.banners.data?.map((banner, i) => (
								<TableRow key={banner.id}>
									<TableCell className="py-2 pl-4">
										{tableSrCount(banners?.banners.current_page, i)}
									</TableCell>
									<TableCell className="py-2">
										<Avatar className="h-16 w-24 rounded-lg">
											<AvatarImage
												src={env.baseAPI + '/' + banner.image}
												alt={banner.title}
												className="object-cover"
											/>
											<AvatarFallback className="rounded-lg bg-sky-100">
												{banner.title.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</TableCell>
									<TableCell className="py-2">
										{textCount(banner.title, 30)}
									</TableCell>
									<TableCell className="py-2">
										{textCount(banner.subtitle || '-', 25)}
									</TableCell>
									<TableCell className="py-2">{banner.order}</TableCell>
									<TableCell className="py-2">
										<Badge
											className="capitalize"
											variant={badgeFormat(banner.status)}
										>
											{banner.status}
										</Badge>
									</TableCell>
									<TableCell className="py-2 space-x-2">
										<BannerUpdate editData={banner} />
										<BannerDelete data={banner} />
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
			{banners?.banners && (
				<Pagination1 pagination={banners?.banners} setPage={setPage} />
			)}
		</>
	);
}
