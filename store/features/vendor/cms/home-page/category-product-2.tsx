'use client';

import { Loader5 } from '@/components/dashboard';
import { SearchableSelect } from '@/components/dashboard/form';
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
import { Input } from '@/components/ui/input';
import { alertConfirm, ErrorAlert } from '@/lib';
import { useVendorMarketPlaceUtilityQuery } from '@/store/features/vendor/product/vendor-product-api-slice';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useSystemQuery, useUpdateSystemMutation } from '../system/api-slice';

// --- Zod Schema ---
const schema = z.object({
	best_section_title: z.string().min(1, 'Title is required'),
	best_category_id: z.string().min(1, 'Category 1 is required'),
	best_sub_category_id: z.string().optional(),
});

type ZodType = z.infer<typeof schema>;

export function CategoryProduct2() {
	const { data: marketPlaceData, isLoading: marketPlaceLoading } =
		useVendorMarketPlaceUtilityQuery();
	const [store, { isLoading }] = useUpdateSystemMutation();
	const { data, isLoading: loading, isError, refetch } = useSystemQuery();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			best_section_title: data?.data?.best_section_title || '',
			best_category_id: data?.data?.best_category_id || '',
			best_sub_category_id: data?.data?.best_sub_category_id || '',
		},
	});

	// Watch category selections for dynamic subcategory filtering
	const categoryId = form.watch('best_category_id');
	const subcategoryId = form.watch('best_sub_category_id');

	// Memoized filtered subcategories for each category
	const filteredSubcategories1 = useMemo(() => {
		if (!marketPlaceData?.data?.subcategories) return [];
		if (!categoryId) return [];
		return marketPlaceData.data.subcategories.filter(
			(sc) => sc.category_id.toString() === categoryId
		);
	}, [marketPlaceData?.data?.subcategories, categoryId]);

	// Populate form values once data is available
	useEffect(() => {
		if (data?.data) {
			form.reset({
				best_section_title: data?.data?.best_section_title || '',
				best_category_id: data?.data?.best_category_id || '',
				best_sub_category_id: data?.data?.best_sub_category_id || '',
			});
		}
	}, [data, form]);

	// Clear subcategories when categories change
	useEffect(() => {
		if (categoryId && subcategoryId) {
			const isValid = filteredSubcategories1.some(
				(sc) => sc.id.toString() === subcategoryId
			);
			if (!isValid) {
				form.setValue('best_sub_category_id', '');
			}
		} else if (!categoryId && subcategoryId) {
			form.setValue('best_sub_category_id', '');
		}
	}, [categoryId, subcategoryId, filteredSubcategories1, form]);

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
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({
						best_section_title: data.best_section_title,
						best_category_id: data.best_category_id,
						best_sub_category_id: data.best_sub_category_id,
					}).unwrap();

					if (response.status) {
						refetch();
						toast.success(response.message || 'System Update successfully');
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
						{/* Popular Section Title */}
						<FormField
							control={form.control}
							name="best_section_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel> Title</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter best product title..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Category 1 */}
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="best_category_id"
								render={({ field }) => (
									<SearchableSelect
										field={field}
										label="Category"
										options={(marketPlaceData?.data?.categories ?? []).map(
											(category) => ({
												label: category.name,
												value: category.id.toString(),
											})
										)}
										placeholder={
											marketPlaceLoading ? 'Loading...' : 'Select category'
										}
									/>
								)}
							/>

							<FormField
								control={form.control}
								name="best_sub_category_id"
								render={({ field }) => (
									<SearchableSelect
										field={field}
										label="Subcategory"
										options={filteredSubcategories1.map((subcategory) => ({
											label: subcategory.name,
											value: subcategory.id.toString(),
										}))}
										placeholder={
											marketPlaceLoading
												? 'Loading...'
												: !categoryId
												? 'Select category first'
												: filteredSubcategories1.length === 0
												? 'No subcategories available'
												: 'Select subcategory'
										}
									/>
								)}
							/>
						</div>

						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading ? 'Update...' : 'Update Best Setting'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
