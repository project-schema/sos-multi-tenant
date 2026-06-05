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
import {
	Eye,
	MapPin,
	Package,
	Receipt,
	Truck,
	User,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import type { iVendorProductOrder } from './vendor-product-order-type';

function DetailRow({
	label,
	value,
	className,
}: {
	label: string;
	value: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				'grid grid-cols-[minmax(0,140px)_1fr] gap-x-4 gap-y-1 py-2.5 text-sm',
				className,
			)}
		>
			<span className="text-muted-foreground">{label}</span>
			<span className="font-medium break-words">{value ?? '—'}</span>
		</div>
	);
}

function orderMediaLabel(media: string) {
	if (media === 'Direct') return 'Direct';
	if (media === 'Woocommerce') return 'WooCommerce';
	return media || '—';
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

	const customerLabel = order.affiliator?.name
		? `Dropshipper: ${order.affiliator.name}`
		: order.name || '—';

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

			<DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
				<DialogHeader className="space-y-3 border-b px-6 py-5">
					<div className="flex flex-wrap items-start justify-between gap-3 pr-8">
						<div>
							<DialogTitle className="text-xl">
								Order #{order.order_id}
							</DialogTitle>
							<DialogDescription className="mt-1">
								Placed on {dateFormat(order.created_at)} at{' '}
								{timeFormat(order.created_at)}
							</DialogDescription>
						</div>
						<Badge
							className="capitalize"
							variant={badgeFormat(order.status)}
						>
							{changeOrderStatusText(order.status)}
						</Badge>
					</div>
					{order.last_status && order.last_status !== order.status && (
						<p className="text-xs text-muted-foreground">
							Previous status:{' '}
							<span className="capitalize font-medium">
								{changeOrderStatusText(order.last_status)}
							</span>
						</p>
					)}
				</DialogHeader>

				<div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
					<Card className="shadow-none">
						<CardHeader className="pb-3">
							<CardTitle className="flex items-center gap-2 text-base">
								<Package className="size-4" />
								Product &amp; Order
							</CardTitle>
						</CardHeader>
						<CardContent className="pt-0">
							<DetailRow label="Product" value={order.product?.name} />
							<DetailRow
								label="Order media"
								value={
									<Badge
										variant={badgeFormat(order.order_media)}
										className="capitalize"
									>
										{orderMediaLabel(order.order_media)}
									</Badge>
								}
							/>
							<DetailRow label="Quantity" value={variantQtyTotal} />
							{order.size?.name && (
								<DetailRow label="Size" value={order.size.name} />
							)}
							{order.unit?.unit_name && (
								<DetailRow label="Unit" value={order.unit.unit_name} />
							)}
							{order.wc_order_no && (
								<DetailRow label="WC Order No." value={order.wc_order_no} />
							)}
						</CardContent>
					</Card>

					{order.variants && order.variants.length > 0 && (
						<Card className="shadow-none">
							<CardHeader className="pb-3">
								<CardTitle className="text-base">Variants</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<div className="rounded-md border">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Size</TableHead>
												<TableHead>Color</TableHead>
												<TableHead>Unit</TableHead>
												<TableHead className="text-right">Qty</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{order.variants.map((variant) => (
												<TableRow key={variant.id}>
													<TableCell>{variant.size?.name || '—'}</TableCell>
													<TableCell>{variant.color?.name || '—'}</TableCell>
													<TableCell>
														{variant.unit?.unit_name || '—'}
													</TableCell>
													<TableCell className="text-right">
														{variant.qty}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</CardContent>
						</Card>
					)}

					<Card className="shadow-none">
						<CardHeader className="pb-3">
							<CardTitle className="flex items-center gap-2 text-base">
								<User className="size-4" />
								Customer / Dropshipper
							</CardTitle>
						</CardHeader>
						<CardContent className="pt-0">
							<DetailRow label="Name" value={customerLabel} />
							<DetailRow label="Phone" value={order.phone} />
							<DetailRow label="Email" value={order.email} />
							<DetailRow label="City" value={order.city} />
							<DetailRow label="Address" value={order.address} />
						</CardContent>
					</Card>

					<Card className="shadow-none">
						<CardHeader className="pb-3">
							<CardTitle className="flex items-center gap-2 text-base">
								<Truck className="size-4" />
								Delivery
							</CardTitle>
						</CardHeader>
						<CardContent className="pt-0">
							<DetailRow label="Courier" value={order.courier_name} />
							<DetailRow label="Consignment ID" value={order.consignment_id} />
							<DetailRow label="Delivery area" value={order.delivery_area} />
							<DetailRow label="Pickup area" value={order.pickup_area} />
							<DetailRow
								label="Shipping date"
								value={
									order.shipping_date
										? dateFormat(order.shipping_date)
										: null
								}
							/>
							<DetailRow label="Delivery ID" value={order.delivery_id} />
						</CardContent>
					</Card>

					<Card className="shadow-none">
						<CardHeader className="pb-3">
							<CardTitle className="flex items-center gap-2 text-base">
								<Receipt className="size-4" />
								Payment
							</CardTitle>
						</CardHeader>
						<CardContent className="pt-0">
							<DetailRow
								label="Product amount"
								value={
									<>
										{order.product_amount ?? '0'} {sign.tk}
									</>
								}
							/>
							<DetailRow
								label="Commission"
								value={
									<>
										{Number(order.afi_amount) || 0} {sign.tk}
									</>
								}
							/>
							<DetailRow
								label="Delivery charge"
								value={
									<>
										{order.delivery_charge || '0'} {sign.tk}
									</>
								}
							/>
							<DetailRow
								label="Discount"
								value={
									<>
										{order.sale_discount || '0'} {sign.tk}
									</>
								}
							/>
							<Separator className="my-2" />
							<DetailRow
								label="Paid"
								value={
									<span className="text-emerald-600">
										{order.paid_amount || '0'} {sign.tk}
									</span>
								}
							/>
							<DetailRow
								label="Due"
								value={
									<span className="text-amber-600">
										{order.due_amount || '0'} {sign.tk}
									</span>
								}
							/>
							{order.totaladvancepayment != null && (
								<DetailRow
									label="Advance payment"
									value={
										<>
											{order.totaladvancepayment} {sign.tk}
										</>
									}
								/>
							)}
						</CardContent>
					</Card>

					{(order.additional_note ||
						order.internal_note ||
						order.reason) && (
						<Card className="shadow-none">
							<CardHeader className="pb-3">
								<CardTitle className="flex items-center gap-2 text-base">
									<MapPin className="size-4" />
									Notes
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3 pt-0">
								{order.additional_note && (
									<div>
										<p className="mb-1 text-xs text-muted-foreground">
											Additional note
										</p>
										<p className="rounded-md border bg-muted/40 p-3 text-sm whitespace-pre-wrap">
											{order.additional_note}
										</p>
									</div>
								)}
								{order.internal_note && (
									<div>
										<p className="mb-1 text-xs text-muted-foreground">
											Internal note
										</p>
										<p className="rounded-md border bg-muted/40 p-3 text-sm whitespace-pre-wrap">
											{order.internal_note}
										</p>
									</div>
								)}
								{order.reason && (
									<div>
										<p className="mb-1 text-xs text-muted-foreground">
											Cancel / return reason
										</p>
										<p className="rounded-md border bg-muted/40 p-3 text-sm whitespace-pre-wrap">
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
