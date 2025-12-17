'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';

import { Loader6 } from '@/components/dashboard/loader';
import { ImageUpload } from '@/components/ui/image-upload';
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm, env } from '@/lib';
import {
	useVendorShopInfoQuery,
	useVendorShopInfoUpdateMutation,
} from './vendor-profile-api-slice';

const shopSchema = z.object({
	company_name: z.string({ error: 'Shop name is required' }).min(1, 'Required'),
	owner_name: z.string({ error: 'Shop name is required' }).min(1, 'Required'),
	phone: z.string({ error: 'Phone is required' }).min(1, 'Required'),
	address: z.string({ error: 'Address is required' }).min(1, 'Required'),

	image: z.any().optional(),
});

type ShopFormValues = z.infer<typeof shopSchema>;

export function MyShopDropshipper() {
	const {
		data,
		isLoading: profileLoading,
		isError,
	} = useVendorShopInfoQuery(undefined);
	const [update, { isLoading }] = useVendorShopInfoUpdateMutation();

	const form = useForm<ShopFormValues>({
		resolver: zodResolver(shopSchema),
		defaultValues: {
			company_name: data?.shop_info?.company_name ?? '',
			owner_name: data?.shop_info?.owner_name ?? '',
			phone: data?.shop_info?.phone ?? '',
			address: data?.shop_info?.address ?? '',
			image: null,
		},
	});

	useEffect(() => {
		if (data?.shop_info) {
			form.setValue('company_name', data.shop_info.company_name ?? '');
			form.setValue('owner_name', data.shop_info.owner_name ?? '');
			form.setValue('phone', data.shop_info.phone ?? '');
			form.setValue('address', data.shop_info.address ?? '');
		}
	}, [data?.shop_info, form]);

	async function onSubmit(values: ShopFormValues) {
		const payload = {
			company_name: values.company_name,
			owner_name: values.owner_name,
			phone: values.phone,
			address: values.address,
			image: values.image ? values.image : null,
		};

		alertConfirm({
			onOk: async () => {
				try {
					const response: any = await update(payload).unwrap();

					if (response.status === 200) {
						toast.success(response.message || 'Shop updated successfully');
					} else {
						toast.error(response.message || 'Failed to update shop');
					}
				} catch (error: any) {
					if (error?.status === 400 && typeof error.message === 'object') {
						Object.entries(error.message).forEach(([field, value]) => {
							form.setError(field as keyof ShopFormValues, {
								type: 'server',
								message: (value as string[])[0],
							});
						});
					} else {
						toast.error('Something went wrong');
					}
				}
			},
			onCancel: () => {
				//
			},
		});
	}

	if (profileLoading) {
		return (
			<div className="space-y-4">
				<Loader6 />
				<Loader6 />
			</div>
		);
	}
	if (isError) return <div>Error loading shop info</div>;

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 max-w-xl"
			>
				{/* Image Upload + Preview */}
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<ImageUpload
								label="Shop Image"
								value={field.value}
								onChange={(file) => field.onChange(file)}
								defaultImage={
									data?.shop_info?.data
										? `${env.baseAPI}/${data.shop_info.data}`
										: null
								}
							/>
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="company_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Company Name</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Enter company name..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="owner_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Owner Name</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Enter owner name..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Enter phone number..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem className="sm:col-span-2">
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Textarea {...field} placeholder="Enter address..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" disabled={isLoading}>
					{isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
					{isLoading ? 'Updating...' : 'Update Shop'}
				</Button>
			</form>
		</Form>
	);
}
