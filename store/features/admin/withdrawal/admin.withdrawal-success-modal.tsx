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
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm } from '@/lib';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Pen } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAdminAdminBankQuery } from '../bank';
import { useAdminNewWithdrawalMutation } from './admin.withdrawal.api.slice';
import { iAdminWithdrawal } from './admin.withdrawal.type';

//  Zod Schema
const couponSchema = z.object({
	admin_bank_name: z.string().trim().min(1, 'Bank name is required'),
	text: z
		.string({ error: 'Message is required' })
		.trim()
		.min(1, 'Message is required')
		.max(1000, 'Too long'),
	admin_transition_id: z.string().trim().min(1, 'Transaction ID is required'),
	status: z.string().trim().min(1, 'Status is required'),
	admin_screenshot: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
});

type ZodType = z.infer<typeof couponSchema>;

//  Component
export function AdminWithdrawalSuccessModal({
	data,
}: {
	data: iAdminWithdrawal;
}) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
				<DialogTrigger className="flex items-center gap-2 w-full">
					<DropdownMenuShortcut className="ml-0">
						<Pen className="size-4" />
					</DropdownMenuShortcut>
					Withdrawal Success
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent className={cn('sm:max-w-2xl w-full')}>
				<DialogHeader>
					<DialogTitle>Withdrawal Balance</DialogTitle>
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
	editData: iAdminWithdrawal;
}) => {
	const [update, { isLoading }] = useAdminNewWithdrawalMutation();

	const { data, isLoading: isLoadingBank } = useAdminAdminBankQuery(undefined);

	const form = useForm<ZodType>({
		resolver: zodResolver(couponSchema),
		defaultValues: {
			admin_bank_name: '',
			admin_screenshot: undefined,
			text: '',
			admin_transition_id: '',
			status: 'success',
		},
	});

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await update({
						...data,
						id: editData.id,
					}).unwrap();

					if (response.status === 200) {
						toast.success(response.message || 'Created successfully');
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
				{/* Bank Name */}
				<FormField
					control={form.control}
					name="admin_bank_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Select Bank</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue
											placeholder={isLoadingBank ? 'Loading...' : 'Select Bank'}
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{data?.message?.map((item) => (
										<SelectItem key={item.id} value={item.name}>
											{item.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Transaction ID */}
				<FormField
					control={form.control}
					name="admin_transition_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Transaction ID</FormLabel>
							<FormControl>
								<Input placeholder="Transaction ID" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Image Upload */}
				<FormField
					control={form.control}
					name="admin_screenshot"
					render={({ field }) => (
						<FormItem>
							<ImageUpload
								label="Screenshot"
								value={field.value}
								onChange={field.onChange}
								defaultImage={null}
							/>
						</FormItem>
					)}
				/>
				{/* Message */}
				<FormField
					control={form.control}
					name="text"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Message</FormLabel>
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
