'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { dateFormat, sign, timeFormat } from '@/lib';
import { useCartViewQuery } from '@/store/features/dropshipper/cart';
import {
	AlertCircle,
	Calendar,
	DollarSign,
	Package,
	ShoppingCart,
	Tag,
	Truck,
} from 'lucide-react';

interface CartViewPageClientProps {
	cartId: string;
}

export default function CartViewPageClient({
	cartId,
}: CartViewPageClientProps) {
	const { data, isLoading, isError, isFetching } = useCartViewQuery(
		{ cartId },
		{ skip: !cartId }
	);
	const cartItem = data?.data;
	const product = cartItem?.product;

	return (
		<Container1
			isLoading={isLoading}
			isError={isError}
			header={
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-2">
						<ShoppingCart className="size-5" />
						Cart Details
					</CardTitle>
				</div>
			}
		>
			<CardContent className="space-y-6 relative">
				{isFetching && <Loader8 />}

				{product && cartItem && (
					<>
						{/* Cart Summary */}
						<Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<ShoppingCart className="size-5 text-blue-600" />
									Cart Summary
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid md:grid-cols-4 gap-4">
									<div className="p-4 bg-white rounded-lg shadow-sm">
										<p className="text-sm text-muted-foreground mb-1">
											Quantity
										</p>
										<p className="text-3xl font-bold text-blue-600">
											{cartItem.product_qty}
										</p>
									</div>
									<div className="p-4 bg-white rounded-lg shadow-sm">
										<p className="text-sm text-muted-foreground mb-1">
											Total Product Price
										</p>
										<p className="text-2xl font-bold text-green-600">
											{cartItem.totalproductprice}
											{sign.tk}
										</p>
									</div>
									<div className="p-4 bg-white rounded-lg shadow-sm">
										<p className="text-sm text-muted-foreground mb-1">
											Your Commission
										</p>
										<p className="text-2xl font-bold text-purple-600">
											{cartItem.total_affiliate_commission}
											{sign.tk}
										</p>
									</div>
									<div className="p-4 bg-white rounded-lg shadow-sm">
										<p className="text-sm text-muted-foreground mb-1">
											Total Amount
										</p>
										<p className="text-2xl font-bold text-orange-600">
											{cartItem.amount}
											{sign.tk}
										</p>
									</div>
								</div>

								<Separator className="my-4" />

								<div className="grid md:grid-cols-3 gap-4">
									<div className="p-3 bg-white rounded-lg">
										<p className="text-sm text-muted-foreground">
											Purchase Type
										</p>
										<p className="font-semibold capitalize">
											{cartItem.purchase_type}
										</p>
									</div>
									<div className="p-3 bg-white rounded-lg">
										<p className="text-sm text-muted-foreground">
											Advance Payment
										</p>
										<p className="font-semibold">
											{cartItem.advancepayment}
											{sign.tk}
										</p>
									</div>
									<div className="p-3 bg-white rounded-lg">
										<p className="text-sm text-muted-foreground">
											Total Advance Payment
										</p>
										<p className="font-semibold">
											{cartItem.totaladvancepayment}
											{sign.tk}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Product Overview */}
						<div className="grid md:grid-cols-2 gap-6">
							{/* Product Image */}
							<div className="space-y-4">
								<Card>
									<CardContent className="p-4">
										<div className="relative aspect-square w-full bg-stone-100 rounded-lg overflow-hidden">
											{product.image ? (
												<span>{product.image}</span>
											) : (
												<div className="flex items-center justify-center h-full text-muted-foreground">
													<Package className="size-16" />
												</div>
											)}
										</div>
									</CardContent>
								</Card>

								{/* Status & Tags */}
								<Card>
									<CardContent className="p-4 space-y-2">
										<div className="flex items-center gap-2">
											<span className="text-sm font-medium">Status:</span>
											<Badge
												variant={
													product.status === 'active' ? 'default' : 'secondary'
												}
											>
												{product.status}
											</Badge>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-sm font-medium">Product Type:</span>
											<Badge variant="outline">{product.product_type}</Badge>
										</div>
										{product.is_feature === 1 && (
											<Badge variant="default">Featured</Badge>
										)}
										{product.is_affiliate === 1 && (
											<Badge variant="secondary">Affiliate</Badge>
										)}
										{product.pre_order === 'yes' && (
											<Badge variant="destructive">Pre-Order</Badge>
										)}
									</CardContent>
								</Card>
							</div>

							{/* Product Information */}
							<div className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle className="text-xl">{product.name}</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div>
											<p className="text-sm text-muted-foreground mb-2">
												Short Description
											</p>
											<p className="text-sm">{product.short_description}</p>
										</div>
										{product.long_description && (
											<div>
												<p className="text-sm text-muted-foreground mb-2">
													Description
												</p>
												<p className="text-sm">{product.long_description}</p>
											</div>
										)}
										<Separator />
										<div className="grid grid-cols-2 gap-4 text-sm">
											<div>
												<p className="text-muted-foreground">SKU</p>
												<p className="font-medium">{product.sku}</p>
											</div>
											<div>
												<p className="text-muted-foreground">Unique ID</p>
												<p className="font-medium">{product.uniqid}</p>
											</div>
											<div>
												<p className="text-muted-foreground">Slug</p>
												<p className="font-medium">{product.slug}</p>
											</div>
											<div>
												<p className="text-muted-foreground">Warranty</p>
												<p className="font-medium">{product.warranty}</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Pricing Section */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<DollarSign className="size-5" />
									Pricing Details
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid md:grid-cols-4 gap-4">
									<div className="p-4 bg-stone-50 rounded-lg">
										<p className="text-sm text-muted-foreground mb-1">
											Selling Price
										</p>
										<p className="text-2xl font-bold text-green-600">
											{product.selling_price}
											{sign.tk}
										</p>
									</div>
									<div className="p-4 bg-stone-50 rounded-lg">
										<p className="text-sm text-muted-foreground mb-1">
											Original Price
										</p>
										<p className="text-xl font-semibold line-through text-muted-foreground">
											{product.original_price}
											{sign.tk}
										</p>
									</div>
									<div className="p-4 bg-stone-50 rounded-lg">
										<p className="text-sm text-muted-foreground mb-1">
											Discount ({product.discount_percentage}%)
										</p>
										<p className="text-xl font-semibold text-orange-600">
											{product.discount_price}
											{sign.tk}
										</p>
									</div>
									<div className="p-4 bg-stone-50 rounded-lg">
										<p className="text-sm text-muted-foreground mb-1">
											Commission
										</p>
										<p className="text-xl font-semibold text-blue-600">
											{product.advance_payment}
											{sign.tk}
										</p>
									</div>
								</div>

								<Separator className="my-4" />

								<div className="grid md:grid-cols-3 gap-4">
									<div>
										<p className="text-sm text-muted-foreground">
											Discount Type
										</p>
										<p className="font-medium capitalize">
											{product.discount_type}
										</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">
											Discount Rate
										</p>
										<p className="font-medium">{product.discount_rate}%</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">
											Payment Type
										</p>
										<p className="font-medium capitalize">
											{product.single_advance_payment_type}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Inventory & Stock */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Package className="size-5" />
									Inventory & Stock
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid md:grid-cols-4 gap-4">
									<div className="p-4 bg-stone-50 rounded-lg">
										<p className="text-sm text-muted-foreground mb-1">
											Available Quantity
										</p>
										<p className="text-2xl font-bold">{product.qty}</p>
									</div>
									<div className="p-4 bg-red-50 rounded-lg">
										<p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
											<AlertCircle className="size-4" />
											Alert Quantity
										</p>
										<p className="text-2xl font-bold text-red-600">
											{product.alert_qty}
										</p>
									</div>
									<div className="p-4 bg-stone-50 rounded-lg">
										<p className="text-sm text-muted-foreground mb-1">
											Warehouse ID
										</p>
										<p className="text-xl font-semibold">
											{product.warehouse_id}
										</p>
									</div>
									<div className="p-4 bg-stone-50 rounded-lg">
										<p className="text-sm text-muted-foreground mb-1">
											Supplier ID
										</p>
										<p className="text-xl font-semibold">
											{product.supplier_id}
										</p>
									</div>
								</div>

								{product.exp_date && (
									<div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
										<Calendar className="size-4 text-yellow-600" />
										<span className="text-sm">
											<span className="font-medium">Expiry Date:</span>{' '}
											{dateFormat(product.exp_date)}
										</span>
									</div>
								)}
							</CardContent>
						</Card>

						{/* Specifications */}
						{product.specifications && product.specifications.length > 0 && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Tag className="size-5" />
										Specifications
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid md:grid-cols-2 gap-4">
										{product.specifications.map((spec, index) => (
											<div key={index} className="p-3 bg-stone-50 rounded-lg">
												<p className="text-sm font-medium text-muted-foreground mb-1">
													{spec.specification}
												</p>
												<p className="font-medium">{spec.specification_ans}</p>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						)}

						{/* Tenant & Dates */}
						<Card>
							<CardHeader>
								<CardTitle>Additional Information</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid md:grid-cols-3 gap-4">
									<div>
										<p className="text-sm text-muted-foreground">Tenant Name</p>
										<p className="font-medium">{product.tenant_name}</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">Tenant ID</p>
										<p className="font-medium">{product.tenant_id}</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">Vendor ID</p>
										<p className="font-medium">{product.vendor_id}</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">Category ID</p>
										<p className="font-medium">{product.category_id}</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">
											Subcategory ID
										</p>
										<p className="font-medium">{product.subcategory_id}</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">Brand ID</p>
										<p className="font-medium">{product.brand_id}</p>
									</div>
								</div>

								<Separator className="my-4" />

								<div className="grid md:grid-cols-2 gap-4">
									<div>
										<p className="text-sm text-muted-foreground">Created At</p>
										<p className="font-medium">
											{dateFormat(product.created_at)} at{' '}
											{timeFormat(product.created_at)}
										</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">Updated At</p>
										<p className="font-medium">
											{dateFormat(product.updated_at)} at{' '}
											{timeFormat(product.updated_at)}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Delivery & Shipping Options */}
						<div className="grid md:grid-cols-2 gap-6">
							{/* Delivery Areas */}
							{cartItem.deliveryArea && cartItem.deliveryArea.length > 0 && (
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2 text-lg">
											<Truck className="size-5" />
											Delivery Areas
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											{cartItem.deliveryArea.map((area) => (
												<div
													key={area.id}
													className="flex justify-between items-center p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors"
												>
													<span className="font-medium">{area.area}</span>
													<span className="text-green-600 font-semibold">
														{area.charge}
														{sign.tk}
													</span>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							)}

							{/* Courier Services */}
							{cartItem.courier && cartItem.courier.length > 0 && (
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2 text-lg">
											<Truck className="size-5" />
											Courier Services
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											{cartItem.courier.map((courier) => (
												<div
													key={courier.id}
													className="flex justify-between items-center p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors"
												>
													<div>
														<p className="font-medium">{courier.name}</p>
														<p className="text-xs text-muted-foreground">
															Code: {courier.code}
														</p>
													</div>
													<span className="text-green-600 font-semibold">
														{courier.charge}
														{sign.tk}
													</span>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							)}
						</div>

						{/* Available Cities */}
						{cartItem.cities && cartItem.cities.length > 0 && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Tag className="size-5" />
										Available Cities
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
										{cartItem.cities.map((city) => (
											<div
												key={city.id}
												className="p-3 bg-stone-50 rounded-lg text-center hover:bg-stone-100 transition-colors"
											>
												<p className="font-medium">{city.name}</p>
												<p className="text-xs text-muted-foreground">
													{city.code}
												</p>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						)}

						{/* Additional Areas */}
						{data?.areas && data.areas.length > 0 && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Tag className="size-5" />
										More Delivery Areas
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid md:grid-cols-3 gap-3">
										{data.areas.map((area) => (
											<div
												key={area.id}
												className="flex justify-between items-center p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors"
											>
												<span className="font-medium text-sm">{area.area}</span>
												<span className="text-green-600 font-semibold text-sm">
													{area.charge}
													{sign.tk}
												</span>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						)}

						{/* Cart Item Details */}
						{product.cart_details && product.cart_details.length > 0 && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Package className="size-5" />
										Cart Item Details
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										{product.cart_details.map((detail) => (
											<div
												key={detail.id}
												className="p-4 bg-stone-50 rounded-lg border border-stone-200"
											>
												<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
													<div>
														<p className="text-muted-foreground">Cart ID</p>
														<p className="font-medium">{detail.cart_id}</p>
													</div>
													<div>
														<p className="text-muted-foreground">Quantity</p>
														<p className="font-medium">{detail.qty}</p>
													</div>
													{detail.color && (
														<div>
															<p className="text-muted-foreground">Color</p>
															<p className="font-medium">{detail.color}</p>
														</div>
													)}
													{detail.size && (
														<div>
															<p className="text-muted-foreground">Size</p>
															<p className="font-medium">{detail.size}</p>
														</div>
													)}
													{detail.variant_id && (
														<div>
															<p className="text-muted-foreground">
																Variant ID
															</p>
															<p className="font-medium">{detail.variant_id}</p>
														</div>
													)}
													{detail.unit_id && (
														<div>
															<p className="text-muted-foreground">Unit ID</p>
															<p className="font-medium">{detail.unit_id}</p>
														</div>
													)}
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						)}

						{/* Action Buttons */}
						<Card>
							<CardContent className="p-4">
								<div className="flex gap-3 flex-wrap">
									<Button size="lg" className="flex-1">
										<ShoppingCart className="size-4 mr-2" />
										Proceed to Checkout
									</Button>
									<Button variant="outline" size="lg">
										<Package className="size-4 mr-2" />
										Add More Items
									</Button>
									<Button variant="destructive" size="lg">
										Remove from Cart
									</Button>
								</div>
							</CardContent>
						</Card>
					</>
				)}
			</CardContent>
		</Container1>
	);
}
