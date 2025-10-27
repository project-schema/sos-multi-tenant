'use client';

import { Container1 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
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
import { useDebounce } from '@/hooks/use-debounce';
import { alertConfirm, tableSrCount } from '@/lib';
import { BarCode } from '@/lib/barcode';
import { Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useVendorPosSalesCreateDataQuery } from '../pos-sales';
import { VendorPosSellFilter } from '../pos-sales/vendor-pos-sell-filter';
import { useVendorBarcodeGenerateMutation } from './barcode-generator-api-slice';
import { VendorDamageProductsCard } from './barcode-generator-card';
import { useBarcodeGenerator } from './barcode-generator-hook';
import { generateBarcodeData, iGroupedBarcode } from './type';

export function VendorBarcodeGeneratorCreatePage() {
	const [barcodes, setBarcodes] = useState<iGroupedBarcode[]>([]);
	const [filters, setFilters] = useState({
		searchTerm: '',
		brand_id: '',
		category_id: '',
	});

	const router = useRouter();

	const [generate, { isLoading: isGenerating }] =
		useVendorBarcodeGenerateMutation();
	const search = useDebounce(filters.searchTerm, 500);
	const { data, isLoading, isError } = useVendorPosSalesCreateDataQuery({
		brand_id: filters.brand_id,
		category_id: filters.category_id,
		search,
	});

	// Redux state and actions
	const { cart, updateCartItemQuantity, clearCart } = useBarcodeGenerator();

	const onSubmit = async () => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await generate({
						bar_qty: cart.map((item) => item.quantity),
						variant_id: cart.map((item) => item.variant_id),
					}).unwrap();

					if (response?.barcodes?.length > 0) {
						toast.success('Generated successfully');
						setBarcodes(generateBarcodeData(response?.barcodes));
					} else {
						toast.error(response?.message || 'Something went wrong');
					}
				} catch (error: any) {
					toast.error(error?.message || 'Something went wrong');
				}
			},
		});
	};
	return (
		<Container1
			isError={isError}
			isLoading={isLoading}
			header={
				<>
					<div className="pb-2 lg:pb-3 flex items-center justify-between">
						<CardTitle>Barcode Generator</CardTitle>
					</div>
				</>
			}
		>
			<div className="grid grid-cols-12 gap-4">
				<Card className="col-span-12 lg:col-span-7">
					<CardContent className="space-y-4">
						<VendorPosSellFilter
							filters={filters}
							setFilters={setFilters}
							data={data || undefined}
							clearFilters={() =>
								setFilters({
									searchTerm: '',
									brand_id: '',
									category_id: '',
								})
							}
						/>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
							{data?.products?.map((product) => (
								<VendorDamageProductsCard key={product.id} product={product} />
							))}
						</div>
						{/* products card and other info  */}
					</CardContent>
				</Card>
				<Card className="col-span-12 lg:col-span-5">
					<CardContent className="space-y-4">
						{/* Cart Items Table */}
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-10">Sr.</TableHead>
										<TableHead>Item Information</TableHead>
										<TableHead className="w-24">Stock</TableHead>
										<TableHead className="w-50 text-center">
											Barcode Qty
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{cart.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={7}
												className="text-center text-muted-foreground"
											>
												No items in cart
											</TableCell>
										</TableRow>
									) : (
										cart?.map((item, index) => (
											<TableRow
												key={`${item.id}-${item.variant_id || 'default'}`}
											>
												<TableCell className="font-medium">
													{tableSrCount(1, index)}
												</TableCell>
												<TableCell>
													<div className="space-y-1">
														<div className="font-medium">{item.name}</div>

														<div className="text-xs text-muted-foreground capitalize">
															{item.unit ? item.unit : ''}
															{item.color ? `, ${item.color}` : ''}
															{item.size ? `, ${item.size}` : ''}
														</div>
													</div>
												</TableCell>
												<TableCell>{item.stock}</TableCell>

												<TableCell>
													<div className="relative">
														<Button
															variant="link"
															size="icon"
															className="h-8 w-8 absolute -bottom-1 right-0 z-10"
															onClick={() =>
																updateCartItemQuantity({
																	id: item.id,
																	variant_id: item.variant_id,
																	quantity: item.quantity - 1,
																})
															}
														>
															<Minus className="h-3 w-3" />
														</Button>
														<Input
															type="number"
															value={item.quantity}
															onChange={(e) =>
																updateCartItemQuantity({
																	id: item.id,
																	variant_id: item.variant_id,
																	quantity: parseInt(e.target.value) || 0,
																})
															}
															className="pr-3 hide-number-input-arrow w-full"
														/>
														<Button
															variant="link"
															size="icon"
															className="h-8 w-8 absolute -top-1 right-0 z-10"
															onClick={() =>
																updateCartItemQuantity({
																	id: item.id,
																	variant_id: item.variant_id,
																	quantity: item.quantity + 1,
																})
															}
														>
															<Plus className="h-3 w-3" />
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>

						<Separator />

						<div>
							{barcodes.map((barcode, index) => (
								<div key={index}>
									<div className="flex flex-wrap gap-2">
										<div className="text-sm font-medium">
											<strong>Name:</strong> {barcode.item.name}
										</div>
										<div className="text-sm text-muted-foreground">
											<strong>SKU:</strong> {barcode.item.sku}
										</div>
										<div className="text-sm text-muted-foreground">
											<strong>Selling Price:</strong>{' '}
											{barcode.item.selling_price}
										</div>
										<div className="text-sm text-muted-foreground">
											<strong>Quantity:</strong> {barcode.item.qty}
										</div>
										<div className="text-sm text-muted-foreground">
											<strong>Unit:</strong> {barcode.item.unit}
										</div>
										<div className="text-sm text-muted-foreground">
											<strong>Variant:</strong> {barcode.item.variant}
										</div>
										<div className="text-sm text-muted-foreground">
											<strong>Utility:</strong> {barcode.item.utility}
										</div>
									</div>
									<div className="grid grid-cols-3 gap-2">
										{barcode.elements.map((element, index) => (
											<div key={index}>
												<BarCode value={element.barcode} />
											</div>
										))}
									</div>
								</div>
							))}
						</div>

						{/* Cart Summary */}
						{cart.length > 0 && (
							<div className="flex space-x-2">
								<Button
									variant="outline"
									onClick={clearCart}
									className="flex-1"
								>
									Clear Cart
								</Button>
								<Button
									className="flex-1"
									disabled={isGenerating}
									onClick={onSubmit}
								>
									{isGenerating ? 'Generating...' : 'Generate Barcode'}
								</Button>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</Container1>
	);
}
