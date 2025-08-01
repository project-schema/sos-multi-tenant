'use client';

import { DialogFooter } from '@/components/ui/dialog';
import { LoaderCircle } from 'lucide-react';
import {} from './service-sub-category.type';

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useAdminViewServiceCategoryQuery } from '../service-category';
import { useAdminStoreServiceSubCategoryMutation } from './service-sub-category.api.slice';

// --- Zod Schema ---
const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	service_category_id: z.string().min(1, 'Category is required'),
	status: z.enum(['active', 'deactivate']),
});

type ZodType = z.infer<typeof schema>;

export function ServiceSubCategoryCreate() {
	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			service_category_id: '',
			status: 'active',
		},
	});

	const [store, { isLoading }] = useAdminStoreServiceSubCategoryMutation();
	const { data: categories, isLoading: isLoadingCategories } =
		useAdminViewServiceCategoryQuery({ page: '' });

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
				toast.success(response.message || 'Category created successfully');
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
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Select Category */}
				<FormField
					control={form.control}
					name="service_category_id"
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
							<FormLabel>Sub Category Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type sub category name..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Status */}
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="deactivate">Deactivate</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Creating...' : 'Create Sub Category'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
