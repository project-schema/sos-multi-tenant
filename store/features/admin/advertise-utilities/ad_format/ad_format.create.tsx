'use client';

import { DialogFooter } from '@/components/ui/dialog';
import { LoaderCircle } from 'lucide-react';
import {} from './ad_format.type';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { SearchableSelect } from '@/components/dashboard/form';
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
import { toast } from 'sonner';
import { useAdminCampaignCategoryQuery } from '../campaign-category';
import { useAdminStoreAdFormatMutation } from './ad_format.api.slice';

// --- Zod Schema ---
const schema = z.object({
	add_format: z.string().min(1, 'Ad Format is required'),
	campaign_category_id: z.string().min(1, 'Category is required'),
});

type ZodType = z.infer<typeof schema>;

export function AdFormatCreate() {
	const [store, { isLoading }] = useAdminStoreAdFormatMutation();
	const { data: categories, isLoading: categoryLoading } =
		useAdminCampaignCategoryQuery({ page: 1 });

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			add_format: '',
			campaign_category_id: '',
		},
	});

	const onSubmit = async (data: ZodType) => {
		try {
			const response = await store({
				...data,
				colum_name: 'add_format',
			}).unwrap();
			if (response.success || response.status === 200) {
				toast.success(response.message || 'Created successfully');
				form.reset();
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
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Name */}
				<FormField
					control={form.control}
					name="add_format"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ad Format</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type ad format..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Select Category */}
				<FormField
					control={form.control}
					name="campaign_category_id"
					render={({ field }) => (
						<SearchableSelect
							field={field}
							label="Select Campaign Category"
							options={
								categories?.message?.data?.map((cat) => ({
									label: cat.name,
									value: cat.id.toString(),
								})) ?? []
							}
							placeholder={categoryLoading ? 'Loading...' : 'Select Category'}
						/>
					)}
				/>

				<DialogFooter>
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Creating...' : 'Create'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
