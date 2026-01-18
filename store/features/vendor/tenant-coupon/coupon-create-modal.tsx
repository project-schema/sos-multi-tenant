'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { alertConfirm } from '@/lib';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, LoaderCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useTenantStoreCouponMutation } from './api-slice';

// Zod Schema matching backend validation
const couponSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(1, 'Coupon name is required')
			.max(255, 'Name is too long'),
		code: z
			.string()
			.trim()
			.min(1, 'Coupon code is required')
			.max(255, 'Code is too long'),
		discount_type: z.enum(['flat', 'percentage'], {
			error: 'Discount type is required',
		}),
		discount_value: z
			.number({ error: 'Discount value is required' })
			.min(0, 'Discount value must be at least 0'),
		min_order_amount: z
			.number({ error: 'Minimum order amount is required' })
			.min(0, 'Minimum order amount must be at least 0'),
		max_discount_amount: z
			.number({ error: 'Maximum discount amount is required' })
			.min(0, 'Maximum discount amount must be at least 0'),
		usage_limit: z
			.number({ error: 'Usage limit is required' })
			.int('Usage limit must be an integer')
			.min(1, 'Usage limit must be at least 1'),
		usage_limit_per_user: z
			.number({ error: 'Usage limit per user is required' })
			.int('Usage limit per user must be an integer')
			.min(1, 'Usage limit per user must be at least 1'),
		valid_from: z.date({ error: 'Valid from date is required' }),
		valid_to: z.date({ error: 'Valid to date is required' }),
		status: z.enum(['active', 'inactive'], {
			error: 'Status is required',
		}),
	})
	.refine((data) => data.valid_to >= data.valid_from, {
		message: 'Valid to date must be after valid from date',
		path: ['valid_to'],
	});

type CouponFormData = z.infer<typeof couponSchema>;

// Component
export function CreateCouponModal() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="ml-auto">Create Coupon</Button>
			</DialogTrigger>

			<DialogContent
				className={cn('overflow-y-scroll max-h-[90vh] sm:max-w-2xl w-full')}
			>
				<DialogHeader>
					<DialogTitle>Create Coupon</DialogTitle>
				</DialogHeader>

				<CouponForm setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
}

const CouponForm = ({
	setOpen,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [store, { isLoading }] = useTenantStoreCouponMutation();

	const form = useForm<CouponFormData>({
		resolver: zodResolver(couponSchema),
		defaultValues: {
			name: '',
			code: '',
			discount_type: 'flat',
			discount_value: 0,
			min_order_amount: 0,
			max_discount_amount: 0,
			usage_limit: 1,
			usage_limit_per_user: 1,
			valid_from: new Date(),
			valid_to: new Date(),
			status: 'active',
		},
	});

	const onSubmit = async (data: CouponFormData) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({
						...data,
						valid_from: format(data.valid_from, 'yyyy-MM-dd'),
						valid_to: format(data.valid_to, 'yyyy-MM-dd'),
					}).unwrap();

					if (response.success || response.status === 200) {
						toast.success(response.message || 'Created successfully');
						form.reset();
						setOpen(false);
					} else {
						const errorResponse = response as any;
						if (!response.success && typeof errorResponse.data === 'object') {
							Object.entries(errorResponse.data).forEach(([field, value]) => {
								form.setError(field as keyof CouponFormData, {
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
							form.setError(field as keyof CouponFormData, {
								type: 'server',
								message: (value as string[])[0],
							});
						});
					} else {
						toast.error(error?.data?.message || 'Something went wrong');
					}
				}
			},
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{/* Coupon Name */}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Coupon Name *</FormLabel>
								<FormControl>
									<Input placeholder="Summer Sale" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Coupon Code */}
					<FormField
						control={form.control}
						name="code"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Coupon Code *</FormLabel>
								<FormControl>
									<Input
										placeholder="SUMMER25"
										{...field}
										onChange={(e) =>
											field.onChange(e.target.value.toUpperCase())
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Discount Type */}
					<FormField
						control={form.control}
						name="discount_type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Discount Type *</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="flat">Flat</SelectItem>
										<SelectItem value="percentage">Percentage</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Discount Value */}
					<FormField
						control={form.control}
						name="discount_value"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Discount Value *</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="0"
										{...field}
										onChange={(e) =>
											field.onChange(e.target.valueAsNumber || 0)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Min Order Amount */}
					<FormField
						control={form.control}
						name="min_order_amount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Min Order Amount *</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="0"
										{...field}
										onChange={(e) =>
											field.onChange(e.target.valueAsNumber || 0)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Max Discount Amount */}
					<FormField
						control={form.control}
						name="max_discount_amount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Max Discount Amount *</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="0"
										{...field}
										onChange={(e) =>
											field.onChange(e.target.valueAsNumber || 0)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Usage Limit */}
					<FormField
						control={form.control}
						name="usage_limit"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Usage Limit *</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="1"
										{...field}
										onChange={(e) =>
											field.onChange(e.target.valueAsNumber || 1)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Usage Limit Per User */}
					<FormField
						control={form.control}
						name="usage_limit_per_user"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Usage Limit Per User *</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="1"
										{...field}
										onChange={(e) =>
											field.onChange(e.target.valueAsNumber || 1)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Valid From */}
					<FormField
						control={form.control}
						name="valid_from"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Valid From *</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												className={cn(
													'w-full pl-3 justify-start text-left font-normal',
													!field.value && 'text-muted-foreground'
												)}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{field.value
													? format(field.value, 'dd-MM-yyyy')
													: 'Pick a date'}
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Valid To */}
					<FormField
						control={form.control}
						name="valid_to"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Valid To *</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												className={cn(
													'w-full pl-3 justify-start text-left font-normal',
													!field.value && 'text-muted-foreground'
												)}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{field.value
													? format(field.value, 'dd-MM-yyyy')
													: 'Pick a date'}
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Status */}
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status *</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="active">Active</SelectItem>
										<SelectItem value="inactive">Inactive</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
					{isLoading ? 'Creating...' : 'Create Coupon'}
				</Button>
			</form>
		</Form>
	);
};
