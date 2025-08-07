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
import { Input } from '@/components/ui/input';
import { alertConfirm } from '@/lib';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Pen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAdminUpdateVendorServiceMutation } from './admin.service.api.slice';
import { iAdminService } from './admin.service.type';

//  Zod Schema
const schema = z.object({
	commission: z
		.number({ error: 'Amount is required' })
		.min(0, { message: 'Amount must be at least 0' })
		.max(100, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Amount must be a number',
		}),
});

type ZodType = z.infer<typeof schema>;

export function AdminVendorServiceCommission({
	data,
}: {
	data: iAdminService;
}) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
				<DialogTrigger className="flex items-center gap-2 w-full">
					<DropdownMenuShortcut className="ml-0">
						<Pen className="size-4" />
					</DropdownMenuShortcut>
					Commission Update
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent className={cn('sm:max-w-md w-full')}>
				<DialogHeader>
					<DialogTitle>Commission Update</DialogTitle>
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
			commission: editData?.commission || 0,
		},
	});
	useEffect(() => {
		form.reset({
			commission: editData?.commission || 0,
		});
	}, [editData]);

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await update({
						reason: editData.reason,
						status: editData.status,
						id: editData.id,
						commission: data?.commission,
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
				{/* Commission */}
				<FormField
					control={form.control}
					name="commission"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Commission</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter Commission..."
									type="number"
									{...field}
									onChange={(e) => field.onChange(e.target.valueAsNumber || '')}
								/>
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
						{isLoading ? 'Updating...' : 'Update Commission'}
					</Button>
				</div>
			</form>
		</Form>
	);
};
