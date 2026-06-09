'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
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
import { Package, Receipt, Star, Truck, User } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { OrderReviewForm } from './order-review-form';
import type { iOrder } from './type';
import { canReviewOrder } from './type';

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
				className
			)}
		>
			<span className="text-muted-foreground">{label}</span>
			<span className="font-medium break-words">{value ?? '—'}</span>
		</div>
	);
}

function formatAmount(value: number | string | undefined) {
	if (value == null || value === '') return '0';
	return `${value} ${sign.tk}`;
}

export function OrderDetailsModal({ order }: { order: iOrder }) {
	const [open, setOpen] = useState(false);

	const variantQtyTotal =
		order?.variants?.reduce(
			(sum, variant) => sum + (parseInt(variant.qty, 10) || 0),
			0
		) ?? 0;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					Details
				</Button>
			</DialogTrigger>

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
						<Badge className="capitalize" variant={badgeFormat(order.status)}>
							{changeOrderStatusText(order.status)}
						</Badge>
					</div>
				</DialogHeader>

				<div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
					<Card className="shadow-none">
						<CardHeader className="pb-3">
							<CardTitle className="flex items-center gap-2 text-base">
								<Package className="size-4" />
								Product
							</CardTitle>
						</CardHeader>
						<CardContent className="pt-0">
							<DetailRow label="Product" value={order.product?.name} />
							<DetailRow label="Items" value={variantQtyTotal || '—'} />
							{order.order_media && (
								<DetailRow
									label="Order media"
									value={
										<Badge variant="outline" className="capitalize">
											{order.order_media}
										</Badge>
									}
								/>
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
								Customer
							</CardTitle>
						</CardHeader>
						<CardContent className="pt-0">
							<DetailRow label="Name" value={order.name} />
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
									order.shipping_date ? dateFormat(order.shipping_date) : null
								}
							/>
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
								value={formatAmount(order.product_amount)}
							/>
							<DetailRow
								label="Delivery charge"
								value={formatAmount(order.delivery_charge)}
							/>
							<DetailRow
								label="Discount"
								value={formatAmount(order.sale_discount)}
							/>
							<Separator className="my-2" />
							<DetailRow
								label="Paid"
								value={
									<span className="text-emerald-600">
										{formatAmount(order.paid_amount)}
									</span>
								}
							/>
							<DetailRow
								label="Due"
								value={
									<span className="text-amber-600">
										{formatAmount(order.due_amount)}
									</span>
								}
							/>
							{order.payment_status && (
								<DetailRow
									label="Payment status"
									value={
										<Badge variant="outline" className="capitalize">
											{order.payment_status}
										</Badge>
									}
								/>
							)}
						</CardContent>
					</Card>

					{order.additional_note && (
						<Card className="shadow-none">
							<CardHeader className="pb-3">
								<CardTitle className="text-base">Notes</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<p className="rounded-md border bg-muted/40 p-3 text-sm whitespace-pre-wrap">
									{order.additional_note}
								</p>
							</CardContent>
						</Card>
					)}

					<div>
						<div className="mb-3 flex items-center gap-2">
							<Star className="size-4 text-yellow-500" />
							<h3 className="text-base font-semibold">Product Review</h3>
						</div>
						<OrderReviewForm order={order} onSubmitted={() => setOpen(false)} />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export function OrderReviewButton({ order }: { order: iOrder }) {
	const [open, setOpen] = useState(false);

	if (!canReviewOrder(order)) return null;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="default" size="sm">
					<Star className="size-4" />
					Review
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Review Order #{order.order_id}</DialogTitle>
					<DialogDescription>
						{order.product?.name || 'Share your product experience'}
					</DialogDescription>
				</DialogHeader>
				<OrderReviewForm order={order} onSubmitted={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	);
}
