'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
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
import { LoaderCircle } from 'lucide-react';

import { alertConfirm } from '@/lib';
import { toast } from 'sonner';

import { useEffect } from 'react';
import {
	useAdminUpdateHomeContentMutation,
	useAdminViewHomeContentQuery,
} from '../cms/home-content/admin-home-content.api.slice';

//  Zod Schema
const tutorialSchema = z.object({
	add_product_tutorial: z
		.string()
		.url('Must be a valid URL')
		.optional()
		.or(z.literal('')),

	pos_video_tutorial: z
		.string()
		.url('Must be a valid URL')
		.optional()
		.or(z.literal('')),
});

type TutorialFormValues = z.infer<typeof tutorialSchema>;

export function TutorialLinksForm() {
	const {
		data,
		isLoading: loading,
		refetch,
	} = useAdminViewHomeContentQuery(undefined);

	const [store, { isLoading }] = useAdminUpdateHomeContentMutation();

	const form = useForm<TutorialFormValues>({
		resolver: zodResolver(tutorialSchema),
		defaultValues: {
			add_product_tutorial: data?.message?.[0]?.add_product_tutorial ?? '',
			pos_video_tutorial: data?.message?.[0]?.pos_video_tutorial ?? '',
		},
	});

	useEffect(() => {
		form.reset({
			add_product_tutorial: data?.message?.[0]?.add_product_tutorial ?? '',
			pos_video_tutorial: data?.message?.[0]?.pos_video_tutorial ?? '',
		});
	}, [data]);

	const onSubmit = async (formData: TutorialFormValues) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store(formData).unwrap();
					if (response.status === 200) {
						refetch();
						toast.success(response.message || 'Tutorial links updated');
					} else {
						toast.error(response.message || 'Failed to update');
					}
				} catch (error: any) {
					if (error?.status === 422 && typeof error.message === 'object') {
						Object.entries(error.message).forEach(([field, value]) => {
							form.setError(field as keyof TutorialFormValues, {
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
		<Card>
			<CardHeader>
				<CardTitle className="text-lg xl:text-xl">Tutorial Links</CardTitle>
				<CardDescription>
					Set the links for tutorial videos that guide merchants on how to use
					your platform.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* Add Product Tutorial Link */}
						<FormField
							control={form.control}
							name="add_product_tutorial"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Add Product Tutorial (URL)</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="https://example.com/add-product"
											disabled={loading || isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* POS Video Tutorial Link */}
						<FormField
							control={form.control}
							name="pos_video_tutorial"
							render={({ field }) => (
								<FormItem>
									<FormLabel>POS Video Tutorial (URL)</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="https://example.com/pos-video"
											disabled={loading || isLoading}
										/>
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
								{isLoading ? 'Saving...' : 'Save Links'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
