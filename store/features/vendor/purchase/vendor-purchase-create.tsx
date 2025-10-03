'use client';

import { Container1 } from '@/components/dashboard';
import { SearchableSelect } from '@/components/dashboard/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { alertConfirm, cn, handleValidationError } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, LoaderCircle, PlusIcon, Trash2Icon } from 'lucide-react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { VendorColorCreateModal } from '../color';
import { VendorPaymentMethodsCreateModal } from '../payment-methods';

import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { VendorUnitCreateModal } from '../unit';
import { VendorVariationCreateModal } from '../variation';
import {
	useVendorPurchaseCreateDataQuery,
	useVendorPurchaseProductBySupplierIdQuery,
	useVendorPurchaseStoreMutation,
} from './vendor-purchase-api-slice';

const productSchema = z.object({
	product_id: z.string().min(1, 'Product is required'),
	unit_id: z.string().min(1, 'Unit is required'),
	utility_id: z.string().optional(),
	variation_id: z.string().optional(),
	qty: z
		.number({ error: 'Qty is required' })
		.min(0, { message: 'Qty must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Qty must be a number',
		}),
	rate: z
		.number({ error: 'Rate is required' })
		.min(0, { message: 'Rate must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Rate must be a number',
		}),
	sub_total: z
		.number({ error: 'Sub Total is required' })
		.min(0, { message: 'Sub Total must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Sub Total must be a number',
		}),
});

const schema = z.object({
	supplier_id: z
		.string({ error: 'Supplier is required' })
		.min(1, 'Supplier is required'),
	chalan_no: z
		.string({ error: 'Chalan No is required' })
		.min(1, 'Chalan No is required'),
	purchase_date: z.date({ error: 'Purchase Date is required' }),
	status: z.enum(['ordered', 'received']),
	payment_id: z.string().min(1, 'Payment Method is required'),
	products: z.array(productSchema),
	grand_total: z
		.number({ error: 'Grand Total	 is required' })
		.min(0, { message: 'Grand Total must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Grand Total must be a number',
		}),
	purchase_discount: z
		.number({ error: 'Purchase Discount is required' })
		.min(0, { message: 'Purchase Discount must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Purchase Discount must be a number',
		}),
	paid_amount: z
		.number({ error: 'Paid Amount is required' })
		.min(0, { message: 'Paid Amount must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Paid Amount must be a number',
		}),
	due_amount: z
		.number({ error: 'Due Amount is required' })
		.min(0, { message: 'Due Amount must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Due Amount must be a number',
		}),
	note: z.string().optional(),
});

type ZodType = z.infer<typeof schema>;

