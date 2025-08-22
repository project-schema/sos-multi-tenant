'use client';

import { Container1 } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { sign } from '@/lib';
import { useParams } from 'next/navigation';
import { useVendorPurchaseReturnShowQuery } from './vendor-purchase-api-slice';

export function VendorPurchaseReturnViewPage() {
	const { id } = useParams();
	const { data, isLoading, isError } = useVendorPurchaseReturnShowQuery(
		{
			id: id?.toString() || '',
		},
		{ skip: !id }
	);

	return (
		<Container1
			isError={isError}
			isLoading={isLoading}
			header={
				<>
					<div className="pb-2 lg:pb-3 flex items-center justify-between">
						<CardTitle>Purchase Return</CardTitle>
					</div>
				</>
			}
		>
			{data?.status && (
				<div className="space-y-6">
					{/* Invoice Header */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								<span>Invoice #{data.return_list?.chalan_no || ''}</span>
								<Badge variant="outline">
									{data.return_list?.purchase_date || ''}
								</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Bill From */}
								<div>
									<h3 className="font-semibold text-lg mb-2">Bill From:</h3>
									<div className="space-y-1 text-sm">
										<p className="font-medium">Merchant Name</p>
										{/* <p>{data.return_list?.supplier.phone || ''}</p>
										<p>{data.return_list?.supplier.email || ''}</p>
										<p>{data.return_list?.supplier.address || ''}</p> */}
									</div>
								</div>

								{/* Bill To */}
								<div>
									<h3 className="font-semibold text-lg mb-2">Bill To:</h3>
									{/* <div className="space-y-1 text-sm">
										<p className="font-medium">{data.logo?.shop_name || ''}</p>
										<p>{data.logo?.phone || ''}</p>
										<p>{data.logo?.email || ''}</p>
										<p>{data.logo?.address || ''}</p>
									</div> */}
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
											<TableHead className="bg-stone-100">Subtotal</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{data.return_list?.return_details?.map((f_field) => {
											return (
												<TableRow key={f_field?.id}>
													<TableCell className="font-medium">
														{f_field?.product?.name || '-'}
													</TableCell>
													<TableCell>
														{f_field?.unit?.unit_name || '-'}
													</TableCell>
													<TableCell>{f_field?.color?.name || '-'}</TableCell>
													<TableCell>{f_field?.size?.name || '-'}</TableCell>
													<TableCell>
														<Badge variant="outline">
															{f_field?.return_qty}
														</Badge>
													</TableCell>
													<TableCell>
														{f_field?.r_rate} {sign.tk}
													</TableCell>

													<TableCell>
														<Badge variant="secondary">
															{f_field?.r_sub_total} {sign.tk}
														</Badge>
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</div>

							{/* Summary */}
							<div className="flex justify-end mt-4">
								<Card className="w-80">
									<CardHeader>
										<CardTitle className="text-lg">Return Summary</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2">
										<div className="flex justify-between">
											<span>Total Items:</span>
											<span>{data.return_list?.return_details.length}</span>
										</div>
										<div className="flex justify-between">
											<span>Total Return Qty:</span>
											<span>
												{data.return_list?.return_details.reduce(
													(sum, item) => sum + (item?.return_qty || 0),
													0
												)}
											</span>
										</div>
										<Separator />
										<div className="flex justify-between font-semibold">
											<span>Total Return Amount:</span>
											<span>
												{data.return_list?.return_details
													.reduce((sum, item) => {
														const returnQty = item?.return_qty || 0;
														const rate = parseFloat(item?.r_rate || '0') || 0;
														return sum + returnQty * rate;
													}, 0)
													.toFixed(2)}{' '}
												{sign.tk}
											</span>
										</div>
									</CardContent>
								</Card>
							</div>
						</CardContent>
					</Card>
				</div>
			)}
		</Container1>
	);
}
