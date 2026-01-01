import { SearchableSelect } from '@/components/dashboard/form';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { FormField } from '@/components/ui/form';
import { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useVendorMarketPlaceUtilityQuery } from './vendor-product-api-slice';
import { VendorProductCreateZod } from './vendor-product-zod-type';

export const MarketPlaceUtilities = ({
	form,
}: {
	form: UseFormReturn<VendorProductCreateZod>;
}) => {
	const { data, isLoading } = useVendorMarketPlaceUtilityQuery();

	// Watch category selection to filter subcategories
	const selectedCategoryId = form.watch('market_place_category_id');
	const currentSubcategoryId = form.watch('market_place_subcategory_id');

	// Memoize filtered subcategories based on selected category
	// This optimizes performance for 1000+ subcategories
	const filteredSubcategories = useMemo(() => {
		if (!data?.data?.subcategories) return [];

		// If no category is selected, return empty array
		if (!selectedCategoryId) return [];

		// Filter subcategories by category_id
		return data.data.subcategories.filter(
			(sc) => sc.category_id.toString() === selectedCategoryId
		);
	}, [data?.data?.subcategories, selectedCategoryId]);

	// Clear subcategory when category changes
	useEffect(() => {
		if (selectedCategoryId && currentSubcategoryId) {
			// Check if current subcategory belongs to selected category
			const isValidSubcategory = filteredSubcategories.some(
				(sc) => sc.id.toString() === currentSubcategoryId
			);

			// If subcategory doesn't belong to selected category, clear it
			if (!isValidSubcategory) {
				form.setValue('market_place_subcategory_id', '');
			}
		} else if (!selectedCategoryId && currentSubcategoryId) {
			// Clear subcategory if category is cleared
			form.setValue('market_place_subcategory_id', '');
		}
	}, [selectedCategoryId, currentSubcategoryId, filteredSubcategories, form]);

	return (
		<Card className="lg:col-span-2 overflow-hidden">
			<CardHeader>
				<CardTitle className="text-sm xl:text-base">
					Market Place Utilities
				</CardTitle>
				<CardDescription>
					Select the brand, category and subcategory for the Market Place.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
					{/* Brand  */}
					<FormField
						control={form.control}
						name="market_place_brand_id"
						render={({ field }) => (
							<SearchableSelect
								field={field}
								label="Brand"
								options={(data?.data?.brands ?? []).map((brand) => ({
									label: brand.name,
									value: brand.id.toString(),
								}))}
								placeholder={isLoading ? 'Loading...' : 'Select brand'}
							/>
						)}
					/>
					{/* Category */}
					<FormField
						control={form.control}
						name="market_place_category_id"
						render={({ field }) => (
							<SearchableSelect
								field={field}
								label="Category"
								options={(data?.data?.categories ?? []).map((cat) => ({
									label: cat.name,
									value: cat.id.toString(),
								}))}
								placeholder={isLoading ? 'Loading...' : 'Select category'}
							/>
						)}
					/>
					{/* Subcategory - Filtered by selected category */}
					<FormField
						control={form.control}
						name="market_place_subcategory_id"
						render={({ field }) => (
							<SearchableSelect
								field={field}
								label="Sub Category"
								options={filteredSubcategories.map((sc) => ({
									label: sc.name,
									value: sc.id.toString(),
								}))}
								placeholder={
									isLoading
										? 'Loading...'
										: !selectedCategoryId
										? 'Select category first'
										: filteredSubcategories.length === 0
										? 'No subcategories available'
										: 'Select subcategory'
								}
							/>
						)}
					/>
				</div>
			</CardContent>
		</Card>
	);
};
