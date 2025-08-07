'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm } from '@/lib';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAdminProductStatusUpdateMutation } from './merchant-product.api.slice';
import { iMerchantProduct } from './merchant-product.type';

//  Zod Schema
const couponSchema = z.object({
	rejected_details: z
		.string()
		.trim()
		.min(1, 'Reason is required')
		.max(1000, 'Too long'),
});

type ZodType = z.infer<typeof couponSchema>;

//  Component
export function AdminProductRejectModal({ data }: { data: iMerchantProduct }) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem
				variant="destructive"
				asChild
				onSelect={(e) => e.preventDefault()}
			>
				<DialogTrigger className="flex items-center gap-2 w-full">
					<DropdownMenuShortcut className="ml-0">
						<X className="size-4 text-destructive" />
					</DropdownMenuShortcut>
					{data.status === 'rejected' ? 'Reject Message' : 'Reject Product'}
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent className={cn('sm:max-w-xl w-full')}>
				<DialogHeader>
					<DialogTitle>Reject Product</DialogTitle>
					<DialogDescription>{data.name || ''}</DialogDescription>
				</DialogHeader>

				<FORM setOpen={setOpen} editData={data} />
			</DialogContent>
		</Dialog>
	);
}

const FORM = ({
	setOpen,
	editData,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	editData: iMerchantProduct;
}) => {
	const [update, { isLoading }] = useAdminProductStatusUpdateMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(couponSchema),
		defaultValues: {
			rejected_details: editData?.rejected_details || '',
		},
	});

	useEffect(() => {
		form.reset({
			rejected_details: editData?.rejected_details || '',
		});
	}, [editData]);

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await update({
						...data,
						id: editData.id,
						status: 'rejected',
					}).unwrap();

					if (response?.status === 200) {
						toast.success(response.message || 'Update successfully');
						form.reset();
						setOpen(false);
					} else {
						const errorResponse = response as any;
						if (typeof errorResponse.data === 'object') {
							Object.entries(errorResponse.data).forEach(([field, value]) => {
								form.setError(field as keyof ZodType, {
									type: 'server',
									message: (value as string[])[0],
								});
							});
						} else {
							toast.error(response.message || 'Something went wrong');
						}
					}
				} catch (error: any) {
					if (error?.status === 400 && typeof error.message === 'object') {
						Object.entries(error.message).forEach(([field, value]) => {
							form.setError(field as keyof ZodType, {
								type: 'server',
								message: (value as string[])[0],
							});
						});
					} else {
						toast.error('Something went wrong');
					}
				}
			},
		});
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{/* Message */}
				<FormField
					control={form.control}
					name="rejected_details"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Reject Reason</FormLabel>
							<FormControl>
								<Textarea placeholder="Message..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					{isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
					{isLoading ? 'Submitting...' : 'Submit'}
				</Button>
			</form>
		</Form>
	);
};
