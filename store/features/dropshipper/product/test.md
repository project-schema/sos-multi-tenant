```tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Container1 } from '@/components/dashboard';
import { SearchableSelect } from '@/components/dashboard/form/searchable-select';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { useVendorProductCreateDataQuery } from './vendor-product-api-slice';

const Schema = z.object({
	image: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
	name: z
		.string({ error: 'Name is required' })
		.trim()
		.min(1, 'Name is required'),
	status: z.enum(['active', 'pending']),
	expire_date: z.date({ error: 'Expire Date is required' }),
	images: z.array(z.instanceof(File)).optional(),
});

type ZodType = z.infer<typeof Schema>;

export const VendorProductCreate = () => {
	const { data, isLoading, isError } =
		useVendorProductCreateDataQuery(undefined);
	const form = useForm<ZodType>({
		resolver: zodResolver(Schema),
		defaultValues: {
			image: undefined,
			name: '',
			status: 'active',
			expire_date: new Date(),
			images: [],
			selling_details: [],
		},
	});

	const onSubmit = (data: ZodType) => {
	};
	return (
		<Container1
			header={<CardTitle>Product Create</CardTitle>}
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
												value={field.value}
												onChange={field.onChange}
												defaultImage={'/placeholder.svg'}
											/>
										</FormItem>
									)}
								/>
								<div className="flex flex-wrap gap-2">
									<FormField
										control={form.control}
										name="images"
										render={({ field }) => (
											<FormItem>
												<MultiImageUpload
													label="Product Images (multiple choose)"
													value={field.value}
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
												// options={
												// 	categories?.message?.data?.map((cat) => ({
												// 		label: cat.name,
												// 		value: cat.id.toString(),
												// 	})) ?? []
												// }
												options={[
													{ label: 'Active', value: 'active' },
													{ label: 'Pending', value: 'pending' },
												]}
												placeholder={false ? 'Loading...' : 'Select Status'}
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
												// options={
												// 	categories?.message?.data?.map((cat) => ({
												// 		label: cat.name,
												// 		value: cat.id.toString(),
												// 	})) ?? []
												// }
												options={[
													{ label: 'Active', value: 'active' },
													{ label: 'Pending', value: 'pending' },
												]}
												placeholder={false ? 'Loading...' : 'Select Status'}
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
												// options={
												// 	categories?.message?.data?.map((cat) => ({
												// 		label: cat.name,
												// 		value: cat.id.toString(),
												// 	})) ?? []
												// }
												options={[
													{ label: 'Active', value: 'active' },
													{ label: 'Pending', value: 'pending' },
												]}
												placeholder={false ? 'Loading...' : 'Select Status'}
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
													<Input {...field} placeholder="0.00" />
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
													<Input {...field} placeholder="0.00" />
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
													<Input {...field} placeholder="0.00" />
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
													<Input {...field} placeholder="0" />
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
												// options={
												// 	categories?.message?.data?.map((cat) => ({
												// 		label: cat.name,
												// 		value: cat.id.toString(),
												// 	})) ?? []
												// }
												options={[
													{ label: 'Active', value: 'active' },
													{ label: 'Pending', value: 'pending' },
												]}
												placeholder={false ? 'Loading...' : 'Select Status'}
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
												// options={
												// 	categories?.message?.data?.map((cat) => ({
												// 		label: cat.name,
												// 		value: cat.id.toString(),
												// 	})) ?? []
												// }
												options={[
													{ label: 'Active', value: 'active' },
													{ label: 'Pending', value: 'pending' },
												]}
												placeholder={false ? 'Loading...' : 'Select Status'}
											/>
										)}
									/>

									{/* Name */}
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
									{/* Name */}
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
									{/* Name */}
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
												<Textarea
													{...field}
													placeholder="Type long description..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Card>
									<CardContent className="space-y-4">
										<h4 className="text-lg font-medium">Specification</h4>

										<Card>
											<CardContent>
												<div className="grid grid-cols-2 gap-6 relative">
													{/* specification */}
													<FormField
														control={form.control}
														name="specification"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Questions</FormLabel>
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
													{/* Specification Answer */}
													<FormField
														control={form.control}
														name="specification_ans"
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
														// onClick={() => remove(index)}
														className="absolute top-0 right-0"
														// disabled={isLoading || fields.length === 1}
													>
														<Trash2 className="h-4 w-4 text-destructive" />
														<span className="sr-only">Remove</span>
													</Button>
												</div>
											</CardContent>
										</Card>

										<div className="flex justify-end">
											{/* Add New Facility */}
											<Button
												className=" "
												type="button"
												variant="outline"
												size="icon"
												// disabled={fields.length === 20}
												// onClick={() =>
												// 	append({
												// 		id: fields.length,
												// 		key: 'yes',
												// 		value: '',
												// 	})
												// }
											>
												<Plus className="h-4 w-4" />
												<span className="sr-only">Add New</span>
											</Button>
										</div>
									</CardContent>
								</Card>
								<div className="grid grid-cols-2 gap-6">
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
									{/* Suggest (Checkbox styled) */}
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

								<Card>
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
											</div>

											<div className="space-y-4">
												<Card>
													<CardContent className="space-y-4">
														<div className="grid grid-cols-2 md:grid-cols-2 2xl:grid-cols-4 gap-6 relative">
															{/* min_bulk_qty */}
															<FormField
																control={form.control}
																name="min_bulk_qty"
																render={({ field }) => (
																	<FormItem className="gap-5">
																		<FormLabel>Min Bulk Qty</FormLabel>
																		<FormControl>
																			<Input {...field} placeholder="0" />
																		</FormControl>
																		<FormMessage />
																	</FormItem>
																)}
															/>
															{/* min_bulk_price */}
															<FormField
																control={form.control}
																name="min_bulk_price"
																render={({ field }) => (
																	<FormItem className="gap-5">
																		<FormLabel>Min Bulk Price</FormLabel>
																		<FormControl>
																			<Input {...field} placeholder="0.00" />
																		</FormControl>
																		<FormMessage />
																	</FormItem>
																)}
															/>

															{/* Bulk Commission */}
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
																							<RadioGroupItem value="percentage" />
																						</FormControl>
																						<FormLabel className="font-normal text-xs">
																							Percentage
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
																	name="bulk_commission"
																	render={({ field }) => (
																		<FormItem className="gap-5">
																			<FormLabel>Bulk Commission</FormLabel>
																			<FormControl>
																				<Input {...field} placeholder="0.00" />
																			</FormControl>
																			<FormMessage />
																		</FormItem>
																	)}
																/>
															</div>
															{/* advance_payment */}
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
																							<RadioGroupItem value="percentage" />
																						</FormControl>
																						<FormLabel className="font-normal text-xs">
																							Percentage
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
																		<FormItem className="gap-5">
																			<FormLabel>Advance Amount</FormLabel>
																			<FormControl>
																				<Input {...field} placeholder="0.00" />
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
																// onClick={() => remove(index)}
																className="absolute top-0 right-0"
																// disabled={isLoading || fields.length === 1}
															>
																<Trash2 className="h-4 w-4 text-destructive" />
																<span className="sr-only">Remove</span>
															</Button>
														</div>
													</CardContent>
												</Card>
												<div className="flex justify-end">
													{/* Add New Facility */}
													<Button
														className=" "
														type="button"
														variant="outline"
														size="icon"
														// disabled={fields.length === 20}
														// onClick={() =>
														// 	append({
														// 		id: fields.length,
														// 		key: 'yes',
														// 		value: '',
														// 	})
														// }
													>
														<Plus className="h-4 w-4" />
														<span className="sr-only">Add New</span>
													</Button>
												</div>
											</div>
											<div className="grid grid-cols-2 gap-6">
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
																				<RadioGroupItem value="percentage" />
																			</FormControl>
																			<FormLabel className="font-normal text-xs">
																				Percentage
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
																	<Input {...field} placeholder="0.00" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
												{/* discount_rate */}
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
																				<RadioGroupItem value="percentage" />
																			</FormControl>
																			<FormLabel className="font-normal text-xs">
																				Percentage
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
																<FormLabel>Commission</FormLabel>
																<FormControl>
																	<Input {...field} placeholder="0.00" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
								<div>
									<Button type="submit">
										{/* <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> */}
										Create Brand
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
```