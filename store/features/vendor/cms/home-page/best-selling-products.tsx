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
	best_setting_title: z.string().min(1, 'Title is required'),
	best_setting_category_id_1: z.string().min(1, 'Category 1 is required'),
	best_setting_sub_category_id_1: z.string().optional(),
	best_setting_category_id_2: z.string().optional(),
	best_setting_sub_category_id_2: z.string().optional(),
	best_setting_category_id_3: z.string().optional(),
	best_setting_sub_category_id_3: z.string().optional(),
	best_setting_category_id_4: z.string().optional(),
	best_setting_sub_category_id_4: z.string().optional(),
});

type ZodType = z.infer<typeof schema>;

export function BestSellingProduct() {
	const { data: marketPlaceData, isLoading: marketPlaceLoading } =
		useVendorMarketPlaceUtilityQuery();
	const [store, { isLoading }] = useUpdateSystemMutation();
	const { data, isLoading: loading, isError, refetch } = useSystemQuery();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			best_setting_title: data?.data?.best_setting_title || '',
			best_setting_category_id_1: data?.data?.best_setting_category_id_1 || '',
			best_setting_sub_category_id_1:
				data?.data?.best_setting_sub_category_id_1 || '',
			best_setting_category_id_2: data?.data?.best_setting_category_id_2 || '',
			best_setting_sub_category_id_2:
				data?.data?.best_setting_sub_category_id_2 || '',
			best_setting_category_id_3: data?.data?.best_setting_category_id_3 || '',
			best_setting_sub_category_id_3:
				data?.data?.best_setting_sub_category_id_3 || '',
			best_setting_category_id_4: data?.data?.best_setting_category_id_4 || '',
			best_setting_sub_category_id_4:
				data?.data?.best_setting_sub_category_id_4 || '',
		},
	});

	// Watch category selections for dynamic subcategory filtering
	const categoryId1 = form.watch('best_setting_category_id_1');
	const categoryId2 = form.watch('best_setting_category_id_2');
	const categoryId3 = form.watch('best_setting_category_id_3');
	const categoryId4 = form.watch('best_setting_category_id_4');

	const subcategoryId1 = form.watch('best_setting_sub_category_id_1');
	const subcategoryId2 = form.watch('best_setting_sub_category_id_2');
	const subcategoryId3 = form.watch('best_setting_sub_category_id_3');
	const subcategoryId4 = form.watch('best_setting_sub_category_id_4');

	// Memoized filtered subcategories for each category
	const filteredSubcategories1 = useMemo(() => {
		if (!marketPlaceData?.data?.subcategories) return [];
		if (!categoryId1) return [];
		return marketPlaceData.data.subcategories.filter(
			(sc) => sc.category_id.toString() === categoryId1
		);
	}, [marketPlaceData?.data?.subcategories, categoryId1]);

	const filteredSubcategories2 = useMemo(() => {
		if (!marketPlaceData?.data?.subcategories) return [];
		if (!categoryId2) return [];
		return marketPlaceData.data.subcategories.filter(
			(sc) => sc.category_id.toString() === categoryId2
		);
	}, [marketPlaceData?.data?.subcategories, categoryId2]);

	const filteredSubcategories3 = useMemo(() => {
		if (!marketPlaceData?.data?.subcategories) return [];
		if (!categoryId3) return [];
		return marketPlaceData.data.subcategories.filter(
			(sc) => sc.category_id.toString() === categoryId3
		);
	}, [marketPlaceData?.data?.subcategories, categoryId3]);

	const filteredSubcategories4 = useMemo(() => {
		if (!marketPlaceData?.data?.subcategories) return [];
		if (!categoryId4) return [];
		return marketPlaceData.data.subcategories.filter(
			(sc) => sc.category_id.toString() === categoryId4
		);
	}, [marketPlaceData?.data?.subcategories, categoryId4]);

	// Populate form values once data is available
	useEffect(() => {
		if (data?.data) {
			form.reset({
				best_setting_title: data?.data?.best_setting_title || '',
				best_setting_category_id_1:
					data?.data?.best_setting_category_id_1 || '',
				best_setting_sub_category_id_1:
					data?.data?.best_setting_sub_category_id_1 || '',
				best_setting_category_id_2:
					data?.data?.best_setting_category_id_2 || '',
				best_setting_sub_category_id_2:
					data?.data?.best_setting_sub_category_id_2 || '',
				best_setting_category_id_3:
					data?.data?.best_setting_category_id_3 || '',
				best_setting_sub_category_id_3:
					data?.data?.best_setting_sub_category_id_3 || '',
				best_setting_category_id_4:
					data?.data?.best_setting_category_id_4 || '',
				best_setting_sub_category_id_4:
					data?.data?.best_setting_sub_category_id_4 || '',
			});
		}
	}, [data, form]);

	// Clear subcategories when categories change
	useEffect(() => {
		if (categoryId1 && subcategoryId1) {
			const isValid = filteredSubcategories1.some(
				(sc) => sc.id.toString() === subcategoryId1
			);
			if (!isValid) {
				form.setValue('best_setting_sub_category_id_1', '');
			}
		} else if (!categoryId1 && subcategoryId1) {
			form.setValue('best_setting_sub_category_id_1', '');
		}
	}, [categoryId1, subcategoryId1, filteredSubcategories1, form]);

	useEffect(() => {
		if (categoryId2 && subcategoryId2) {
			const isValid = filteredSubcategories2.some(
				(sc) => sc.id.toString() === subcategoryId2
			);
			if (!isValid) {
				form.setValue('best_setting_sub_category_id_2', '');
			}
		} else if (!categoryId2 && subcategoryId2) {
			form.setValue('best_setting_sub_category_id_2', '');
		}
	}, [categoryId2, subcategoryId2, filteredSubcategories2, form]);

	useEffect(() => {
		if (categoryId3 && subcategoryId3) {
			const isValid = filteredSubcategories3.some(
				(sc) => sc.id.toString() === subcategoryId3
			);
			if (!isValid) {
				form.setValue('best_setting_sub_category_id_3', '');
			}
		} else if (!categoryId3 && subcategoryId3) {
			form.setValue('best_setting_sub_category_id_3', '');
		}
	}, [categoryId3, subcategoryId3, filteredSubcategories3, form]);

	useEffect(() => {
		if (categoryId4 && subcategoryId4) {
			const isValid = filteredSubcategories4.some(
				(sc) => sc.id.toString() === subcategoryId4
			);
			if (!isValid) {
				form.setValue('best_setting_sub_category_id_4', '');
			}
		} else if (!categoryId4 && subcategoryId4) {
			form.setValue('best_setting_sub_category_id_4', '');
		}
	}, [categoryId4, subcategoryId4, filteredSubcategories4, form]);

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
					const response = await store({ ...data }).unwrap();

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
							name="best_setting_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Best Setting Title</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter best setting title..."
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
								name="best_setting_category_id_1"
								render={({ field }) => (
									<SearchableSelect
										field={field}
										label="Category 1"
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
								name="best_setting_sub_category_id_1"
								render={({ field }) => (
									<SearchableSelect
										field={field}
										label="Subcategory 1"
										options={filteredSubcategories1.map((subcategory) => ({
											label: subcategory.name,
											value: subcategory.id.toString(),
										}))}
										placeholder={
											marketPlaceLoading
												? 'Loading...'
												: !categoryId1
												? 'Select category first'
												: filteredSubcategories1.length === 0
												? 'No subcategories available'
												: 'Select subcategory'
										}
									/>
								)}
							/>
						</div>

						{/* Category 2 */}
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="best_setting_category_id_2"
								render={({ field }) => (
									<SearchableSelect
										field={field}
										label="Category 2"
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
								name="best_setting_sub_category_id_2"
								render={({ field }) => (
									<SearchableSelect
										field={field}
										label="Subcategory 2"
										options={filteredSubcategories2.map((subcategory) => ({
											label: subcategory.name,
											value: subcategory.id.toString(),
										}))}
										placeholder={
											marketPlaceLoading
												? 'Loading...'
												: !categoryId2
												? 'Select category first'
												: filteredSubcategories2.length === 0
												? 'No subcategories available'
												: 'Select subcategory'
										}
									/>
								)}
							/>
						</div>

						{/* Category 3 */}
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="best_setting_category_id_3"
								render={({ field }) => (
									<SearchableSelect
										field={field}
										label="Category 3"
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
								name="best_setting_sub_category_id_3"
								render={({ field }) => (
									<SearchableSelect
										field={field}
										label="Subcategory 3"
										options={filteredSubcategories3.map((subcategory) => ({
											label: subcategory.name,
											value: subcategory.id.toString(),
										}))}
										placeholder={
											marketPlaceLoading
												? 'Loading...'
												: !categoryId3
												? 'Select category first'
												: filteredSubcategories3.length === 0
												? 'No subcategories available'
												: 'Select subcategory'
										}
									/>
								)}
							/>
						</div>

						{/* Category 4 */}
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="best_setting_category_id_4"
								render={({ field }) => (
									<SearchableSelect
										field={field}
										label="Category 4"
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
								name="best_setting_sub_category_id_4"
								render={({ field }) => (
									<SearchableSelect
										field={field}
										label="Subcategory 4"
										options={filteredSubcategories4.map((subcategory) => ({
											label: subcategory.name,
											value: subcategory.id.toString(),
										}))}
										placeholder={
											marketPlaceLoading
												? 'Loading...'
												: !categoryId4
												? 'Select category first'
												: filteredSubcategories4.length === 0
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
