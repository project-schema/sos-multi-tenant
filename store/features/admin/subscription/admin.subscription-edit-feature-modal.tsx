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
import { LoaderCircle, Pen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { alertConfirm } from '@/lib';
import { useAdminUpdateSubscriptionFeatureMutation } from './admin.subscription.api.slice';
import { iAdminSubscription } from './admin.subscription.type';

//  Zod Schema
const vSchema = z.object({
	affiliate_request: z
		.number({ error: 'Dropshipper is required' })
		.min(0, { message: 'Dropshipper must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Dropshipper must be a number',
		}),
	pos_sale_qty: z
		.number({ error: 'POS Sale is required' })
		.min(0, { message: 'POS Sale must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'POS Sale must be a number',
		}),

	service_qty: z
		.number({ error: 'Service Sale is required' })
		.min(0, { message: 'Service Sale must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Service Sale must be a number',
		}),

	product_qty: z
		.number({ error: 'Product Qty is required' })
		.min(0, { message: 'Product Qty must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Product Qty must be a number',
		}),
	chat_access: z.union([z.literal('yes'), z.null()]),
	employee_create: z.union([z.literal('yes'), z.literal('no'), z.null()]),
	has_website: z.union([z.literal('yes'), z.literal('no'), z.null()]),
	website_visits: z
		.number({ error: 'Website Visits is required' })
		.min(0, { message: 'Website Visits must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Website Visits must be a number',
		}),
});

type ZodType = z.infer<typeof vSchema>;

//  Component
export function EditSubscriptionFeature({
	data,
}: {
	data: iAdminSubscription;
}) {
	const [open, setOpen] = useState(false);
	const isVendor = data.subscription_user_type === 'vendor';

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="sm">
					<Pen className="h-4 w-4" />
					<span>Edit Features</span>
				</Button>
			</DialogTrigger>

			<DialogContent className={cn('sm:max-w-2xl w-full')}>
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

				{data.subscription_user_type === 'vendor' && (
					<FORMVendor setOpen={setOpen} editData={data} />
				)}

				{data.subscription_user_type === 'affiliate' && (
					<FORMAffiliate setOpen={setOpen} editData={data} />
				)}
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
	const [update, { isLoading }] = useAdminUpdateSubscriptionFeatureMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(vSchema),
		defaultValues: {
			affiliate_request: editData.affiliate_request || 0,
			pos_sale_qty: editData.pos_sale_qty || 0,
			service_qty: editData.service_qty || 0,
			product_qty: editData.product_qty || 0,
			chat_access: editData.chat_access || null,
			employee_create: editData.employee_create || null,
			has_website: editData.has_website === 'yes' ? 'yes' : 'no',
			website_visits: editData.website_visits || 0,
		},
	});

	useEffect(() => {
		form.reset({
			affiliate_request: editData.affiliate_request || 0,
			pos_sale_qty: editData.pos_sale_qty || 0,
			service_qty: editData.service_qty || 0,
			product_qty: editData.product_qty || 0,
			chat_access: editData.chat_access || null,
			employee_create: editData.employee_create || null,
			has_website: editData.has_website === 'yes' ? 'yes' : 'no',
			website_visits: editData.website_visits || 0,
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
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
				<div className="grid grid-cols-2 gap-4">
					{/* Affiliate Request */}
					<FormField
						control={form.control}
						name="affiliate_request"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Dropshipper</FormLabel>
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

					{/* POS Sale */}
					<FormField
						control={form.control}
						name="pos_sale_qty"
						render={({ field }) => (
							<FormItem>
								<FormLabel>POS Sale</FormLabel>
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

					{/* Service Qty */}
					<FormField
						control={form.control}
						name="service_qty"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Service Sale</FormLabel>
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

					{/* Product Qty */}
					<FormField
						control={form.control}
						name="product_qty"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Product Qty</FormLabel>
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
					{/* Has Website Checkbox */}
					<FormField
						control={form.control}
						name="has_website"
						render={({ field }) => (
							<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
								<Checkbox
									checked={field.value === 'yes'}
									onCheckedChange={(checked) =>
										field.onChange(checked ? 'yes' : 'no')
									}
									className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
								/>
								<div className="grid gap-1.5 font-normal">
									<p className="text-sm leading-none font-medium">
										Has Website
									</p>
									<p className="text-muted-foreground text-sm">
										Allow this user to have a website.
									</p>
								</div>
							</Label>
						)}
					/>
					{/* Website Visits */}
					<FormField
						control={form.control}
						name="website_visits"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Website Visits</FormLabel>
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

					{/* Chat Access */}
					<FormField
						control={form.control}
						name="chat_access"
						render={({ field }) => (
							<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
								<Checkbox
									checked={field.value === 'yes'}
									onCheckedChange={(checked) =>
										field.onChange(checked ? 'yes' : null)
									}
									className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
								/>
								<div className="grid gap-1.5 font-normal">
									<p className="text-sm leading-none font-medium">
										Chat Access
									</p>
									<p className="text-muted-foreground text-sm">
										Allow this user to access the chat feature.
									</p>
								</div>
							</Label>
						)}
					/>

					{/* Employee Create */}
					<FormField
						control={form.control}
						name="employee_create"
						render={({ field }) => (
							<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
								<Checkbox
									checked={field.value === 'yes'}
									onCheckedChange={(checked) =>
										field.onChange(checked ? 'yes' : null)
									}
									className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
								/>
								<div className="grid gap-1.5 font-normal">
									<p className="text-sm leading-none font-medium">
										Can Create Employee
									</p>
									<p className="text-muted-foreground text-sm">
										Allow this user to create and manage employees.
									</p>
								</div>
							</Label>
						)}
					/>
				</div>
				<div className="flex justify-end">
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Updating...' : 'Submit'}
					</Button>
				</div>
			</form>
		</Form>
	);
};

//  Zod Schema
const ASchema = z.object({
	service_create: z
		.number({ error: 'Service Sale is required' })
		.min(0, { message: 'Service Sale  must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Service Sale  must be a number',
		}),

	product_approve: z
		.number({ error: 'Product Approve is required' })
		.min(0, { message: 'Product Approve must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Product Approve must be a number',
		}),

	product_request: z
		.number({ error: 'Product Request is required' })
		.min(0, { message: 'Product Request must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Product Request must be a number',
		}),
	chat_access: z.union([z.literal('yes'), z.literal('no'), z.null()]),
	has_website: z.union([z.literal('yes'), z.literal('no'), z.null()]),
	website_visits: z
		.number({ error: 'Website Visits is required' })
		.min(0, { message: 'Website Visits must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Website Visits must be a number',
		}),
});

type AZodType = z.infer<typeof ASchema>;
const FORMAffiliate = ({
	setOpen,
	editData,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	editData: iAdminSubscription;
}) => {
	const [update, { isLoading }] = useAdminUpdateSubscriptionFeatureMutation();

	const form = useForm<AZodType>({
		resolver: zodResolver(ASchema),
		defaultValues: {
			service_create: editData.service_create || 0,
			product_approve: editData.product_approve || 0,
			product_request: editData.product_request || 0,
			chat_access: editData.chat_access || null,
			has_website: editData.has_website === 'yes' ? 'yes' : 'no',
			website_visits: editData.website_visits || 0,
		},
	});

	useEffect(() => {
		form.reset({
			service_create: editData.service_create || 0,
			product_approve: editData.product_approve || 0,
			product_request: editData.product_request || 0,
			chat_access: editData.chat_access || null,
			has_website: editData.has_website === 'yes' ? 'yes' : 'no',
			website_visits: editData.website_visits || 0,
		});
	}, [editData]);

	const onSubmit = async (data: AZodType) => {
		try {
			const response = await update({
				...data,
				id: editData.id,
				subscription_id: editData.id,
			}).unwrap();

			if (response.success || response.status === 200) {
				toast.success(response.message || 'Created successfully');
				form.reset();
				setOpen(false);
			} else {
				const errorResponse = response as any;
				if (!response.success && typeof errorResponse.data === 'object') {
					Object.entries(errorResponse.data).forEach(([field, value]) => {
						form.setError(field as keyof AZodType, {
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
					form.setError(field as keyof AZodType, {
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
				{/* Dropsh + Type */}
				<div className="grid grid-cols-1 gap-4">
					{/* Service Create */}
					<FormField
						control={form.control}
						name="service_create"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Service Create</FormLabel>
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

					{/* Product Approve */}
					<FormField
						control={form.control}
						name="product_approve"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Product Approve</FormLabel>
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

					{/* Product Request */}
					<FormField
						control={form.control}
						name="product_request"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Product Request</FormLabel>
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

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Has Website Checkbox */}
						<FormField
							control={form.control}
							name="has_website"
							render={({ field }) => (
								<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
									<Checkbox
										checked={field.value === 'yes'}
										onCheckedChange={(checked) =>
											field.onChange(checked ? 'yes' : 'no')
										}
										className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
									/>
									<div className="grid gap-1.5 font-normal">
										<p className="text-sm leading-none font-medium">
											Has Website
										</p>
										<p className="text-muted-foreground text-sm">
											Allow this user to have a website.
										</p>
									</div>
								</Label>
							)}
						/>
						{/* Website Visits */}
						<FormField
							control={form.control}
							name="website_visits"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Website Visits</FormLabel>
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

					{/* Chat Access Checkbox */}
					<FormField
						control={form.control}
						name="chat_access"
						render={({ field }) => (
							<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
								<Checkbox
									checked={field.value === 'yes'}
									onCheckedChange={(checked) =>
										field.onChange(checked ? 'yes' : null)
									}
									className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
								/>
								<div className="grid gap-1.5 font-normal">
									<p className="text-sm leading-none font-medium">
										Chat Access
									</p>
									<p className="text-muted-foreground text-sm">
										Allow this user to access the chat feature.
									</p>
								</div>
							</Label>
						)}
					/>
				</div>

				<div className="flex justify-end">
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Updating...' : 'Save changes'}
					</Button>
				</div>
			</form>
		</Form>
	);
};
