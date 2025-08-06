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
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm, ErrorAlert } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
	useAdminUpdateCrmHomeContentMutation,
	useAdminViewCrmHomeContentQuery,
} from '../home-content/admin-home-content.api.slice';

// --- Zod Schema ---
export const schema = z.object({
	service_banner_heading: z.string().min(1, 'Heading is required'),
	service_banner_description: z.string().min(1, 'Description is required'),
});

export type ZodType = z.infer<typeof schema>;

export function CrmServiceContentCreate() {
	const [store, { isLoading }] = useAdminUpdateCrmHomeContentMutation();
	const {
		data,
		isLoading: loading,
		isError,
		refetch,
	} = useAdminViewCrmHomeContentQuery(undefined);
	const setting = data?.message[0];

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			service_banner_heading: '',
			service_banner_description: '',
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.message && setting) {
			form.reset({
				...setting,
			});
		}
	}, [data, form, setting]);

	if (isError) return <ErrorAlert />;
	if (loading) {
		return (
			<>
				<Loader5 />
				<Loader5 />
				<Loader5 />
				<Loader5 />
			</>
		);
	}

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store(data).unwrap();

					if (response.status === 200) {
						refetch();
						toast.success(response.message || 'Content updated successfully');
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
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
				{/* About Banner Section */}
				<div>
					<h3 className="text-lg font-medium mb-4">Service text</h3>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="service_banner_heading"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Service Heading</FormLabel>
									<FormControl>
										<Textarea {...field} placeholder="Enter heading..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="service_banner_description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Service Description</FormLabel>
									<FormControl>
										<Textarea {...field} placeholder="Enter description..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<DialogFooter>
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Updating...' : 'Update Content'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