export const VendorPurchaseCreate = () => {
	const router = useRouter();
	const [store, { isLoading: isLoadingStore }] =
		useVendorPurchaseStoreMutation();

	const { data, isLoading, isError } = useVendorPurchaseCreateDataQuery(
		undefined,
		{
			refetchOnFocus: false,
			refetchOnMountOrArgChange: false,
		}
	);

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),

		defaultValues: {
			supplier_id: '',
			purchase_discount: 0,
			chalan_no: '',
			purchase_date: new Date(),
			status: 'ordered',
			payment_id: '',
			grand_total: 0,
			paid_amount: 0,
			due_amount: 0,
			note: '',
			products: [
				{
					product_id: '',
					unit_id: '',
					utility_id: '',
					variation_id: '',
					qty: 1,
					rate: 0,
					sub_total: 0,
				},
			],
		},
	});

	const {
		fields: productFields,
		append: appendProduct,
		remove: removeProduct,
	} = useFieldArray({ control: form.control, name: 'products' });

	const { data: productData, isLoading: productLoading } =
		useVendorPurchaseProductBySupplierIdQuery(
			{ supplier_id: form.watch('supplier_id') },
			{
				skip: !form.watch('supplier_id'),
			}
		);

	// Add useEffect for automatic calculations
	const watchedProducts = useWatch({ control: form.control, name: 'products' });
	const purchaseDiscount = useWatch({
		control: form.control,
		name: 'purchase_discount',
	});
	const paidAmount = useWatch({ control: form.control, name: 'paid_amount' });

	useEffect(() => {
		console.log('fire');
		const productsTotal = watchedProducts.reduce((acc, item) => {
			const subTotal = Number(item?.sub_total || 0);
			return acc + subTotal;
		}, 0);

		const grandTotal = Math.max(
			0,
			productsTotal - Number(purchaseDiscount || 0)
		);
		const dueAmount = Math.max(0, grandTotal - Number(paidAmount || 0));

		form.setValue('grand_total', grandTotal);
		form.setValue('due_amount', dueAmount);
	}, [watchedProducts, purchaseDiscount, paidAmount]);

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({
						...data,
						purchase_date: format(data.purchase_date, 'dd-MM-yyyy'),
						unit_id: data.products.map((p) => p.unit_id),
						sub_total: data.products.map((p) => p.sub_total),
						rate: data.products.map((p) => p.rate),
						qty: data.products.map((p) => p.qty),
						product_id: data.products.map((p) => p.product_id),
						color_id: data.products.map((p) => p.utility_id),
						size_id: data.products.map((p) => p.variation_id),
						total_qty: data.products.reduce((acc, p) => acc + p.qty, 0),
						total_price: data.products.reduce((acc, p) => acc + p.sub_total, 0),
					}).unwrap();
					if (response.status === 200) {
						toast.success(response.message || 'Created successfully');
						form.reset();
						router.push('/purchase');
					} else {
						const errorResponse = response as any;
						if (
							response.status === 400 &&
							typeof errorResponse.errors === 'object'
						) {
							handleValidationError(errorResponse, form.setError);
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

	useEffect(() => {
		if (data?.chalan_no) {
			form.setValue('chalan_no', data?.chalan_no);
		}
	}, [data]);

	return (
		<Container1
			header={
				<div className="flex items-center justify-between flex-wrap gap-2">
					<CardTitle>Product Purchase</CardTitle>
					<div className="flex items-center gap-2 flex-wrap">
						<VendorUnitCreateModal />
						<VendorColorCreateModal />
						<VendorVariationCreateModal />
						<VendorPaymentMethodsCreateModal />
					</div>
				</div>
			}
			isLoading={isLoading}
			isError={isError}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<Card>
						<CardContent className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 2xl:grid-cols-5 gap-4">
							<FormField
								control={form.control}
								name="supplier_id"
								render={({ field }) => (
									<SearchableSelect
										field={field}
										label="Supplier Company Name *"
										options={
											data?.data?.supplier?.map((cat) => ({
												label: cat?.business_name,
												value: cat?.id?.toString(),
											})) ?? []
										}
										placeholder={isLoading ? 'Loading...' : 'Select Supplier'}
									/>
								)}
							/>

							{/* Name */}
							<FormField
								control={form.control}
								name="chalan_no"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Chalan Number *</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Type color name..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Expire Date */}
							<FormField
								control={form.control}
								name="purchase_date"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Purchase Date</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														className={cn(
															'w-full pl-3 justify-start text-left font-normal py-5',
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

							{/* Status */}
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Purchase Status * </FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="ordered">Ordered</SelectItem>
												<SelectItem value="received">Received</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="payment_id"
								render={({ field }) => (
									<SearchableSelect
										field={field}
										label="Payment Method"
										options={
											data?.data?.payment_method?.map((cat) => ({
												label: cat?.payment_method_name,
												value: cat?.id?.toString(),
											})) ?? []
										}
										placeholder={
											isLoading ? 'Loading...' : 'Select Payment Method'
										}
									/>
								)}
							/>
						</CardContent>
					</Card>
					<Card className="overflow-x-auto">
						<CardContent className="relative">
							<table className="w-full text-start">
								<thead>
									<tr>
										<th className="text-start font-medium w-[250px] pb-3">
											Item Information
										</th>
										<th className="text-start font-medium px-2 pb-3">Unit</th>
										<th className="text-start font-medium px-2 pb-3">Color</th>
										<th className="text-start font-medium px-2 pb-3">
											Variation
										</th>
										<th className="text-start font-medium px-2 min-w-[150px] w-[150px] pb-3">
											Qty
										</th>
										<th className="text-start font-medium px-2 min-w-[150px] w-[150px] pb-3">
											Rate
										</th>
										<th className="text-start font-medium px-2 min-w-[250px] w-[250px] pb-3">
											Total
										</th>
										<th className="text-start font-medium min-w-[80px] w-[80px] pb-3">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{productFields.map((field, index) => (
										<tr key={field.id}>
											<td className="pb-3">
												<FormField
													control={form.control}
													name={`products.${index}.product_id`}
													render={({ field }) => (
														<SearchableSelect
															field={field}
															options={
																productData?.products?.map((cat) => ({
																	label: cat?.name,
																	value: cat?.id?.toString(),
																	others: cat,
																})) ?? []
															}
															placeholder={
																productLoading ? 'Loading...' : 'Select Product'
															}
															onSelectorClick={(selectedOption) => {
																const price = parseFloat(
																	selectedOption?.others?.original_price ?? '0'
																);

																// Set rate
																form.setValue(`products.${index}.rate`, price);

																// Get current qty from form
																const qty =
																	form.getValues(`products.${index}.qty`) || 1;

																// Set sub_total
																form.setValue(
																	`products.${index}.sub_total`,
																	price * qty
																);
															}}
														/>
													)}
												/>
											</td>
											<td className="px-2 pb-3">
												<FormField
													control={form.control}
													name={`products.${index}.unit_id`}
													render={({ field }) => (
														<SearchableSelect
															field={field}
															options={
																data?.data?.unit?.map((cat) => ({
																	label: cat?.unit_name,
																	value: cat?.id?.toString(),
																})) ?? []
															}
															placeholder={
																isLoading ? 'Loading...' : 'Select Unit'
															}
														/>
													)}
												/>
											</td>
											<td className="px-2 pb-3">
												<FormField
													control={form.control}
													name={`products.${index}.utility_id`}
													render={({ field }) => (
														<SearchableSelect
															field={field}
															options={
																data?.data?.variation?.map((cat) => ({
																	label: cat?.name,
																	value: cat?.id?.toString(),
																})) ?? []
															}
															placeholder={
																isLoading ? 'Loading...' : 'Select Color'
															}
														/>
													)}
												/>
											</td>
											<td className="px-2 pb-3">
												<FormField
													control={form.control}
													name={`products.${index}.variation_id`}
													render={({ field }) => (
														<SearchableSelect
															field={field}
															options={
																data?.data?.variation?.map((cat) => ({
																	label: cat?.name,
																	value: cat?.id?.toString(),
																})) ?? []
															}
															placeholder={
																isLoading ? 'Loading...' : 'Select Variation'
															}
														/>
													)}
												/>
											</td>
											<td className="px-2 pb-3">
												{/* Name */}
												<FormField
													control={form.control}
													name={`products.${index}.qty`}
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<Input
																	{...field}
																	placeholder="0.00"
																	type="number"
																	onWheel={(e) => {
																		(e.target as HTMLInputElement).blur();
																	}}
																	className="pr-3"
																	onChange={(e) => {
																		const qty = e.target.valueAsNumber || 0;
																		field.onChange(qty);

																		// Get current rate
																		const rate =
																			form.getValues(
																				`products.${index}.rate`
																			) || 0;
																		form.setValue(
																			`products.${index}.sub_total`,
																			qty * rate
																		);
																	}}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</td>
											<td className="px-2 pb-3">
												{/* Name */}
												<FormField
													control={form.control}
													name={`products.${index}.rate`}
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<Input
																	{...field}
																	placeholder="0.00"
																	type="number"
																	onWheel={(e) => {
																		(e.target as HTMLInputElement).blur();
																	}}
																	className="pr-3"
																	onChange={(e) => {
																		const rate = e.target.valueAsNumber || 0;
																		field.onChange(rate);

																		const qty =
																			form.getValues(`products.${index}.qty`) ||
																			0;
																		form.setValue(
																			`products.${index}.sub_total`,
																			qty * rate
																		);
																	}}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</td>
											<td className="px-2 pb-3">
												{/* Name */}
												<FormField
													control={form.control}
													name={`products.${index}.sub_total`}
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<Input
																	{...field}
																	placeholder="0.00"
																	type="number"
																	readOnly
																	onWheel={(e) => {
																		(e.target as HTMLInputElement).blur();
																	}}
																	className="pr-3"
																	onChange={(e) =>
																		field.onChange(e.target.valueAsNumber || '')
																	}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</td>
											<td className="pb-3">
												<div className="flex items-center">
													<Button
														type="button"
														variant="outline"
														size="icon"
														onClick={() =>
															appendProduct({
																product_id: '',
																unit_id: '',
																utility_id: '',
																variation_id: '',
																qty: 1,
																rate: 0,
																sub_total: 0,
															})
														}
													>
														<PlusIcon className="w-4 h-4" />
														<span className="sr-only">Add New</span>
													</Button>
													{productFields.length > 1 && (
														<Button
															type="button"
															variant="outline"
															size="icon"
															className="ml-2"
															onClick={() => removeProduct(index)}
														>
															<Trash2Icon className="w-4 h-4 text-destructive" />
															<span className="sr-only">Remove</span>
														</Button>
													)}
												</div>
											</td>
										</tr>
									))}
									<tr>
										<td className="px-2 text-end py-2" colSpan={6}>
											Purchase discount :
										</td>
										<td className="px-2 py-2" colSpan={1}>
											{/* Name */}
											<FormField
												control={form.control}
												name="purchase_discount"
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Input
																{...field}
																placeholder="0.00"
																type="number"
																onWheel={(e) => {
																	(e.target as HTMLInputElement).blur();
																}}
																className="pr-3"
																onChange={(e) => {
																	const value = e.target.valueAsNumber || 0;
																	field.onChange(value);
																}}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</td>
										<td className="py-2" colSpan={1}></td>
									</tr>
									<tr>
										<td className="px-2 text-end py-2" colSpan={6}>
											Grand Total :
										</td>
										<td className="px-2 py-2" colSpan={1}>
											{/* Name */}
											<FormField
												control={form.control}
												name="grand_total"
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Input
																{...field}
																placeholder="0.00"
																type="number"
																readOnly
																onWheel={(e) => {
																	(e.target as HTMLInputElement).blur();
																}}
																className="pr-3 bg-gray-50"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</td>
										<td className="py-2" colSpan={1}></td>
									</tr>
									<tr>
										<td className="px-2 text-end py-2" colSpan={6}>
											Paid Amount :
										</td>
										<td className="px-2 py-2" colSpan={1}>
											{/* Name */}
											<FormField
												control={form.control}
												name="paid_amount"
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Input
																{...field}
																placeholder="0.00"
																type="number"
																onWheel={(e) => {
																	(e.target as HTMLInputElement).blur();
																}}
																className="pr-3"
																onChange={(e) => {
																	const value = e.target.valueAsNumber || 0;
																	field.onChange(value);
																}}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</td>
										<td className="py-2" colSpan={1}></td>
									</tr>
									<tr>
										<td className="px-2 text-end py-2" colSpan={6}>
											Due Amount:
										</td>
										<td className="px-2 py-2" colSpan={1}>
											{/* Name */}
											<FormField
												control={form.control}
												name="due_amount"
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Input
																{...field}
																placeholder="0.00"
																type="number"
																readOnly
																onWheel={(e) => {
																	(e.target as HTMLInputElement).blur();
																}}
																className="pr-3 bg-gray-50"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</td>
										<td className="py-2" colSpan={1}></td>
									</tr>
								</tbody>
							</table>
							<div className="absolute bottom-0 left-4 w-[350px]">
								<FormField
									control={form.control}
									name="note"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Note</FormLabel>
											<FormControl>
												<Textarea {...field} placeholder="Add a Note" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</CardContent>
					</Card>

					<DialogFooter>
						<Button type="submit" disabled={isLoadingStore}>
							{isLoadingStore && (
								<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
							)}
							{isLoadingStore ? 'Creating...' : 'Create Purchase'}
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</Container1>
	);
};
