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
	useTenantDeleteServiceMutation,
	useTenantViewServiceQuery,
} from './api-slice';
import { iService } from './type';
import { ServiceUpdate } from './update';

// Delete Button Component
function ServiceDelete({ data }: { data: iService }) {
	const [mutation, { isLoading }] = useTenantDeleteServiceMutation();
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
						toast.success('Service deleted successfully');
					}
				} catch (err) {
					toast.error('Failed to delete service');
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

export function ServiceTable() {
	const [page, setPage] = useState(1);
	const {
		data: services,
		isFetching,
		isLoading,
		isError,
	} = useTenantViewServiceQuery({ page });

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
							<TableHead className="bg-stone-100">Icon</TableHead>
							<TableHead className="bg-stone-100">Title</TableHead>
							<TableHead className="bg-stone-100">Description</TableHead>
							<TableHead className="bg-stone-100">Order</TableHead>
							<TableHead className="bg-stone-100">Status</TableHead>
							<TableHead className="bg-stone-100">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{services?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={7}
									className="text-center py-8 text-muted-foreground"
								>
									No services found. Add your first service to get started.
								</TableCell>
							</TableRow>
						) : (
							services?.map((service, i) => (
								<TableRow key={service.id}>
									<TableCell className="py-2 pl-4">
										{tableSrCount(page, i)}
									</TableCell>
									<TableCell className="py-2">
										<Avatar className="h-10 w-10 rounded-lg">
											<AvatarImage
												src={env.baseAPI + '/' + service.icon}
												alt={service.title}
												className="object-cover"
											/>
											<AvatarFallback className="rounded-lg bg-sky-100">
												{service.title.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</TableCell>
									<TableCell className="py-2">
										{textCount(service.title, 30)}
									</TableCell>
									<TableCell className="py-2">
										{textCount(service.description || '-', 40)}
									</TableCell>
									<TableCell className="py-2">{service.order}</TableCell>
									<TableCell className="py-2">
										<Badge
											className="capitalize"
											variant={badgeFormat(service.status)}
										>
											{service.status}
										</Badge>
									</TableCell>
									<TableCell className="py-2 space-x-2">
										<ServiceUpdate editData={service} />
										<ServiceDelete data={service} />
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
			{services?.services && (
				<Pagination1 pagination={services?.services} setPage={setPage} />
			)}
		</>
	);
}
