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
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle } from 'lucide-react';

import { alertConfirm } from '@/lib';
import { toast } from 'sonner';

import {
	useAdminUpdateHomeContentMutation,
	useAdminViewHomeContentQuery,
} from '../cms/home-content/admin-home-content.api.slice';

//  Zod Schema
const textSchema = z.object({
	vendor_text: z.string().optional(),
	affiliate_text: z.string().optional(),
});

type TextFormValues = z.infer<typeof textSchema>;

export function VendorAffiliateTextForm() {
	const {
		data,
		isLoading: loading,
		refetch,
	} = useAdminViewHomeContentQuery(undefined);

	const [store, { isLoading }] = useAdminUpdateHomeContentMutation();

	const form = useForm<TextFormValues>({
		resolver: zodResolver(textSchema),
		defaultValues: {
			vendor_text: data?.message?.[0]?.vendor_text ?? '',
			affiliate_text: data?.message?.[0]?.affiliate_text ?? '',
		},
	});

	const onSubmit = async (formData: TextFormValues) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store(formData).unwrap();
					if (response.status === 200) {
						refetch();
						toast.success(response.message || 'Texts updated successfully');
					} else {
						toast.error(response.message || 'Failed to update');
					}
				} catch (error: any) {
					if (error?.status === 422 && typeof error.message === 'object') {
						Object.entries(error.message).forEach(([field, value]) => {
							form.setError(field as keyof TextFormValues, {
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
				<CardTitle className="text-lg xl:text-xl">
					Vendor & Affiliate Texts
				</CardTitle>
				<CardDescription>
					Update the information shown on the User dashboard.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* Vendor Text */}
						<FormField
							control={form.control}
							name="vendor_text"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Vendor Text</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Enter text for vendor dashboard..."
											disabled={loading || isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Affiliate Text */}
						<FormField
							control={form.control}
							name="affiliate_text"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Affiliate Text</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Enter text for affiliate dashboard..."
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
								{isLoading ? 'Saving...' : 'Save Texts'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
