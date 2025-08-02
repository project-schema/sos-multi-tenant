'use client';

import { Loader5 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
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
import { ErrorAlert } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
	useAdminUpdateCrmContactMutation,
	useAdminViewCrmContactQuery,
} from './crm-admin-contact.api.slice';

// --- Zod Schema ---
export const schema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required'),
	phone: z.string().min(1, 'Phone is required'),
	email: z.string().min(1, 'Email is required'),
	address: z.string().min(1, 'Address is required'),
});

export type ZodType = z.infer<typeof schema>;

export function CrmContactCreate() {
	const [store, { isLoading }] = useAdminUpdateCrmContactMutation();
	const {
		data,
		isLoading: loading,
		isError,
		refetch,
	} = useAdminViewCrmContactQuery(undefined);

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: data?.message?.title || '',
			description: data?.message?.description || '',
			phone: data?.message?.phone || '',
			email: data?.message?.email || '',
			address: data?.message?.address || '',
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.message) {
			form.reset({
				title: data?.message?.title || '',
				description: data?.message?.description || '',
				phone: data?.message?.phone || '',
				email: data?.message?.email || '',
				address: data?.message?.address || '',
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
			</>
		);
	}

	const onSubmit = async (data: ZodType) => {
		try {
			const response = await store({ ...data }).unwrap();

			if (response.status === 200) {
				refetch();
				toast.success(response.message || 'Contact Update successfully');
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
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Title */}
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Enter title..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Description */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Enter description..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Phone */}
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

				{/* Email */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Enter email..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Address */}
				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Textarea {...field} placeholder="Enter address..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Update...' : 'Update Contact'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
