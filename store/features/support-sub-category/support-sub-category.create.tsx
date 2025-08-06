'use client';

import { DialogFooter } from '@/components/ui/dialog';
import { LoaderCircle } from 'lucide-react';
import {} from './support-sub-category.type';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Loader6 } from '@/components/dashboard';
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
import { useAdminViewSupportCategoryQuery } from '../support-category';
import { useAdminStoreSupportSubCategoryMutation } from './support-sub-category.api.slice';

// --- Zod Schema ---
const schema = z.object({
	name: z
		.string({ error: 'Name is required' })
		.trim()
		.min(1, 'Name is required'),
	support_box_category_id: z.string().min(1, 'Category is required'),
});

type ZodType = z.infer<typeof schema>;

export function SupportSubCategoryCreate() {
	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			support_box_category_id: '',
		},
	});

	const [store, { isLoading }] = useAdminStoreSupportSubCategoryMutation();
	const { data: categories, isLoading: isLoadingCategories } =
		useAdminViewSupportCategoryQuery({ page: '' });

	if (isLoadingCategories) {
		return (
			<div className="space-y-4">
				<Loader6 />
				<Loader6 />
				<Loader6 />
				<Loader6 />
			</div>
		);
	}

	const onSubmit = async (data: ZodType) => {
		try {
			const response = await store({
				...data,
			}).unwrap();
			if (response.status === 200) {
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
				{/* Select Category */}
				<FormField
					control={form.control}
					name="support_box_category_id"
					render={({ field }) => (
						<SearchableSelect
							field={field}
							label="Select Category"
							options={
								categories?.message?.map((cat) => ({
									label: cat.name,
									value: cat.id.toString(),
								})) ?? []
							}
							placeholder="Select category"
						/>
					)}
				/>

				{/* Name */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Topic Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Topic name..." />
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
						{isLoading ? 'Creating...' : 'Create  '}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
