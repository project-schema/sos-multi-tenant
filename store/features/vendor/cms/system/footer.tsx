'use client';

import { Loader5 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
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
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm, ErrorAlert } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useSystemQuery, useUpdateSystemMutation } from './api-slice';

// --- Zod Schema ---
const schema = z.object({
	footer_logo: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
	footer_description: z.string().optional(),
	footer_contact_number_one: z.string().optional(),
	footer_contact_address_one: z.string().optional(),
	footer_contact_number_two: z.string().optional(),
	footer_contact_address_two: z.string().optional(),
	footer_copyright_text: z.string().optional(),
	footer_payment_methods: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
});

type ZodType = z.infer<typeof schema>;

export function CMSFooter() {
	const [store, { isLoading }] = useUpdateSystemMutation();
	const { data, isLoading: loading, isError, refetch } = useSystemQuery();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			footer_logo: undefined,
			footer_description: data?.data?.footer_description || '',
			footer_contact_number_one: data?.data?.footer_contact_number_one || '',
			footer_contact_address_one: data?.data?.footer_contact_address_one || '',
			footer_contact_number_two: data?.data?.footer_contact_number_two || '',
			footer_contact_address_two: data?.data?.footer_contact_address_two || '',
			footer_copyright_text: data?.data?.footer_copyright_text || '',
			footer_payment_methods: undefined,
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.data) {
			form.reset({
				footer_logo: undefined,
				footer_description: data?.data?.footer_description || '',
				footer_contact_number_one: data?.data?.footer_contact_number_one || '',
				footer_contact_address_one:
					data?.data?.footer_contact_address_one || '',
				footer_contact_number_two: data?.data?.footer_contact_number_two || '',
				footer_contact_address_two:
					data?.data?.footer_contact_address_two || '',
				footer_copyright_text: data?.data?.footer_copyright_text || '',
				footer_payment_methods: undefined,
			});
		}
	}, [data, form]);

	if (isError) return <ErrorAlert />;
	if (loading) {
		return (
			<>
				<Loader5 />
				<Loader5 />
				<Loader5 />
				<Loader5 />
				<Loader5 />
				<Loader5 />
				<Loader5 />
				<Loader5 />
			</>
		);
	}

	const onSubmit = async (formData: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({ ...formData }).unwrap();

					if (response.status) {
						refetch();
						toast.success(response.message || 'Footer updated successfully');
					} else {
						const errorResponse = response as any;
						if (
							response.status === 400 &&
							typeof errorResponse.errors === 'object'
						) {
							Object.entries(errorResponse.errors).forEach(([field, value]) => {
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
		<Card className="w-full max-w-2xl">
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* footer_logo */}
						<FormField
							control={form.control}
							name="footer_logo"
							render={({ field }) => (
								<FormItem>
									<ImageUpload
										label="Footer Logo"
										value={field.value}
										onChange={field.onChange}
										defaultImage={data?.data?.footer_logo || null}
									/>
								</FormItem>
							)}
						/>

						{/* footer_description */}
						<FormField
							control={form.control}
							name="footer_description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Footer Description</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Enter footer description..."
											rows={3}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Contact Info Section */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{/* footer_contact_number_one */}
							<FormField
								control={form.control}
								name="footer_contact_number_one"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Contact Number 1</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter primary phone..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* footer_contact_number_two */}
							<FormField
								control={form.control}
								name="footer_contact_number_two"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Contact Number 2</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter secondary phone..."
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Address Section */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{/* footer_contact_address_one */}
							<FormField
								control={form.control}
								name="footer_contact_address_one"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Address 1</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter primary address..."
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* footer_contact_address_two */}
							<FormField
								control={form.control}
								name="footer_contact_address_two"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Address 2</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter secondary address..."
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* footer_copyright_text */}
						<FormField
							control={form.control}
							name="footer_copyright_text"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Copyright Text</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="© 2025 Your Company. All rights reserved."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* footer_payment_methods */}
						<FormField
							control={form.control}
							name="footer_payment_methods"
							render={({ field }) => (
								<FormItem>
									<ImageUpload
										label="Footer Payment Methods"
										value={field.value}
										onChange={field.onChange}
										defaultImage={data?.data?.footer_payment_methods || null}
									/>
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading ? 'Updating...' : 'Update Footer'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
