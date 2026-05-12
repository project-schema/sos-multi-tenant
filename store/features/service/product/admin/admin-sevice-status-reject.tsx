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
import { Ban, LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAdminUpdateVendorServiceMutation } from './admin.service.api.slice';
import { iAdminService } from './admin.service.type';

//  Zod Schema
const schema = z.object({
	reason: z.string().trim().min(1, 'Reason is required').max(2000, 'Too long'),
});

type ZodType = z.infer<typeof schema>;

export function AdminVendorServiceReject({ data }: { data: iAdminService }) {
	const [open, setOpen] = useState(false);
	const isRejected = data?.status === 'rejected';

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
				<DialogTrigger className="flex items-center gap-2 w-full">
					<DropdownMenuShortcut className="ml-0">
						<Ban className="size-4" />
					</DropdownMenuShortcut>
					{isRejected ? 'Reject Message' : 'Reject Service'}
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent className={cn('sm:max-w-2xl w-full')}>
				<DialogHeader>
					<DialogTitle>
						{isRejected ? 'Reject Message' : 'Reject Service'}
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
	editData: iAdminService;
}) => {
	const [update, { isLoading }] = useAdminUpdateVendorServiceMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			reason: editData?.reason || '',
		},
	});
	useEffect(() => {
		form.reset({
			reason: editData?.reason || '',
		});
	}, [editData]);

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await update({
						reason: data.reason,
						status: 'rejected',
						id: editData.id,
						commission: editData?.commission,
					}).unwrap();

					if (response.data === 'success') {
						toast.success(response.message || 'Updated successfully');
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

				<div className="flex justify-end">
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading
							? 'Updating...'
							: editData?.status === 'rejected'
							? 'Update Message'
							: 'Reject Service'}
					</Button>
				</div>
			</form>
		</Form>
	);
};
