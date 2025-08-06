'use client';

import { DialogFooter } from '@/components/ui/dialog';
import { LoaderCircle } from 'lucide-react';
import {} from './performance-goal.type';

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
import { alertConfirm } from '@/lib';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAdminCampaignCategoryQuery } from '../campaign-category';
import { useAdminGetConversionLocationQuery } from '../conversion-location';
import { useAdminStorePerformanceGoalMutation } from './performance-goal.api.slice';

// --- Zod Schema ---
const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	campaign_category_id: z.string().min(1, 'Category is required'),
	conversion_location_id: z.string().min(1, 'Conversion location is required'),
});

type ZodType = z.infer<typeof schema>;

export function PerformanceGoalCreate() {
	const [store, { isLoading }] = useAdminStorePerformanceGoalMutation();
	const { data: categories, isLoading: categoryLoading } =
		useAdminCampaignCategoryQuery({ page: 1 });

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			campaign_category_id: '',
			conversion_location_id: '',
		},
	});
	const { data: conversionLocation, isLoading: conversionLocationLoading } =
		useAdminGetConversionLocationQuery(
			{
				id: form.watch('campaign_category_id'),
			},
			{
				skip: !form.watch('campaign_category_id'),
			}
		);

	const selectedCategory = form.watch('campaign_category_id');
	const selectedLocation = form.watch('conversion_location_id');

	useEffect(() => {
		form.setValue('conversion_location_id', '');
	}, [selectedCategory]);

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({
						...data,
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
			},
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
				{/* Select Category */}
				{selectedCategory && (
					<FormField
						control={form.control}
						name="conversion_location_id"
						render={({ field }) => (
							<SearchableSelect
								field={field}
								label="Select Conversion Location"
								options={
									conversionLocation?.locations?.map((cat) => ({
										label: cat.name,
										value: cat.id.toString(),
									})) ?? []
								}
								placeholder={
									conversionLocationLoading ? 'Loading...' : 'Select Location'
								}
							/>
						)}
					/>
				)}

				{/* Name */}
				{selectedLocation && (
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Type name..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

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
