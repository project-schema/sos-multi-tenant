'use client';

import { Container1 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { useDebounce } from '@/hooks/use-debounce';
import { alertConfirm, sign, tableSrCount } from '@/lib';
import { Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useVendorPosSalesCreateDataQuery } from '../pos-sales';
import { VendorPosSellFilter } from '../pos-sales/vendor-pos-sell-filter';
import { useVendorDamageProductsStoreMutation } from './damage-products-api-slice';
import { VendorDamageProductsCard } from './damage-products-card';
import { usePosSalesDamage } from './damage-products-hook';

export function VendorDamageProductsCreatePage() {
	const [filters, setFilters] = useState({
		searchTerm: '',
		brand_id: '',
		category_id: '',
	});

	const router = useRouter();

	const [store, { isLoading: isCreating }] =
		useVendorDamageProductsStoreMutation();
	const search = useDebounce(filters.searchTerm, 500);
	const { data, isLoading, isError } = useVendorPosSalesCreateDataQuery({
		brand_id: filters.brand_id,
		category_id: filters.category_id,
		search,
	});

	// Redux state and actions
	const {
		cart,
		updateCartItemQuantity,
		clearCart,
		setNote,
		note,
		setCartRemark,
	} = usePosSalesDamage();

	const onSubmit = async () => {
		const submitData = {
			note,
			product_id: cart.find((item) => item.id)?.product_id,
			qty: cart.find((item) => item.id)?.quantity,
			damage_qty: cart.map((item) => item.quantity),
			variant_id: cart.map((item) => item.variant_id),
			remark: cart.map((item) => item.remark),
		};
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({
						...submitData,
					}).unwrap();
					if (response.status === 200) {
						toast.success(response.message || 'Created successfully');
						clearCart();
						router.push('/damage-products');
					} else {
						const errorResponse = response as any;
						if (
							response.status === 400 &&
							typeof errorResponse.errors === 'object'
						) {
						} else {
							toast.error(response.message || 'Something went wrong');
						}
					}
				} catch (error: any) {
					if (error?.status === 400) {
					} else {
						toast.error('Something went wrong');
					}
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
						<CardTitle>Create Damage</CardTitle>
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
										<TableHead className="w-24">Sell Price</TableHead>
										<TableHead className="w-50 text-center">Qty</TableHead>
										<TableHead className="w-50">Note</TableHead>
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
												<TableCell>
													{sign.tk} {item.selling_price}
												</TableCell>

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
												<TableCell>
													<Textarea
														placeholder="Note"
														value={item.remark}
														onChange={(e) =>
															setCartRemark({
																id: item.id,
																variant_id: item.variant_id,
																remark: e.target.value,
															})
														}
													/>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>

						<Separator />

						<div className="space-y-2">
							<Label>Note</Label>
							<Textarea
								placeholder="Note"
								value={note}
								onChange={(e) => setNote(e.target.value)}
							/>
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
									disabled={isCreating}
									onClick={onSubmit}
								>
									{isCreating ? 'Creating...' : 'Create Damage'}
								</Button>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</Container1>
	);
}
