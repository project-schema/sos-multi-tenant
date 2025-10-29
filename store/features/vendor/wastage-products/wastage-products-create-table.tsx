'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle } from 'lucide-react';

import { alertConfirm, sign } from '@/lib';
import { useRouter } from 'next/navigation';
import { useVendorWastageProductsStoreMutation } from './wastage-products-api-slice';
import { iVendorWastageInvoice } from './wastage-products-type';

// Zod Schema for return form
const returnItemSchema = z.object({
	product_id: z.number().optional(),
	product_name: z.string().optional(),
	unit: z.string().optional(),
	color: z.string().optional(),
	variation: z.string().optional(),
	purchase_qty: z.number().optional(),
	rate: z.string().optional(),
	subtotal: z.string().optional(),
	return_qty: z
		.number({ error: 'Return Qty is required' })
		.min(0, { message: 'Return Qty must be at least 0' })
		.refine((val) => !isNaN(val), {
			message: 'Return Qty must be a number',
		}),
	remark: z.string().optional(),
});

const returnSchema = z.object({
	return_items: z
		.array(returnItemSchema)
		.min(1, 'At least one item must be returned'),
});

type ReturnFormData = z.infer<typeof returnSchema>;

export function VendorWastageProductsCreateTable({
	data,
}: {
	data: iVendorWastageInvoice['sales'];
}) {
	const router = useRouter();
	const [submitReturn, { isLoading }] = useVendorWastageProductsStoreMutation();
	const form = useForm<ReturnFormData>({
		resolver: zodResolver(returnSchema),
		defaultValues: {
			return_items: data?.sale_details?.map((item) => ({
				product_id: item?.product_id,
				product_name: item?.product?.name || '--',
				unit: item?.unit?.unit_name || '--',
				color: item?.color?.name || '--',
				variation: item?.size?.name || '--',
				purchase_qty: item?.qty,
				rate: item?.rate || '--',
				subtotal: item?.sub_total || '--',
				return_qty: 0,
				remark: '',
			})),
		},
	});

	const { fields } = useFieldArray({
		control: form.control,
		name: 'return_items',
	});

	const onSubmit = async (formData: ReturnFormData) => {
		alertConfirm({
			onOk: async () => {
				try {
					// Submit only the required fields
					const response = await submitReturn({
						id: data?.id,
						return_qty: formData.return_items?.map((item) => item?.return_qty),
						remark: formData.return_items?.map((item) => item?.remark),
					}).unwrap();

					if (response.status === 200) {
						toast.success(response.message || 'Return submitted successfully');
						form.reset();
						router.push(`/dashboard/wastage-products`);
					} else {
						toast.error(response.message || 'Failed to submit return');
					}
				} catch (error: any) {
					toast.error(error.message || 'Failed to submit return');
				}
			},
		});
	};

	const calculateReturnSubtotal = (returnQty: number, rate: string) => {
		return (returnQty * parseFloat(rate)).toFixed(2);
	};

	return (
		<div className="space-y-6">
			{/* Invoice Header */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<span>Invoice #{data?.barcode}</span>
						<Badge variant="outline">{data?.wastage_date}</Badge>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Bill From */}
						<div>
							<h3 className="font-semibold text-lg mb-2">Invoice:</h3>
							<div className="space-y-1 text-sm">
								<p className="font-medium">{data?.barcode}</p>
								<p>
									<b>Paid Amount:</b> {data?.paid_amount}
								</p>
								<p>
									<b>Due Amount:</b> {data?.due_amount}
								</p>
							</div>
						</div>

						{/* Bill To */}
						<div>
							<h3 className="font-semibold text-lg mb-2">Bill From:</h3>
							<div className="space-y-1 text-sm">
								<p>
									<b>Sale Date:</b> {data?.sale_date}
								</p>
								<p>
									<b>Total Qty:</b> {data?.total_qty}
								</p>
								<p>
									<b>Total Price:</b> {data?.total_price}
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Return Form */}
			<Card>
				<CardHeader>
					<CardTitle>Return Items</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{/* Products Table */}
							<div className="border rounded-lg">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="bg-stone-100">
												Product Name
											</TableHead>
											<TableHead className="bg-stone-100">Unit</TableHead>
											<TableHead className="bg-stone-100">Color</TableHead>
											<TableHead className="bg-stone-100">Variation</TableHead>
											<TableHead className="bg-stone-100">
												Purchase Qty
											</TableHead>
											<TableHead className="bg-stone-100">Rate</TableHead>
											<TableHead className="bg-stone-100">Return Qty</TableHead>
											<TableHead className="bg-stone-100">
												Return Subtotal
											</TableHead>
											<TableHead className="bg-stone-100 min-w-[200px]">
												Reason
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{fields.map((f_field, index) => {
											const returnQty =
												form.watch(`return_items.${index}.return_qty`) || 0;
											const rate =
												form.watch(`return_items.${index}.rate`) || '0';
											const returnSubtotal = calculateReturnSubtotal(
												returnQty,
												rate
											);

											return (
												<TableRow key={f_field.id}>
													<TableCell className="font-medium">
														{f_field.product_name}
													</TableCell>
													<TableCell>{f_field.unit}</TableCell>
													<TableCell>{f_field.color}</TableCell>
													<TableCell>{f_field.variation}</TableCell>
													<TableCell>
														<Badge variant="outline">
															{f_field.purchase_qty}
														</Badge>
													</TableCell>
													<TableCell>
														{f_field.rate} {sign.tk}
													</TableCell>
													<TableCell>
														<FormField
															control={form.control}
															name={`return_items.${index}.return_qty`}
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<Input
																			type="number"
																			min="0"
																			max={f_field?.purchase_qty}
																			{...field}
																			onChange={(e) => {
																				const value =
																					parseInt(e.target.value) || 0;
																				const max = f_field?.purchase_qty || 0;
																				if (value > max) {
																					toast.error(
																						`Return Qty must be less than or equal to ${max}`
																					);
																					return;
																				}
																				field.onChange(value);
																			}}
																			onWheel={(e) => {
																				(e.target as HTMLInputElement).blur();
																			}}
																			className="w-20 pr-3"
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</TableCell>
													<TableCell>
														<Badge variant="secondary">
															{returnSubtotal} {sign.tk}
														</Badge>
													</TableCell>
													<TableCell>
														<FormField
															control={form.control}
															name={`return_items.${index}.remark`}
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<Textarea
																			placeholder="Return reason..."
																			{...field}
																			className="min-h-[60px] w-full"
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</div>

							{/* Summary */}
							<div className="flex justify-end">
								<Card className="w-80">
									<CardHeader>
										<CardTitle className="text-lg">Return Summary</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2">
										<div className="flex justify-between">
											<span>Total Items:</span>
											<span>
												{
													form
														.watch('return_items')
														.filter((item) => item?.return_qty > 0).length
												}
											</span>
										</div>
										<div className="flex justify-between">
											<span>Total Return Qty:</span>
											<span>
												{form
													.watch('return_items')
													.reduce(
														(sum, item) => sum + (item?.return_qty || 0),
														0
													)}
											</span>
										</div>
										<Separator />
										<div className="flex justify-between font-semibold">
											<span>Total Return Amount:</span>
											<span>
												{form
													.watch('return_items')
													.reduce((sum, item) => {
														const returnQty = item?.return_qty || 0;
														const rate = parseFloat(item?.rate || '0') || 0;
														return sum + returnQty * rate;
													}, 0)
													.toFixed(2)}{' '}
												{sign.tk}
											</span>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Submit Button */}
							<div className="flex justify-end space-x-4">
								<Button
									type="button"
									variant="outline"
									onClick={() => form.reset()}
									disabled={isLoading}
								>
									Reset
								</Button>
								<Button
									type="submit"
									disabled={isLoading}
									className="min-w-[120px]"
								>
									{isLoading ? (
										<>
											<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
											Submitting...
										</>
									) : (
										'Submit Return'
									)}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
