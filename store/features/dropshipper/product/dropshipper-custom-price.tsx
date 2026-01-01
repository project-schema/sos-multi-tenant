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
import { Input } from '@/components/ui/input';
import { alertConfirm } from '@/lib';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Pencil } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { iCompleteMerchantProduct } from '../../admin/merchant-product/merchant-product.type';
import { useDropshipperCustomPriceMutation } from './dropshipper-product-api-slice';
import { iDropShipperProduct } from './dropshipper-product-type';

//  Zod Schema
const couponSchema = z.object({
	profit_amount: z.number().min(1, 'Price is required'),
});

type ZodType = z.infer<typeof couponSchema>;

//  Component
export function DropshipperCustomPrice({
	data,
}: {
	data: iCompleteMerchantProduct;
}) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
				<DialogTrigger className="flex items-center gap-2 w-full">
					<DropdownMenuShortcut className="ml-0">
						<Pencil className="size-4  " />
					</DropdownMenuShortcut>
					Custom Price
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent className={cn('sm:max-w-xl w-full')}>
				<DialogHeader>
					<DialogTitle>Custom Price</DialogTitle>
					<DialogDescription>{data.product?.name || ''}</DialogDescription>
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
	editData: iDropShipperProduct;
}) => {
	const [update, { isLoading }] = useDropshipperCustomPriceMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(couponSchema),
		defaultValues: {
			profit_amount: editData?.selling_price || '',
		},
	});

	useEffect(() => {
		form.reset({
			profit_amount: editData?.selling_price || '',
		});
	}, [editData]);

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await update({
						id: editData.id,
						profit_amount: data.profit_amount.toString(),
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
					name="profit_amount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Price..."
									{...field}
									onWheel={(e) => {
										(e.target as HTMLInputElement).blur();
									}}
									onChange={(e) => {
										field.onChange(e.target.valueAsNumber || '');
									}}
								/>
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
