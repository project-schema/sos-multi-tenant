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
import { alertConfirm, env } from '@/lib';
import {
	useVendorProfileInfoQuery,
	useVendorProfileShopUpdateMutation,
} from './vendor-profile-api-slice';

const shopSchema = z.object({
	shop_name: z.string({ error: 'Shop name is required' }).min(1, 'Required'),
	email: z.email('Invalid email address'),
	phone: z.string({ error: 'Phone is required' }).min(1, 'Required'),
	address: z.string().optional(),
	image: z.any().optional(),
});

type ShopFormValues = z.infer<typeof shopSchema>;

export function MyShop() {
	const {
		data,
		isLoading: profileLoading,
		isError,
	} = useVendorProfileInfoQuery(undefined);
	const [update, { isLoading }] = useVendorProfileShopUpdateMutation();

	const form = useForm<ShopFormValues>({
		resolver: zodResolver(shopSchema),
		defaultValues: {
			shop_name:
				data?.user?.company_name ??
				(data as any)?.user?.shop_name ??
				(data as any)?.shop_name ??
				'',
			email: data?.user?.email ?? '',
			phone: data?.user?.phone ?? data?.user?.number ?? '',
			address: data?.user?.address ?? '',
			image: null,
		},
	});

	useEffect(() => {
		if (data?.user) {
			form.setValue(
				'shop_name',
				data.user.company_name ??
					(data as any)?.user?.shop_name ??
					(data as any)?.shop_name ??
					''
			);
			form.setValue('email', data.user.email ?? '');
			form.setValue('phone', data.user.phone ?? data.user.number ?? '');
			form.setValue('address', data.user.address ?? '');
		}
	}, [data, form]);

	async function onSubmit(values: ShopFormValues) {
		const payload = {
			shop_name: values.shop_name,
			email: values.email,
			phone: values.phone,
			address: values.address,
			image: values.image,
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
									data?.user?.image ? `${env.baseAPI}/${data.user.image}` : null
								}
							/>
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="shop_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Shop Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" {...field} />
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
									<Input type="tel" {...field} />
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
									<Input {...field} />
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
