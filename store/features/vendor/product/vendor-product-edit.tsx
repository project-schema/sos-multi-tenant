'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import { Container1 } from '@/components/dashboard';
import { SearchableSelect } from '@/components/dashboard/form/searchable-select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { ImageUploadForProduct } from '@/components/ui/image-upload-for-product';
import { MultiImageUpload } from '@/components/ui/image-upload-multiple';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Editor } from '@/components/ui/quill-editor';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm, cn, env, handleValidationError } from '@/lib';
import { format } from 'date-fns';
import {
	AlertCircle,
	CalendarIcon,
	LoaderCircle,
	Plus,
	Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { VendorBrandCreateModal } from '../brand/vendor-brand-create-modal';
import { VendorCategoryCreateModal } from '../category/vendor-category-create-modal';
import { VendorSubCategoryCreateModal } from '../sub-category/vendor-sub-category-create-modal';
import { VendorSupplierCreateModal } from '../supplier/vendor-supplier-create-modal';
import { VendorWarehouseCreateModal } from '../warehouse/vendor-warehouse-create-modal';
import {
	useVendorProductCreateDataQuery,
	useVendorProductUpdateMutation,
} from './vendor-product-api-slice';
import { VendorProductImageDelete } from './vendor-product-image-delete';
import { iVendorProductView } from './vendor-product-type';
import {
	VendorProductCreateData,
	VendorProductCreateSchema,
	VendorProductCreateZod,
} from './vendor-product-zod-type';

export const VendorProductEdit = ({
	editData,
}: {
	editData: iVendorProductView;
}) => {
	const router = useRouter();
	const { data, isLoading, isError } = useVendorProductCreateDataQuery(
		undefined,
		{
			refetchOnFocus: false,
			refetchOnMountOrArgChange: false,
		}
	);
	const [updateProduct, { isLoading: isSaving }] =
		useVendorProductUpdateMutation();

	const form = useForm<VendorProductCreateZod>({
		resolver: zodResolver(VendorProductCreateSchema),
		defaultValues: {
			name: editData.name,
			image: undefined,
			images: [],

			brand_id: editData.brand_id.toString(),
			category_id: editData.category_id.toString(),
			subcategory_id: editData.subcategory_id.toString(),
			supplier_id: editData.supplier_id.toString(),
			warehouse_id: editData.warehouse_id.toString(),
			original_price: Number(editData.original_price),
			selling_price: Number(editData.selling_price),
			discount_price: Number(editData.discount_price),
			alert_qty: Number(editData.alert_qty),

			sku: editData.sku,
			warranty: editData.warranty,
			exp_date: new Date(editData.exp_date),

			short_description: editData.short_description,
			long_description: editData.long_description,

			specifications: editData.specifications?.map((spec) => ({
				question: spec?.specification || '',
				answer: spec?.specification_ans || '',
			})),
			selling_details: editData.selling_details?.map((selling) => ({
				min_bulk_qty: Number(selling.min_bulk_qty) || 0,
				min_bulk_price: Number(selling.min_bulk_price) || 0,
				bulk_commission: Number(selling.bulk_commission) || 0,
				bulk_commission_type: selling.bulk_commission_type,
				advance_payment: Number(selling.advance_payment) || 0,
				advance_payment_type: selling.advance_payment_type,
			})),

			is_feature: editData.is_feature,
			pre_order: editData.pre_order === '1' ? 1 : 0,
			is_affiliate: editData.is_affiliate === 1 ? true : false,
			selling_type: editData.selling_type,
			is_connect_bulk_single:
				editData.is_connect_bulk_single === '1' ? true : false,
			discount_type: editData.discount_type || 'flat',
			discount_rate: Number(editData.discount_rate),
			advance_payment: Number(editData.advance_payment),
			single_advance_payment_type:
				editData.single_advance_payment_type || 'flat',
		},
	});

	const {
		fields: specFields,
		append: appendSpec,
		remove: removeSpec,
	} = useFieldArray({ control: form.control, name: 'specifications' });

	const {
		fields: sellingFields,
		append: appendSelling,
		remove: removeSelling,
	} = useFieldArray({ control: form.control, name: 'selling_details' });

	const categoryId = form.watch('category_id');
	const sellingType = form.watch('selling_type');
	const isAffiliate = form.watch('is_affiliate');
	const preOrder = form.watch('pre_order');

	const categories = data?.data?.category ?? [];
	const subcategories =
		categories.find((c) => c.id.toString() === categoryId)?.subcategory ?? [];

	// reset subcategory if category changed
	useEffect(() => {
		form.setValue('subcategory_id', '');
	}, [categoryId]);
	// reset subcategory if category changed

	useEffect(() => {
		if (data?.barcode) {
			form.setValue('sku', data?.barcode ?? '');
		}
	}, [data]);

	useEffect(() => {
		form.reset({
			name: editData.name,
			image: undefined,
			images: [],
			exp_date: new Date(editData.exp_date),
			brand_id: editData.brand_id.toString(),
			category_id: editData.category_id.toString(),
			subcategory_id: editData.subcategory_id.toString(),
			supplier_id: editData.supplier_id.toString(),
			warehouse_id: editData.warehouse_id.toString(),
			original_price: Number(editData.original_price),
			selling_price: Number(editData.selling_price),
			discount_price: Number(editData.discount_price),
			alert_qty: Number(editData.alert_qty),
			sku: editData.sku,
			warranty: editData.warranty,
			short_description: editData.short_description,
			long_description: editData.long_description,
			is_feature: editData.is_feature,
			pre_order: editData.pre_order === '1' ? 1 : 0,
			is_affiliate: editData.is_affiliate === 1 ? true : false,
			selling_type: editData.selling_type,
			is_connect_bulk_single:
				editData.is_connect_bulk_single === '1' ? true : false,
			discount_type: editData.discount_type || 'flat',
			discount_rate: Number(editData.discount_rate),
			advance_payment: Number(editData.advance_payment),
			single_advance_payment_type:
				editData.single_advance_payment_type || 'flat',
			specifications: editData.specifications?.map((spec) => ({
				question: spec?.specification || '',
				answer: spec?.specification_ans || '',
			})),
			selling_details: editData.selling_details?.map((selling) => ({
				min_bulk_qty: Number(selling.min_bulk_qty) || 0,
				min_bulk_price: Number(selling.min_bulk_price) || 0,
				bulk_commission: Number(selling.bulk_commission) || 0,
				bulk_commission_type: selling.bulk_commission_type,
				advance_payment: Number(selling.advance_payment) || 0,
				advance_payment_type: selling.advance_payment_type,
			})),
		});
	}, [editData]);

	const onSubmit = async (values: VendorProductCreateZod) => {
		const data = VendorProductCreateData(values);

		alertConfirm({
			onOk: async () => {
				try {
					const response = await updateProduct({
						...data,
						id: editData.id,
					}).unwrap();
					if (response.status === 200) {
						toast.success(response.message || 'Update successfully');
						form.reset();
						router.push(`/dashboard/product`);
					} else {
						if (response?.status === 400) {
							handleValidationError(response, form.setError);
						} else {
							toast.error(response.message || 'Something went wrong');
						}
					}
				} catch (error: any) {
					if (error?.status === 400) {
						handleValidationError(error, form.setError);
					} else {
						toast.error('Something went wrong');
					}
				}
			},
		});
	};

	return (
		<Container1
			header={
				<div className="flex items-center justify-between flex-wrap gap-2">
					<CardTitle>Product Update</CardTitle>
					<div className="flex items-center gap-2 flex-wrap">
						<VendorBrandCreateModal />
						<VendorCategoryCreateModal />
						<VendorSubCategoryCreateModal />
						<VendorSupplierCreateModal />
						<VendorWarehouseCreateModal />
					</div>
				</div>
			}
			isLoading={isLoading}
			isError={isError}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid lg:grid-cols-3 gap-4">
						<Card className="lg:col-span-1">
							<CardContent className="space-y-6">
								{/* Image Upload */}
								<FormField
									control={form.control}
									name="image"
									render={({ field }) => (
										<FormItem>
											<ImageUploadForProduct
												label="Product Image"
												value={field.value ?? null}
												onChange={field.onChange}
												defaultImage={
													editData.image
														? `${env.baseAPI}/${editData.image}`
														: '/placeholder.svg'
												}
											/>
										</FormItem>
									)}
								/>
								{editData.product_image?.length > 0 && (
									<div className="space-y-2">
										<Label>Product Previous Images</Label>
										<div className="flex flex-wrap gap-4">
											{editData.product_image?.map((src, index) => (
												<VendorProductImageDelete
													data={{ id: src.id, image: src.image }}
													key={index}
												/>
											))}
										</div>
									</div>
								)}

								<div className="flex flex-wrap gap-2">
									<FormField
										control={form.control}
										name="images"
										render={({ field }) => (
											<FormItem>
												<MultiImageUpload
													label="Product New Images (multiple choose)"
													value={field.value ?? []}
													onChange={field.onChange}
													defaultImages={[]}
												/>
											</FormItem>
										)}
									/>
								</div>
							</CardContent>
						</Card>
						<Card className="lg:col-span-2 overflow-hidden">
							<CardContent className="space-y-6">
								{/* Name */}
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Product Name</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Type product name..." />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
									{/* Brand  */}
									<FormField
										control={form.control}
										name="brand_id"
										render={({ field }) => (
											<SearchableSelect
												field={field}
												label="Brand"
												options={
													(data?.data?.brand ?? []).map((b) => ({
														label: b.name,
														value: b.id.toString(),
													})) ?? []
												}
												placeholder={isLoading ? 'Loading...' : 'Select brand'}
											/>
										)}
									/>
									{/* Category */}
									<FormField
										control={form.control}
										name="category_id"
										render={({ field }) => (
											<SearchableSelect
												field={field}
												label="Category"
												options={
													(data?.data?.category ?? []).map((cat) => ({
														label: cat.name,
														value: cat.id.toString(),
													})) ?? []
												}
												placeholder={
													isLoading ? 'Loading...' : 'Select category'
												}
											/>
										)}
									/>
									{/* Subcategory */}
									<FormField
										control={form.control}
										name="subcategory_id"
										render={({ field }) => (
											<SearchableSelect
												field={field}
												label="Sub Category"
												options={
													(subcategories ?? []).map((sc) => ({
														label: sc.name,
														value: sc.id.toString(),
													})) ?? []
												}
												placeholder={
													categoryId
														? 'Select subcategory'
														: 'Select category first'
												}
											/>
										)}
									/>

									{/* Original Price */}
									<FormField
										control={form.control}
										name="original_price"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Original Price</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="0.00"
														type="number"
														onWheel={(e) => {
															(e.target as HTMLInputElement).blur();
														}}
														onChange={(e) =>
															field.onChange(e.target.valueAsNumber || '')
														}
														className="pr-3"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{/* Selling Price */}
									<FormField
										control={form.control}
										name="selling_price"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Selling Price</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="0.00"
														type="number"
														onWheel={(e) => {
															(e.target as HTMLInputElement).blur();
														}}
														onChange={(e) =>
															field.onChange(e.target.valueAsNumber || '')
														}
														className="pr-3"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{/* Discount Price */}
									<FormField
										control={form.control}
										name="discount_price"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Discount Price</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="0.00"
														type="number"
														onWheel={(e) => {
															(e.target as HTMLInputElement).blur();
														}}
														onChange={(e) => {
															const value = e.target.value;
															field.onChange(
																value === '' ? undefined : Number(value)
															);
														}}
														className="pr-3"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Alert Quantity */}
									<FormField
										control={form.control}
										name="alert_qty"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Alert Quantity </FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="0"
														type="number"
														onWheel={(e) => {
															(e.target as HTMLInputElement).blur();
														}}
														onChange={(e) =>
															field.onChange(e.target.valueAsNumber || '')
														}
														className="pr-3"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{/* Supplier Company Name */}
									<FormField
										control={form.control}
										name="supplier_id"
										render={({ field }) => (
											<SearchableSelect
												field={field}
												label="Supplier Company Name"
												options={
													(data?.data?.supplier ?? []).map((s) => ({
														label: s.business_name,
														value: s.id.toString(),
													})) ?? []
												}
												placeholder={
													isLoading ? 'Loading...' : 'Select supplier'
												}
											/>
										)}
									/>
									{/* Warehouse */}
									<FormField
										control={form.control}
										name="warehouse_id"
										render={({ field }) => (
											<SearchableSelect
												field={field}
												label="Warehouse"
												options={
													(data?.data?.warehouse ?? []).map((w) => ({
														label: w.name,
														value: w.id.toString(),
													})) ?? []
												}
												placeholder={
													isLoading ? 'Loading...' : 'Select warehouse'
												}
											/>
										)}
									/>

									{/* SKU */}
									<FormField
										control={form.control}
										name="sku"
										render={({ field }) => (
											<FormItem>
												<FormLabel>SKU ID (customizable)</FormLabel>
												<FormControl>
													<Input {...field} placeholder="SKU ID" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{/* Warranty */}
									<FormField
										control={form.control}
										name="warranty"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Warranty</FormLabel>
												<FormControl>
													<Input {...field} placeholder="Ex: 06 Month" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{/* Expire Date */}
									<FormField
										control={form.control}
										name="exp_date"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel>Expire Date</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant="outline"
																className={cn(
																	'w-full pl-3 justify-start text-left font-normal',
																	!field.value && 'text-muted-foreground'
																)}
															>
																<CalendarIcon className="mr-2 h-4 w-4" />
																{field.value
																	? format(field.value, 'dd-MM-yyyy')
																	: 'Pick a date'}
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0">
														<Calendar
															mode="single"
															selected={field.value}
															onSelect={field.onChange}
														/>
													</PopoverContent>
												</Popover>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								{/* Short Description */}
								<FormField
									control={form.control}
									name="short_description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Short Description</FormLabel>
											<FormControl>
												<Textarea
													{...field}
													placeholder="Type short description..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Long Description */}
								<FormField
									control={form.control}
									name="long_description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Long Description</FormLabel>
											<FormControl>
												<Editor
													value={field.value ?? ''}
													onChange={(val) => field.onChange(val)}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Specification - dynamic */}
								<Card>
									<CardContent className="space-y-4">
										<h4 className="text-lg font-medium">Specification</h4>

										{specFields.map((sf, index) => (
											<Card key={sf.id}>
												<CardContent>
													<div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
														<FormField
															control={form.control}
															name={`specifications.${index}.question`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>Question</FormLabel>
																	<FormControl>
																		<Input
																			{...field}
																			placeholder="Type specification..."
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
														<FormField
															control={form.control}
															name={`specifications.${index}.answer`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>Answer</FormLabel>
																	<FormControl>
																		<Input
																			{...field}
																			placeholder="Type specification answer..."
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>

														<Button
															type="button"
															variant="link"
															size="icon"
															onClick={() => removeSpec(index)}
															className={`absolute -top-4 -right-4 ${
																specFields.length === 1 ? 'hidden' : ''
															}`}
														>
															<Trash2 className="h-4 w-4 text-destructive" />
															<span className="sr-only">Remove</span>
														</Button>
													</div>
												</CardContent>
											</Card>
										))}

										<div className="flex justify-end">
											<Button
												type="button"
												variant="outline"
												size="icon"
												onClick={() => appendSpec({ question: '', answer: '' })}
											>
												<Plus className="h-4 w-4" />
												<span className="sr-only">Add New</span>
											</Button>
										</div>
									</CardContent>
								</Card>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									{/* Featured Product */}
									<FormField
										control={form.control}
										name="is_feature"
										render={({ field }) => (
											<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
												<Checkbox
													checked={field.value === 1}
													onCheckedChange={(checked) =>
														field.onChange(checked ? 1 : null)
													}
													className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
												/>
												<div className="grid gap-1.5 font-normal">
													<p className="text-sm leading-none font-medium">
														Featured Product
													</p>
													<p className="text-muted-foreground text-sm">
														[Yes] Will be show top of POS Sales
													</p>
												</div>
											</Label>
										)}
									/>
									{/* Pre Order */}
									<FormField
										control={form.control}
										name="pre_order"
										render={({ field }) => (
											<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
												<Checkbox
													checked={field.value === 1}
													onCheckedChange={(checked) =>
														field.onChange(checked ? 1 : null)
													}
													className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
												/>
												<div className="grid gap-1.5 font-normal">
													<p className="text-sm leading-none font-medium">
														Pre Order
													</p>
													<p className="text-muted-foreground text-sm">
														Mark this product as pre order.
													</p>
												</div>
											</Label>
										)}
									/>
								</div>

								{/* Drop Shipper Sales Type */}
								{!preOrder && (
									<Card className={isAffiliate ? 'bg-blue-50' : ''}>
										<CardContent>
											<div className="space-y-6">
												<div className="space-y-4">
													<div className="flex items-center gap-2 justify-between">
														<h4 className="text-lg font-medium">
															Drop Shipper Sales Type
														</h4>
														<FormField
															control={form.control}
															name="is_affiliate"
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<Switch
																			checked={field.value}
																			onCheckedChange={field.onChange}
																			className="scale-125"
																		/>
																	</FormControl>
																</FormItem>
															)}
														/>
													</div>
													{isAffiliate && (
														<>
															<FormField
																control={form.control}
																name="selling_type"
																render={({ field }) => (
																	<FormItem className="space-y-3">
																		<FormControl>
																			<RadioGroup
																				onValueChange={field.onChange}
																				defaultValue={field.value}
																				className="flex items-center gap-2"
																			>
																				<FormItem className="flex items-center gap-3">
																					<FormControl>
																						<RadioGroupItem value="single" />
																					</FormControl>
																					<FormLabel className="font-normal">
																						Single
																					</FormLabel>
																				</FormItem>
																				<FormItem className="flex items-center gap-3">
																					<FormControl>
																						<RadioGroupItem value="bulk" />
																					</FormControl>
																					<FormLabel className="font-normal">
																						Bulk
																					</FormLabel>
																				</FormItem>
																				<FormItem className="flex items-center gap-3">
																					<FormControl>
																						<RadioGroupItem value="both" />
																					</FormControl>
																					<FormLabel className="font-normal">
																						Both
																					</FormLabel>
																				</FormItem>
																			</RadioGroup>
																		</FormControl>
																		<FormMessage />
																	</FormItem>
																)}
															/>
															{sellingType === 'both' && (
																<FormField
																	control={form.control}
																	name="is_connect_bulk_single"
																	render={({ field }) => (
																		<FormItem className="flex flex-row items-center gap-2">
																			<FormControl>
																				<Checkbox
																					checked={field.value}
																					onCheckedChange={field.onChange}
																					className="scale-125"
																				/>
																			</FormControl>
																			<FormLabel className="text-sm font-normal">
																				I Have Unlimited Products
																			</FormLabel>
																		</FormItem>
																	)}
																/>
															)}
														</>
													)}
												</div>

												{isAffiliate && (
													<>
														{/* Dynamic Selling Details */}
														{sellingType !== 'single' && (
															<div className="space-y-4">
																{sellingFields.map((sf, index) => (
																	<Card key={sf.id} className="bg-white/70">
																		<CardContent className="space-y-4">
																			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 2xl:grid-cols-4 gap-6 relative">
																				<FormField
																					control={form.control}
																					name={`selling_details.${index}.min_bulk_qty`}
																					render={({ field }) => (
																						<FormItem className="gap-5">
																							<FormLabel>
																								Min Bulk Qty
																							</FormLabel>
																							<FormControl>
																								<Input
																									{...field}
																									placeholder="0"
																									type="number"
																									onWheel={(e) => {
																										(
																											e.target as HTMLInputElement
																										).blur();
																									}}
																									onChange={(e) =>
																										field.onChange(
																											e.target.valueAsNumber ||
																												''
																										)
																									}
																									className="pr-3"
																								/>
																							</FormControl>
																							<FormMessage />
																						</FormItem>
																					)}
																				/>
																				<FormField
																					control={form.control}
																					name={`selling_details.${index}.min_bulk_price`}
																					render={({ field }) => (
																						<FormItem className="gap-5">
																							<FormLabel>
																								Min Bulk Price
																							</FormLabel>
																							<FormControl>
																								<Input
																									{...field}
																									placeholder="0.00"
																									type="number"
																									onWheel={(e) => {
																										(
																											e.target as HTMLInputElement
																										).blur();
																									}}
																									onChange={(e) =>
																										field.onChange(
																											e.target.valueAsNumber ||
																												''
																										)
																									}
																									className="pr-3"
																								/>
																							</FormControl>
																							<FormMessage />
																						</FormItem>
																					)}
																				/>

																				<div className="relative">
																					<FormField
																						control={form.control}
																						name={`selling_details.${index}.bulk_commission_type`}
																						render={({ field }) => (
																							<FormItem className="space-y-3 absolute top-4 left-4">
																								<FormControl>
																									<RadioGroup
																										onValueChange={
																											field.onChange
																										}
																										defaultValue={field.value}
																										className="flex items-center gap-4"
																									>
																										<FormItem className="flex items-center gap-1">
																											<FormControl>
																												<RadioGroupItem value="flat" />
																											</FormControl>
																											<FormLabel className="font-normal text-xs">
																												Flat
																											</FormLabel>
																										</FormItem>
																										<FormItem className="flex items-center gap-1">
																											<FormControl>
																												<RadioGroupItem value="percent" />
																											</FormControl>
																											<FormLabel className="font-normal text-xs">
																												percent
																											</FormLabel>
																										</FormItem>
																									</RadioGroup>
																								</FormControl>
																								<FormMessage />
																							</FormItem>
																						)}
																					/>
																					<FormField
																						control={form.control}
																						name={`selling_details.${index}.bulk_commission`}
																						render={({ field }) => (
																							<FormItem className="gap-5">
																								<FormLabel>
																									Bulk Commission
																								</FormLabel>
																								<FormControl>
																									<Input
																										{...field}
																										placeholder="0.00"
																										type="number"
																										onWheel={(e) => {
																											(
																												e.target as HTMLInputElement
																											).blur();
																										}}
																										onChange={(e) =>
																											field.onChange(
																												e.target
																													.valueAsNumber || ''
																											)
																										}
																										className="pr-3"
																									/>
																								</FormControl>
																								<FormMessage />
																							</FormItem>
																						)}
																					/>
																				</div>
																				<div className="relative">
																					<FormField
																						control={form.control}
																						name={`selling_details.${index}.advance_payment_type`}
																						render={({ field }) => (
																							<FormItem className="space-y-3 absolute top-4 left-4">
																								<FormControl>
																									<RadioGroup
																										onValueChange={
																											field.onChange
																										}
																										defaultValue={field.value}
																										className="flex items-center gap-4"
																									>
																										<FormItem className="flex items-center gap-1">
																											<FormControl>
																												<RadioGroupItem value="flat" />
																											</FormControl>
																											<FormLabel className="font-normal text-xs">
																												Flat
																											</FormLabel>
																										</FormItem>
																										<FormItem className="flex items-center gap-1">
																											<FormControl>
																												<RadioGroupItem value="percent" />
																											</FormControl>
																											<FormLabel className="font-normal text-xs">
																												percent
																											</FormLabel>
																										</FormItem>
																									</RadioGroup>
																								</FormControl>
																								<FormMessage />
																							</FormItem>
																						)}
																					/>
																					<FormField
																						control={form.control}
																						name={`selling_details.${index}.advance_payment`}
																						render={({ field }) => (
																							<FormItem className="gap-5">
																								<FormLabel>
																									Advance Amount
																								</FormLabel>
																								<FormControl>
																									<Input
																										{...field}
																										placeholder="0.00"
																										type="number"
																										onWheel={(e) => {
																											(
																												e.target as HTMLInputElement
																											).blur();
																										}}
																										onChange={(e) =>
																											field.onChange(
																												e.target
																													.valueAsNumber || ''
																											)
																										}
																										className="pr-3"
																									/>
																								</FormControl>
																								<FormMessage />
																							</FormItem>
																						)}
																					/>
																				</div>

																				<Button
																					type="button"
																					variant="link"
																					size="icon"
																					onClick={() => removeSelling(index)}
																					className={`absolute -top-4 -right-4 ${
																						sellingFields.length === 1
																							? 'hidden'
																							: ''
																					}`}
																				>
																					<Trash2 className="h-4 w-4 text-destructive" />
																					<span className="sr-only">
																						Remove
																					</span>
																				</Button>
																			</div>
																		</CardContent>
																	</Card>
																))}
																<div className="flex justify-end">
																	<Button
																		type="button"
																		variant="outline"
																		size="icon"
																		onClick={() =>
																			appendSelling({
																				min_bulk_qty: 0,
																				min_bulk_price: 0,
																				bulk_commission: 0,
																				bulk_commission_type: 'flat',
																				advance_payment_type: 'flat',
																				advance_payment: 0,
																			})
																		}
																	>
																		<Plus className="h-4 w-4" />
																		<span className="sr-only">Add New</span>
																	</Button>
																</div>
															</div>
														)}

														{/* Global discount/commission */}
														{sellingType !== 'bulk' && (
															<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
																{/* Advance Amount */}
																<div className="relative">
																	<FormField
																		control={form.control}
																		name="single_advance_payment_type"
																		render={({ field }) => (
																			<FormItem className="space-y-3 absolute top-4 left-4">
																				<FormControl>
																					<RadioGroup
																						onValueChange={field.onChange}
																						defaultValue={field.value}
																						className="flex items-center gap-4"
																					>
																						<FormItem className="flex items-center gap-1">
																							<FormControl>
																								<RadioGroupItem value="flat" />
																							</FormControl>
																							<FormLabel className="font-normal text-xs">
																								Flat
																							</FormLabel>
																						</FormItem>
																						<FormItem className="flex items-center gap-1">
																							<FormControl>
																								<RadioGroupItem value="percent" />
																							</FormControl>
																							<FormLabel className="font-normal text-xs">
																								percent
																							</FormLabel>
																						</FormItem>
																					</RadioGroup>
																				</FormControl>
																				<FormMessage />
																			</FormItem>
																		)}
																	/>
																	<FormField
																		control={form.control}
																		name="advance_payment"
																		render={({ field }) => (
																			<FormItem className="gap-6">
																				<FormLabel>Advance Amount</FormLabel>
																				<FormControl>
																					<Input
																						{...field}
																						placeholder="0.00"
																						type="number"
																						onWheel={(e) => {
																							(
																								e.target as HTMLInputElement
																							).blur();
																						}}
																						onChange={(e) =>
																							field.onChange(
																								e.target.valueAsNumber || ''
																							)
																						}
																						className="pr-3"
																					/>
																				</FormControl>
																				<FormMessage />
																			</FormItem>
																		)}
																	/>
																</div>
																<div className="relative">
																	<FormField
																		control={form.control}
																		name="discount_type"
																		render={({ field }) => (
																			<FormItem className="space-y-3 absolute top-4 left-4">
																				<FormControl>
																					<RadioGroup
																						onValueChange={field.onChange}
																						defaultValue={field.value}
																						className="flex items-center gap-4"
																					>
																						<FormItem className="flex items-center gap-1">
																							<FormControl>
																								<RadioGroupItem value="flat" />
																							</FormControl>
																							<FormLabel className="font-normal text-xs">
																								Flat
																							</FormLabel>
																						</FormItem>
																						<FormItem className="flex items-center gap-1">
																							<FormControl>
																								<RadioGroupItem value="percent" />
																							</FormControl>
																							<FormLabel className="font-normal text-xs">
																								percent
																							</FormLabel>
																						</FormItem>
																					</RadioGroup>
																				</FormControl>
																				<FormMessage />
																			</FormItem>
																		)}
																	/>
																	<FormField
																		control={form.control}
																		name="discount_rate"
																		render={({ field }) => (
																			<FormItem className="gap-6">
																				<FormLabel>
																					Discount/Commission
																				</FormLabel>
																				<FormControl>
																					<Input
																						{...field}
																						placeholder="0.00"
																						type="number"
																						onWheel={(e) => {
																							(
																								e.target as HTMLInputElement
																							).blur();
																						}}
																						onChange={(e) =>
																							field.onChange(
																								e.target.valueAsNumber || ''
																							)
																						}
																						className="pr-3"
																					/>
																				</FormControl>
																				<FormMessage />
																			</FormItem>
																		)}
																	/>
																</div>
															</div>
														)}
													</>
												)}
											</div>
										</CardContent>
									</Card>
								)}
								{form.formState.errors &&
									Object.keys(form.formState.errors).length > 0 && (
										<Alert className="border-amber-500/50 text-amber-500 dark:border-amber-500 [&>svg]:text-amber-500">
											<AlertCircle className="h-4 w-4" />
											<AlertTitle>Please fix the following errors</AlertTitle>
											<AlertDescription>
												{Object.entries(form.formState.errors).map(
													([fieldKey, error], index) => {
														// If the error is an array (like specifications or selling_details)
														if (Array.isArray(error)) {
															return error.map((item, itemIndex) => {
																return Object.entries(item).map(
																	([subField, subError]) => {
																		if (
																			subError &&
																			typeof subError === 'object' &&
																			'message' in subError
																		) {
																			return (
																				<p
																					className="text-amber-500"
																					key={`${fieldKey}-${itemIndex}-${subField}`}
																				>
																					{index + 1}.{itemIndex + 1}.{subField}
																					: {String(subError.message)}
																				</p>
																			);
																		}
																		return null;
																	}
																);
															});
														}

														// If it's a nested object (like question/answer), not an array
														if (
															typeof error === 'object' &&
															!('message' in error)
														) {
															return Object.entries(error).map(
																([subField, subError]) => {
																	if (
																		subError &&
																		typeof subError === 'object' &&
																		'message' in subError
																	) {
																		return (
																			<p
																				className="text-amber-500"
																				key={`${fieldKey}-${subField}`}
																			>
																				{index + 1}. {subError.message}
																			</p>
																		);
																	}
																	return null;
																}
															);
														}

														// Handle error arrays like images.0: ["..."]
														if (Array.isArray(error)) {
															return error.map((message, i) => {
																return (
																	<p
																		className="text-amber-500"
																		key={`${fieldKey}-${i}`}
																	>
																		{index + 1}.{i + 1}. {fieldKey}:{' '}
																		{String(message)}
																	</p>
																);
															});
														}

														// Direct top-level error
														if (error?.message) {
															return (
																<p className="text-amber-500" key={fieldKey}>
																	{index + 1}. {error.message}
																</p>
															);
														}

														return null;
													}
												)}
											</AlertDescription>
										</Alert>
									)}
								<div>
									<Button type="submit" disabled={isSaving}>
										{isSaving && (
											<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
										)}
										{isSaving ? 'Updating...' : 'Update Product'}
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</form>
			</Form>
		</Container1>
	);
};
