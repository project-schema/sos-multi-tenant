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
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Pen, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { alertConfirm } from '@/lib';
import { useAdminUpdateSubscriptionMutation } from './admin.subscription.api.slice';
import { iAdminSubscription } from './admin.subscription.type';

//  Zod Schema
const schema = z.object({
	subscription_amount: z
		.number({ error: 'Amount is required' })
		.min(0, { message: 'Amount must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Amount must be a number',
		}),

	subscription_package_type: z.enum(['monthly', 'yearly', 'half_yearly'], {
		message: 'Package Type is required',
	}),

	subscription_user_type: z.enum(['vendor', 'affiliate'], {
		message: 'Type is required',
	}),

	card_heading: z
		.string({ error: 'Card Heading is required' })
		.trim()
		.min(1, { error: 'Card Heading is required' })
		.max(100, {
			message: 'Too long',
		}),

	suggest: z.union([z.literal(1), z.null()]),

	card_facilities_title: z.array(
		z.object({
			id: z.union([z.string(), z.number()]),
			key: z.enum(['yes', 'no']),
			value: z
				.string({ error: 'Facility value is required' })
				.trim()
				.min(1, 'Value cannot be empty'),
		})
	),
});

type ZodType = z.infer<typeof schema>;

//  Component
export function UpdateAdminSubscription({
	data,
}: {
	data: iAdminSubscription;
}) {
	const [open, setOpen] = useState(false);
	const isVendor = data.subscription_user_type === 'vendor';

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="w-full">
					<Pen className="h-4 w-4" />
					<span>Edit Plan</span>
				</Button>
			</DialogTrigger>

			<DialogContent
				className={cn('sm:max-w-2xl w-full overflow-y-scroll max-h-screen')}
			>
				<DialogHeader>
					<DialogTitle className="text-center">Edit Features</DialogTitle>
					<div className="flex justify-center gap-2 uppercase">
						<Badge variant={isVendor ? 'success' : 'warning'}>
							{data?.subscription_user_type}
						</Badge>
						<Badge variant="info">
							{data?.subscription_package_type?.replace(/_/, ' ')}
						</Badge>
						<Badge variant="outline">{data?.card_heading}</Badge>
					</div>
				</DialogHeader>

				<FORMVendor setOpen={setOpen} editData={data} />
			</DialogContent>
		</Dialog>
	);
}

const FORMVendor = ({
	setOpen,
	editData,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	editData: iAdminSubscription;
}) => {
	const [update, { isLoading }] = useAdminUpdateSubscriptionMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			subscription_amount: Number(editData.subscription_amount) || 0,
			subscription_package_type:
				editData.subscription_package_type || 'monthly',
			subscription_user_type: editData.subscription_user_type || 'vendor',
			card_heading: editData.card_heading || '',
			suggest: Number(editData.suggest) === 1 ? 1 : null,
			card_facilities_title: editData.card_facilities_title || [
				{ id: 0, key: 'yes', value: '' },
			],
		},
	});

	useEffect(() => {
		form.reset({
			subscription_amount: Number(editData.subscription_amount) || 0,
			subscription_package_type:
				editData.subscription_package_type || 'monthly',
			subscription_user_type: editData.subscription_user_type || 'vendor',
			card_heading: editData.card_heading || '',
			suggest: Number(editData.suggest) === 1 ? 1 : null,
			card_facilities_title: editData.card_facilities_title || [
				{ id: 0, key: 'yes', value: '' },
			],
		});
	}, [editData]);

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await update({
						...data,
						id: editData.id,
						subscription_id: editData.id,
						card_feature_title:
							editData.card_feature_title || 'card_feature_title',
						card_time: editData.card_time || '2',
						card_symbol_icon: editData.card_symbol_icon || 'X',
					}).unwrap();

					if (response.success || response.status === 200) {
						toast.success(response.message || 'Updated successfully');
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
			},
		});
	};

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'card_facilities_title',
	});
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
				<div className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Subscription User Type */}
						<FormField
							control={form.control}
							name="subscription_user_type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>User Type</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select user type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="vendor">Vendor</SelectItem>
												<SelectItem value="affiliate">Affiliate</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Card Heading */}
						<FormField
							control={form.control}
							name="card_heading"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Card Heading</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Subscription Package Type */}
						<FormField
							control={form.control}
							name="subscription_package_type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Package Type</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select package type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="monthly">Monthly</SelectItem>
												<SelectItem value="half_yearly">Half Yearly</SelectItem>
												<SelectItem value="yearly">Yearly</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="subscription_amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subscription Amount</FormLabel>
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
					</div>

					{/* Suggest (Checkbox styled) */}
					<FormField
						control={form.control}
						name="suggest"
						render={({ field }) => (
							<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
								<Checkbox
									checked={field.value === 1}
									onCheckedChange={(checked) =>
										field.onChange(checked ? 1 : null)
									}
									className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
								/>
								<div className="grid gap-1.5 font-normal">
									<p className="text-sm leading-none font-medium">
										Suggest Plan
									</p>
									<p className="text-muted-foreground text-sm">
										Mark this plan as suggested.
									</p>
								</div>
							</Label>
						)}
					/>
				</div>
				<div className="space-y-4  ">
					<h3 className="text-lg font-semibold">Features Included :</h3>
					{fields.map((field, index) => (
						<div
							key={field.id}
							className="grid grid-cols-3 gap-4 border p-4 rounded-md relative"
						>
							<div className="col-span-2">
								{/* Facility Value */}
								<FormField
									control={form.control}
									name={`card_facilities_title.${index}.value`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Facility Value</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Enter facility title" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Yes / No Key as Select */}
							<FormField
								control={form.control}
								name={`card_facilities_title.${index}.key`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Is Available?</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select option" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="yes">Yes</SelectItem>
													<SelectItem value="no">No</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Hidden ID Field */}
							<input
								type="hidden"
								{...form.register(`card_facilities_title.${index}.id`)}
							/>

							{/* Remove Button */}
							<Button
								type="button"
								variant="link"
								size="icon"
								onClick={() => remove(index)}
								className="absolute top-0 right-0"
								disabled={isLoading || fields.length === 1}
							>
								<Trash2 className="h-4 w-4 text-destructive" />
								<span className="sr-only">Remove</span>
							</Button>
						</div>
					))}

					<div className="flex justify-end">
						{/* Add New Facility */}
						<Button
							className=" "
							type="button"
							variant="outline"
							size="icon"
							disabled={fields.length === 20}
							onClick={() =>
								append({
									id: fields.length,
									key: 'yes',
									value: '',
								})
							}
						>
							<Plus className="h-4 w-4" />
							<span className="sr-only">Add New</span>
						</Button>
					</div>
				</div>
				<div className="flex justify-end">
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Updating...' : 'Save Changes'}
					</Button>
				</div>
			</form>
		</Form>
	);
};
