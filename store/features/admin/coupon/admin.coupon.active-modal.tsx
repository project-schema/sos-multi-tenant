'use client';

import { SearchableSelect } from '@/components/dashboard/form';
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
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, LoaderCircle, Pen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAdminUpdateCouponMutation } from './admin.coupon.api.slice';
import { iAdminReqCoupon } from './admin.coupon.type';

//  Zod Schema
const couponSchema = z.object({
	name: z.string().trim().min(1, 'Coupon name is required').max(50, 'Too long'),
	commission: z
		.number({ error: 'Commission is required' })
		.min(0, { message: 'Commission must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Commission must be a number',
		}),
	commission_type: z.enum(['flat', 'percentage']),
	amount: z
		.number({ error: 'Amount is required' })
		.min(0, { message: 'Amount must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Amount must be a number',
		}),
	type: z.enum(['flat', 'percentage']),
	limitation: z
		.number({ error: 'Limitation is required' })
		.min(1, { message: 'Limitation must be at least 1' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Limitation must be a number',
		}),
	expire_date: z.date({ error: 'Expire Date is required' }),
	user_id: z.string().min(1, 'User is required'),
});

type ZodType = z.infer<typeof couponSchema>;

//  Component
export function EditActiveCouponModal({ data }: { data: iAdminReqCoupon }) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
				<DialogTrigger className="flex items-center gap-2 w-full">
					<DropdownMenuShortcut className="ml-0">
						<Pen className="size-4" />
					</DropdownMenuShortcut>
					Create Coupon
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent
				className={cn('sm:max-w-2xl w-full overflow-y-scroll max-h-[90vh]')}
			>
				<DialogHeader>
					<DialogTitle>Create Coupon</DialogTitle>
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
	editData: iAdminReqCoupon;
}) => {
	const [update, { isLoading }] = useAdminUpdateCouponMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(couponSchema),
		defaultValues: {
			name: '',
			commission: 0,
			commission_type: 'flat',
			amount: 0,
			type: 'flat',
			limitation: 1,
			expire_date: new Date(),
			user_id: '',
		},
	});

	useEffect(() => {
		form.reset({
			user_id: editData?.user_id?.toString() || '',
		});
	}, [editData]);

	const onSubmit = async (data: ZodType) => {
		try {
			const response = await update({
				...data,
				user_id: Number(data.user_id),
				id: editData.id,
				status: 'active',
			}).unwrap();

			if (response.success || response.status === 200) {
				toast.success(response.message || 'Created successfully');
				form.reset();
				setOpen(false);
			} else {
				const errorResponse = response as any;
				if (!response.success && typeof errorResponse.data === 'object') {
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
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
				<div className="grid  grid-cols-1 sm:grid-cols-2 gap-4">
					{/* Coupon Name */}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Coupon Name</FormLabel>
								<FormControl>
									<Input placeholder="Summer25" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Limitation */}
					<FormField
						control={form.control}
						name="limitation"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Limitation</FormLabel>
								<FormControl>
									<Input
										type="number"
										{...field}
										onChange={(e) =>
											field.onChange(e.target.valueAsNumber || '')
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="commission"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Commission</FormLabel>
								<FormControl>
									<Input
										type="number"
										{...field}
										onChange={(e) =>
											field.onChange(e.target.valueAsNumber || '')
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="commission_type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Commission Type</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Type" />
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

					<FormField
						control={form.control}
						name="amount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Discount Amount</FormLabel>
								<FormControl>
									<Input
										type="number"
										{...field}
										onChange={(e) =>
											field.onChange(e.target.valueAsNumber || '')
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Discount Type</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Type" />
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
					{/* Expire Date */}
					<FormField
						control={form.control}
						name="expire_date"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Expire Date</FormLabel>
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

					{/* User ID   */}
					<FormField
						control={form.control}
						name="user_id"
						render={({ field }) => (
							<SearchableSelect
								field={field}
								label="User"
								options={[
									{
										label: editData?.user?.name,
										value: editData?.user?.id.toString(),
									},
								]}
								placeholder={'Select User'}
							/>
						)}
					/>
				</div>

				<Button type="submit" className="w-full">
					{isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
					{isLoading ? 'Creating...' : 'Create'}
				</Button>
			</form>
		</Form>
	);
};
