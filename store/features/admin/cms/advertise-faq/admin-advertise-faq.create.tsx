'use client';

import { DialogFooter } from '@/components/ui/dialog';
import { LoaderCircle } from 'lucide-react';
import {} from './admin-advertise-faq.type';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm } from '@/lib';
import { toast } from 'sonner';
import { useAdminStoreCrmAdvertiseFaqMutation } from './admin-advertise-faq.api.slice';

// --- Zod Schema ---
export const schema = z.object({
	heading: z.string().min(1, 'Heading is required'),
	description: z.string().min(1, 'Description is required'),
});

export type ZodType = z.infer<typeof schema>;

export function CrmAdvertiseFaqCreate() {
	const [store, { isLoading }] = useAdminStoreCrmAdvertiseFaqMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			description: '',
			heading: '',
		},
	});

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({
						...data,
					}).unwrap();
					if (response.status === 200) {
						toast.success(
							response.message || 'AdvertiseFaq Created successfully'
						);
						form.reset();
					} else {
						const errorResponse = response as any;
						if (
							response.status === 422 &&
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
					if (error?.status === 422 && typeof error.message === 'object') {
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Heading */}
				<FormField
					control={form.control}
					name="heading"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Heading</FormLabel>
							<FormControl>
								<Textarea {...field} placeholder="Type a heading..." />
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
								<Textarea {...field} placeholder="Type a description..." />
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
						{isLoading ? 'Creating...' : 'Create Faq'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
