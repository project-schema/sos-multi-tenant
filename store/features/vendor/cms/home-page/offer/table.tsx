'use client';

import { Loader5, Loader8 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { alertConfirm, ErrorAlert, tableSrCount } from '@/lib';
import { LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
	useTenantDeleteHomeOfferMutation,
	useTenantViewHomeOfferQuery,
} from './api-slice';
import { iHomeOffer } from './type';
import { OfferUpdate } from './update';

// Delete Button Component
function OfferDelete({ data }: { data: iHomeOffer }) {
	const [mutation, { isLoading }] = useTenantDeleteHomeOfferMutation();
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
						toast.success('Offer deleted successfully');
					}
				} catch (err) {
					toast.error('Failed to delete offer');
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

export function OfferTable() {
	const [page, setPage] = useState(1);
	const {
		data: offers,
		isFetching,
		isLoading,
		isError,
	} = useTenantViewHomeOfferQuery({ page });

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
							<TableHead className="bg-stone-100">Title</TableHead>
							<TableHead className="bg-stone-100">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{offers?.data?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={3}
									className="text-center py-8 text-muted-foreground"
								>
									No offers selected for home page. Add offers to get started.
								</TableCell>
							</TableRow>
						) : (
							offers?.data?.map((homeOffer, i) => (
								<TableRow key={homeOffer.id}>
									<TableCell className="py-2 pl-4">
										{tableSrCount(page, i)}
									</TableCell>
									<TableCell className="py-2 max-w-full whitespace-pre-wrap">
										{homeOffer.title}
									</TableCell>
									<TableCell className="py-2 space-x-2">
										<OfferUpdate editData={homeOffer} />
										<OfferDelete data={homeOffer} />
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
