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
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm } from '@/lib';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ban, LoaderCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAdminAdvertiseCancelMutation } from './admin.advertise.api.slice';
import { iAdminAdvertise } from './admin.advertise.type';

//  Zod Schema
const schema = z.object({
	reason: z.string().trim().min(1, 'Reason is required').max(2000, 'Too long'),
	return_balance: z
		.number({ error: 'Return Balance is required' })
		.min(0, { message: 'Return Balance must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Return Balance must be a number',
		}),
	cost_balance: z
		.number({ error: 'Cost Balance is required' })
		.min(0, { message: 'Cost Balance must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Cost Balance must be a number',
		}),
});

type ZodType = z.infer<typeof schema>;

export function AdminAdvertiseOrderCancel({ data }: { data: iAdminAdvertise }) {
	const [open, setOpen] = useState(false);
	const isRejected = data?.status === 'cancel';

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
				<DialogTrigger className="flex items-center gap-2 w-full">
					<DropdownMenuShortcut className="ml-0">
						<Ban className="size-4" />
					</DropdownMenuShortcut>
					{isRejected ? 'Cancel Message' : 'Cancel Order'}
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent className={cn('sm:max-w-2xl w-full')}>
				<DialogHeader>
					<DialogTitle>
						{isRejected ? 'Cancel Message' : 'Cancel Order'}
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
	editData: iAdminAdvertise;
}) => {
	const [update, { isLoading }] = useAdminAdvertiseCancelMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			reason: '',
			return_balance: 0,
			cost_balance: 0,
		},
	});

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await update({
						reason: data.reason,
						advertise_id: editData.id,
						cost_balance: data?.cost_balance,
						return_balance: data?.return_balance,
					}).unwrap();

					if (response.status === 200) {
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
				<FormField
					control={form.control}
					name="cost_balance"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cost Balance</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter cost balance"
									type="number"
									{...field}
									onChange={(e) => field.onChange(e.target.valueAsNumber || '')}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* return_balance */}
				<FormField
					control={form.control}
					name="return_balance"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Return Balance</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter return balance"
									type="number"
									{...field}
									onChange={(e) => field.onChange(e.target.valueAsNumber || '')}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

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

				{editData.status !== 'canceled' && (
					<div className="flex justify-end">
						<Button type="submit" disabled={isLoading}>
							{isLoading && (
								<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
							)}
							{isLoading ? 'Canceling...' : 'Cancel Order'}
						</Button>
					</div>
				)}
			</form>
		</Form>
	);
};
