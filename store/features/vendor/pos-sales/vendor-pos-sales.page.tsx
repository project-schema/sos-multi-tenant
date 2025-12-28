'use client';

import { Container1 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useDebounce } from '@/hooks/use-debounce';
import { sign, tableSrCount } from '@/lib';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { VendorPosCheckout } from './vendor-pos-checkout';
import { useVendorPosSalesCreateDataQuery } from './vendor-pos-sales.api-slice';
import { VendorPosSalesCard } from './vendor-pos-sales.card';
import { usePosSales } from './vendor-pos-sales.hook';
import { VendorPosSellFilter } from './vendor-pos-sell-filter';

export function VendorPosSalesPage() {
	const [filters, setFilters] = useState({
		searchTerm: '',
		brand_id: '',
		category_id: '',
	});
	const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

	const search = useDebounce(filters.searchTerm, 500);
	const { data, isLoading, isError } = useVendorPosSalesCreateDataQuery({
		brand_id: filters.brand_id,
		category_id: filters.category_id,
		search,
	});

	const clampQty = (qty: number, stock: number) => {
		return Math.max(1, Math.min(qty, stock));
	};

	// Redux state and actions
	const {
		cart,
		subtotal,
		discount,
		total,
		updateCartItemQuantity,
		removeFromCart,
		clearCart,
		setDiscount,
	} = usePosSales();

	return (
		<Container1
			isError={isError}
			isLoading={isLoading}
			header={
				<>
					<div className="pb-2 lg:pb-3 flex items-center justify-between">
						<CardTitle>POS Sales</CardTitle>
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
								<VendorPosSalesCard key={product.id} product={product} />
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
										<TableHead className="w-24">Sell Price</TableHead>
										<TableHead className="w-24">Discount</TableHead>
										<TableHead className="w-50 text-center">Qty</TableHead>
										<TableHead className="w-24">SubTotal</TableHead>
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
										cart?.map((item, index) => {
											const remainingQty = item.stock - item.quantity;

											return (
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
													<TableCell>
														{sign.tk} {item.selling_price}
													</TableCell>
													<TableCell>
														{item.discount_percentage
															? `${item.discount_percentage}%`
															: '-'}
													</TableCell>
													<TableCell>
														<div className="relative">
															<Button
																variant="link"
																size="icon"
																className="h-8 w-8 absolute -bottom-1 right-0 z-10"
																onClick={() => {
																	updateCartItemQuantity({
																		id: item.id,
																		variant_id: item.variant_id,
																		quantity: item.quantity - 1,
																	});
																}}
															>
																<Minus className="h-3 w-3" />
															</Button>
															<Input
																type="number"
																min={1}
																max={item.stock}
																value={item.quantity}
																onChange={(e) => {
																	const value = Number(e.target.value);

																	if (Number.isNaN(value)) return;

																	if (value > item.stock) {
																		toast.error('Out of Stock');
																		return;
																	}

																	updateCartItemQuantity({
																		id: item.id,
																		variant_id: item.variant_id,
																		quantity: clampQty(value, item.stock),
																	});
																}}
																className="pr-3 hide-number-input-arrow w-full"
															/>

															<Button
																variant="link"
																size="icon"
																className="h-8 w-8 absolute -top-1 right-0 z-10"
																disabled={item.quantity >= item.stock}
																onClick={() => {
																	updateCartItemQuantity({
																		id: item.id,
																		variant_id: item.variant_id,
																		quantity: clampQty(
																			item.quantity + 1,
																			item.stock
																		),
																	});
																}}
															>
																<Plus className="h-3 w-3" />
															</Button>
														</div>
													</TableCell>
													<TableCell className="relative overflow-hidden">
														<span>
															{sign.tk} {item.subtotal}
														</span>
														<Button
															variant="link"
															size="icon"
															className="absolute -top-2 -right-2"
															onClick={() =>
																removeFromCart({
																	id: item.id,
																	variant_id: item.variant_id,
																})
															}
														>
															<Trash2 className="text-destructive  h-4 w-4" />
														</Button>
													</TableCell>
												</TableRow>
											);
										})
									)}
								</TableBody>
							</Table>
						</div>

						{/* Cart Summary */}
						{cart.length > 0 && (
							<div className="space-y-4 border-t pt-4">
								<div className="space-y-2">
									<div className="flex justify-between">
										<span>Subtotal:</span>
										<span>
											{sign.tk} {subtotal}
										</span>
									</div>
									<div className="flex justify-between">
										<span>Discount:</span>
										<div className="flex items-center space-x-2">
											<Input
												type="number"
												value={discount}
												onChange={(e) =>
													setDiscount(parseFloat(e.target.value) || 0)
												}
												className="pr-3 hide-number-input-arrow"
												placeholder="0"
											/>
											<span>%</span>
										</div>
									</div>
									{/* <div className="flex justify-between">
										<span>Tax:</span>
										<div className="flex items-center space-x-2">
											<Input
												type="number"
												value={tax}
												onChange={(e) =>
													setTax(parseFloat(e.target.value) || 0)
												}
												className="pr-3 hide-number-input-arrow"
												placeholder="0"
											/>
											<span>%</span>
										</div>
									</div> */}
									<div className="flex justify-between font-bold text-lg border-t pt-2">
										<span>Total:</span>
										<span>
											{sign.tk} {total < 0 ? 0 : total}
										</span>
									</div>
								</div>

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
										onClick={() => setIsCheckoutOpen(true)}
									>
										Checkout
									</Button>
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Checkout Modal */}
			<VendorPosCheckout
				isOpen={isCheckoutOpen}
				onClose={() => setIsCheckoutOpen(false)}
				data={data}
			/>
		</Container1>
	);
}
