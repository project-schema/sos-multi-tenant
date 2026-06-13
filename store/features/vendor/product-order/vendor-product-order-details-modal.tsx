'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	badgeFormat,
	changeOrderStatusText,
	dateFormat,
	sign,
	timeFormat,
} from '@/lib';
import { cn } from '@/lib/utils';
import { Eye, Package } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { VendorProductOrderStatusDropdown } from './vendor-product-order-status-menu';
import type { iVendorProductOrder } from './vendor-product-order-type';

function InfoCard({
	title,
	children,
	className,
}: {
	title: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<Card className={cn('shadow-none gap-0', className)}>
			<CardHeader className="  pb-0">
				<CardTitle className="xl:text-xs font-semibold">{title}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-0 pt-4">{children}</CardContent>
		</Card>
	);
}

function InfoRow({ label, value }: { label: string; value: ReactNode }) {
	return (
		<div className="grid grid-cols-[minmax(0,120px)_1fr] gap-x-3 gap-y-1 py-2 text-sm">
			<span className="text-muted-foreground">{label}</span>
			<span className="font-medium break-words">{value ?? '—'}</span>
		</div>
	);
}

function TimestampTag({ label, value }: { label: string; value: string }) {
	return (
		<span className="inline-flex items-center rounded-md border bg-muted/30 px-3 py-1 text-xs text-muted-foreground">
			<span className="font-medium text-foreground">{label}:</span>
			<span className="ml-1.5">{value}</span>
		</span>
	);
}

function orderMediaLabel(media: string) {
	if (media === 'Direct') return 'Direct';
	if (media === 'Woocommerce') return 'WooCommerce';
	return media || '—';
}

function formatAmount(value: number | string | null | undefined) {
	if (value == null || value === '') return `0 ${sign.tk}`;
	return `${value} ${sign.tk}`;
}

