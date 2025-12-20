'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
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
import { useVendorRequestProductStatusMutation } from './dropshipper-request.api.slice';
import { iDropShipReq } from './dropshipper-request.type';

//  Zod Schema
const couponSchema = z.object({
	reason: z.string().trim().min(1, 'Reason is required').max(2000, 'Too long'),
});

type ZodType = z.infer<typeof couponSchema>;

//  Component
export function DropshipperRejectRequest({ data }: { data: iDropShipReq }) {
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
					{data.status === 3 ? 'Reject Message' : 'Reject Request'}
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent className={cn('sm:max-w-xl w-full')}>
				<DialogHeader>
					<DialogTitle>
						Reject {data.status === 3 ? 'Message' : 'Request'}
					</DialogTitle>
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
	editData: iDropShipReq;
}) => {
	const [update, { isLoading }] = useVendorRequestProductStatusMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(couponSchema),
		defaultValues: {
			reason: editData?.reason || '',
		},
	});

	useEffect(() => {
		form.reset({ reason: editData?.reason || '' });
	}, [editData]);

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await update({
						reason: data?.reason,
						id: editData.id,
						status: 3,
						tenant_id: editData.tenant_id,
					}).unwrap();

					if (response.status === 200) {
						toast.success(response.message || 'Successfully rejected');
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
				{/* Reason */}
				<FormField
					control={form.control}
					name="reason"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Reject Reason</FormLabel>
							<FormControl>
								<Textarea placeholder="Type reason..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					{isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
					{isLoading
						? 'Rejecting...'
						: editData?.status === 3
						? 'Update Reject Message'
						: 'Reject'}
				</Button>
			</form>
		</Form>
	);
};