export function VendorProductOrderDetailsModal({
	order,
}: {
	order: iVendorProductOrder;
}) {
	const [open, setOpen] = useState(false);

	const variantQtyTotal =
		order.variants?.reduce((sum, v) => sum + (parseInt(v.qty, 10) || 0), 0) ??
		order.qty;

	const customerName = order.affiliator?.name
		? `${order.affiliator.name} (Dropshipper)`
		: order.name || '—';

	const shippingAddress = [order.name, order.address, order.city]
		.filter(Boolean)
		.join('\n');

	const subtotal = Number(order.product_amount) || 0;
	const deliveryCharge = Number(order.delivery_charge) || 0;
	const discount = Number(order.sale_discount) || 0;
	const total = subtotal + deliveryCharge - discount;

	const lineItems =
		order.variants && order.variants.length > 0
			? order.variants.map((variant) => ({
					id: variant.id,
					name: order.product?.name,
					sku: variant.variant_id || '—',
					location: variant.unit?.unit_name || order.unit?.unit_name || '—',
					qty: variant.qty,
					price: order.product_amount,
					size: variant.size?.name,
					color: variant.color?.name,
			  }))
			: [
					{
						id: order.id,
						name: order.product?.name,
						sku: '—',
						location: order.unit?.unit_name || '—',
						qty: String(variantQtyTotal),
						price: order.product_amount,
						size: order.size?.name,
						color: null as string | null | undefined,
					},
			  ];

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem
				variant="default"
				asChild
				onSelect={(e) => e.preventDefault()}
			>
				<DialogTrigger className="flex w-full items-center gap-2">
					<DropdownMenuShortcut className="ml-0">
						<Eye className="size-4" />
					</DropdownMenuShortcut>
					View Details
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent className="bg-white flex max-h-[92vh] flex-col gap-0 overflow-hidden   p-0 sm:max-w-[1100px]">
				<DialogHeader className="space-y-0 border-b bg-background px-6 py-5">
					<div className="flex flex-wrap items-start justify-between gap-4 pr-8">
						<div className="space-y-3">
							<div>
								<p className="text-xs text-muted-foreground">
									Order / Order details
								</p>
								<DialogTitle className="text-2xl font-semibold tracking-tight">
									Order #{order.order_id}
								</DialogTitle>
								<DialogDescription className="sr-only">
									Order details for order {order.order_id}
								</DialogDescription>
							</div>
							<div className="flex flex-wrap gap-2">
								<TimestampTag
									label="Paid on"
									value={
										order.paid_amount && Number(order.paid_amount) > 0
											? `${dateFormat(order.updated_at)} ${timeFormat(
													order.updated_at
											  )}`
											: 'Not paid'
									}
								/>
								<TimestampTag
									label="Placed on"
									value={`${dateFormat(order.created_at)} ${timeFormat(
										order.created_at
									)}`}
								/>
								<TimestampTag
									label="Updated"
									value={`${dateFormat(order.updated_at)} ${timeFormat(
										order.updated_at
									)}`}
								/>
							</div>
						</div>
						<div className="flex flex-col items-end gap-2">
							<VendorProductOrderStatusDropdown data={order} />
							{order.last_status && order.last_status !== order.status && (
								<p className="text-xs text-muted-foreground">
									Previous:{' '}
									<span className="font-medium capitalize">
										{changeOrderStatusText(order.last_status)}
									</span>
								</p>
							)}
						</div>
					</div>
				</DialogHeader>

				<div className="flex-1 space-y-4 overflow-y-auto px-6 py-5 ">
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
						<InfoCard title="Customer & Order">
							<InfoRow label="Name" value={customerName} />
							<InfoRow label="Email" value={order.email} />
							<InfoRow label="Phone" value={order.phone} />
							<InfoRow
								label="Order media"
								value={orderMediaLabel(order.order_media)}
							/>
							<InfoRow
								label="Status"
								value={
									<Badge
										className="capitalize"
										variant={badgeFormat(order.status)}
									>
										{changeOrderStatusText(order.status)}
									</Badge>
								}
							/>
							<InfoRow label="Courier" value={order.courier_name} />
							{order.wc_order_no && (
								<InfoRow label="WC Order No." value={order.wc_order_no} />
							)}
						</InfoCard>

						<InfoCard title="Shipping Address">
							<p className="whitespace-pre-wrap text-sm font-medium leading-6">
								{shippingAddress || '—'}
							</p>
							<Separator className="my-3" />
							<InfoRow label="Delivery area" value={order.delivery_area} />
							<InfoRow label="Pickup area" value={order.pickup_area} />
							<InfoRow label="Consignment ID" value={order.consignment_id} />
							<InfoRow
								label="Shipping date"
								value={
									order.shipping_date ? dateFormat(order.shipping_date) : null
								}
							/>
						</InfoCard>

						<InfoCard title="Payment & Delivery">
							<InfoRow label="Delivery ID" value={order.delivery_id} />
							<InfoRow
								label="Product amount"
								value={formatAmount(order.product_amount)}
							/>
							<InfoRow
								label="Commission"
								value={formatAmount(Number(order.afi_amount) || 0)}
							/>
							<InfoRow
								label="Delivery charge"
								value={formatAmount(order.delivery_charge)}
							/>
							<InfoRow
								label="Discount"
								value={formatAmount(order.sale_discount)}
							/>
							<Separator className="my-2" />
							<InfoRow
								label="Paid"
								value={
									<span className="text-emerald-600">
										{formatAmount(order.paid_amount)}
									</span>
								}
							/>
							<InfoRow
								label="Due"
								value={
									<span className="text-amber-600">
										{formatAmount(order.due_amount)}
									</span>
								}
							/>
						</InfoCard>
					</div>

					<Card className="shadow-none">
						<CardHeader className="border-b pb-3">
							<CardTitle className="text-sm font-semibold">
								Items ordered
							</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<div className="overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow className="bg-muted/40 hover:bg-muted/40">
											<TableHead className="text-xs uppercase">
												Item name
											</TableHead>
											<TableHead className="text-xs uppercase">SKU</TableHead>
											<TableHead className="text-xs uppercase">
												Location
											</TableHead>
											<TableHead className="text-xs uppercase">
												Variant
											</TableHead>
											<TableHead className="text-right text-xs uppercase">
												Quantity
											</TableHead>
											<TableHead className="text-right text-xs uppercase">
												Price
											</TableHead>
											<TableHead className="text-right text-xs uppercase">
												Total
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{lineItems.map((item) => {
											const qty = parseInt(item.qty, 10) || 0;
											const unitPrice = Number(item.price) || 0;
											const lineTotal = unitPrice * (qty || 1);

											return (
												<TableRow key={item.id}>
													<TableCell>
														<div className="flex items-center gap-3">
															<div className="flex size-10 shrink-0 items-center justify-center rounded-md border bg-muted/40">
																<Package className="size-4 text-muted-foreground" />
															</div>
															<span className="font-medium">{item.name}</span>
														</div>
													</TableCell>
													<TableCell>{item.sku}</TableCell>
													<TableCell>{item.location}</TableCell>
													<TableCell>
														{[item.size, item.color]
															.filter(Boolean)
															.join(' / ') || '—'}
													</TableCell>
													<TableCell className="text-right">
														{item.qty}
													</TableCell>
													<TableCell className="text-right">
														{formatAmount(unitPrice)}
													</TableCell>
													<TableCell className="text-right font-medium">
														{formatAmount(lineTotal)}
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</div>

							<div className="flex flex-col gap-4 border-t bg-muted/10 px-6 py-4 sm:flex-row sm:items-start sm:justify-between">
								<p className="text-xs text-muted-foreground opacity-0">
									Currency: {sign.tk}
								</p>
								<div className="min-w-[260px] space-y-2 text-sm">
									<div className="flex items-center justify-between gap-6">
										<span className="text-muted-foreground">Subtotal</span>
										<span>{formatAmount(subtotal)}</span>
									</div>
									<div className="flex items-center justify-between gap-6">
										<span className="text-muted-foreground">
											Shipping handling
										</span>
										<span>{formatAmount(deliveryCharge)}</span>
									</div>
									<div className="flex items-center justify-between gap-6">
										<span className="text-muted-foreground">Discount</span>
										<span>- {formatAmount(discount)}</span>
									</div>
									<Separator />
									<div className="flex items-center justify-between gap-6 text-base font-semibold">
										<span>Total</span>
										<span>{formatAmount(total)}</span>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{(order.additional_note || order.internal_note || order.reason) && (
						<Card className="shadow-none">
							<CardHeader className="border-b pb-3">
								<CardTitle className="text-sm font-semibold">Notes</CardTitle>
							</CardHeader>
							<CardContent className="grid gap-4 pt-4 md:grid-cols-3">
								{order.additional_note && (
									<div>
										<p className="mb-2 text-xs text-muted-foreground">
											Additional note
										</p>
										<p className="rounded-md border bg-background p-3 text-sm whitespace-pre-wrap">
											{order.additional_note}
										</p>
									</div>
								)}
								{order.internal_note && (
									<div>
										<p className="mb-2 text-xs text-muted-foreground">
											Internal note
										</p>
										<p className="rounded-md border bg-background p-3 text-sm whitespace-pre-wrap">
											{order.internal_note}
										</p>
									</div>
								)}
								{order.reason && (
									<div>
										<p className="mb-2 text-xs text-muted-foreground">
											Cancel / return reason
										</p>
										<p className="rounded-md border bg-background p-3 text-sm whitespace-pre-wrap">
											{order.reason}
										</p>
									</div>
								)}
							</CardContent>
						</Card>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
