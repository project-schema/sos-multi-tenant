'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import {
	badgeFormat,
	changeOrderStatusText,
	dateFormat,
	sign,
	timeFormat,
} from '@/lib';
import { Printer, ReceiptText } from 'lucide-react';
import { useCallback, useState } from 'react';
import type { iDropShipperProductOrder } from './product-order.type';

function parseAmount(value: string | number | null | undefined): number {
	if (value == null || value === '') return 0;
	const parsed = typeof value === 'number' ? value : parseFloat(value);
	return Number.isFinite(parsed) ? parsed : 0;
}

function orderMediaLabel(media: string) {
	if (media === 'Direct') return 'Direct';
	if (media === 'Woocommerce') return 'WooCommerce';
	return media || '—';
}

export function DropshipperProductOrderInvoiceContent({
	order,
}: {
	order: iDropShipperProductOrder;
}) {
	const variantQtyTotal =
		order.variants?.reduce(
			(sum, variant) => sum + (parseInt(variant.qty, 10) || 0),
			0,
		) ?? order.qty;

	const productAmount = parseAmount(order.product_amount);
	const commission = parseAmount(order.afi_amount);
	const deliveryCharge = parseAmount(order.delivery_charge);
	const discount = parseAmount(order.sale_discount);
	const paidAmount = parseAmount(order.paid_amount);
	const dueAmount = parseAmount(order.due_amount);
	const grandTotal = productAmount + deliveryCharge - discount;

	const customerName = order.affiliator?.name || order.name || '—';

	return (
		<div
			id="dropshipper-order-invoice-print"
			className="mx-auto max-w-4xl rounded-lg border border-border bg-background p-4 text-foreground print:border-none print:p-0"
		>
			<div className="mb-6 border-b-2 border-border pb-4">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">ORDER INVOICE</h2>
						<p className="text-lg font-semibold text-primary">
							#{order.order_id}
						</p>
						<Badge
							className="mt-2 capitalize"
							variant={badgeFormat(order.status)}
						>
							{changeOrderStatusText(order.status)}
						</Badge>
					</div>
					<div className="text-sm sm:text-right">
						<p className="text-muted-foreground">Invoice date</p>
						<p className="font-medium">
							{dateFormat(order.created_at)} · {timeFormat(order.created_at)}
						</p>
						{order.shipping_date && (
							<>
								<p className="mt-2 text-muted-foreground">Shipping date</p>
								<p className="font-medium">{dateFormat(order.shipping_date)}</p>
							</>
						)}
					</div>
				</div>
			</div>

			<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="rounded-lg border border-border p-4">
					<h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
						Merchant
					</h3>
					<p className="font-medium">{order.vendor?.name || '—'}</p>
					<p className="mt-1 text-sm text-muted-foreground">
						Order media: {orderMediaLabel(order.order_media)}
					</p>
				</div>

				<div className="rounded-lg border border-border p-4">
					<h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
						Customer / Dropshipper
					</h3>
					<p className="font-medium">{customerName}</p>
					<p className="text-sm">{order.phone || '—'}</p>
					<p className="text-sm">{order.email || '—'}</p>
					<p className="mt-1 text-sm text-muted-foreground">
						{order.address ? `${order.address}, ` : ''}
						{order.city || ''}
					</p>
				</div>
			</div>

			<div className="mb-6 overflow-x-auto">
				<table className="w-full min-w-[640px] border-collapse border border-border text-sm">
					<thead>
						<tr className="bg-muted/60">
							<th className="border border-border px-3 py-2 text-left font-semibold">
								Product
							</th>
							<th className="border border-border px-3 py-2 text-left font-semibold">
								Size
							</th>
							<th className="border border-border px-3 py-2 text-left font-semibold">
								Color
							</th>
							<th className="border border-border px-3 py-2 text-left font-semibold">
								Unit
							</th>
							<th className="border border-border px-3 py-2 text-right font-semibold">
								Qty
							</th>
						</tr>
					</thead>
					<tbody>
						{order.variants && order.variants.length > 0 ? (
							order.variants.map((variant) => (
								<tr key={variant.id}>
									<td className="border border-border px-3 py-2 font-medium">
										{order.product?.name || '—'}
									</td>
									<td className="border border-border px-3 py-2">
										{variant.size?.name || '—'}
									</td>
									<td className="border border-border px-3 py-2">
										{variant.color?.name || '—'}
									</td>
									<td className="border border-border px-3 py-2">
										{variant.unit?.unit_name || '—'}
									</td>
									<td className="border border-border px-3 py-2 text-right">
										{variant.qty}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td className="border border-border px-3 py-2 font-medium">
									{order.product?.name || '—'}
								</td>
								<td className="border border-border px-3 py-2">—</td>
								<td className="border border-border px-3 py-2">—</td>
								<td className="border border-border px-3 py-2">—</td>
								<td className="border border-border px-3 py-2 text-right">
									{variantQtyTotal}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{(order.courier_name ||
				order.consignment_id ||
				order.delivery_area ||
				order.pickup_area) && (
				<div className="mb-6 rounded-lg border border-border p-4 text-sm">
					<h3 className="mb-2 font-semibold">Delivery</h3>
					<div className="grid gap-1 sm:grid-cols-2">
						<p>
							<span className="text-muted-foreground">Courier:</span>{' '}
							{order.courier_name || '—'}
						</p>
						<p>
							<span className="text-muted-foreground">Consignment:</span>{' '}
							{order.consignment_id || '—'}
						</p>
						<p>
							<span className="text-muted-foreground">Delivery area:</span>{' '}
							{order.delivery_area || '—'}
						</p>
						<p>
							<span className="text-muted-foreground">Pickup area:</span>{' '}
							{order.pickup_area || '—'}
						</p>
					</div>
				</div>
			)}

			<div className="ml-auto w-full max-w-sm space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Product amount</span>
					<span className="font-medium">
						{productAmount.toFixed(2)} {sign.tk}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Commission</span>
					<span className="font-medium">
						{commission.toFixed(2)} {sign.tk}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Delivery charge</span>
					<span className="font-medium">
						{deliveryCharge.toFixed(2)} {sign.tk}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Discount</span>
					<span className="font-medium">
						-{discount.toFixed(2)} {sign.tk}
					</span>
				</div>
				<div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
					<span>Grand total</span>
					<span>
						{grandTotal.toFixed(2)} {sign.tk}
					</span>
				</div>
				<div className="flex justify-between text-emerald-600">
					<span>Paid</span>
					<span className="font-medium">
						{paidAmount.toFixed(2)} {sign.tk}
					</span>
				</div>
				<div className="flex justify-between text-amber-600">
					<span>Due</span>
					<span className="font-medium">
						{dueAmount.toFixed(2)} {sign.tk}
					</span>
				</div>
			</div>

			{order.additional_note && (
				<div className="mt-6 rounded-lg border border-border bg-muted/30 p-4 text-sm">
					<p className="mb-1 font-medium">Note</p>
					<p className="whitespace-pre-wrap text-muted-foreground">
						{order.additional_note}
					</p>
				</div>
			)}
		</div>
	);
}

export function DropshipperProductOrderInvoiceModal({
	order,
}: {
	order: iDropShipperProductOrder;
}) {
	const [open, setOpen] = useState(false);

	const handlePrint = useCallback(() => {
		window.print();
	}, []);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem
				variant="default"
				asChild
				onSelect={(event) => event.preventDefault()}
			>
				<DialogTrigger className="flex w-full items-center gap-2">
					<DropdownMenuShortcut className="ml-0">
						<ReceiptText className="size-4" />
					</DropdownMenuShortcut>
					Preview Invoice
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent className="flex max-h-[92vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
				<DialogHeader className="flex-row items-center justify-between space-y-0 border-b px-6 py-4">
					<div>
						<DialogTitle>Order Invoice</DialogTitle>
						<DialogDescription>
							Preview invoice for order #{order.order_id}
						</DialogDescription>
					</div>
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="mr-8 shrink-0 print:hidden"
						onClick={handlePrint}
					>
						<Printer className="size-4" aria-hidden="true" />
						Print
					</Button>
				</DialogHeader>

				<div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
					<DropshipperProductOrderInvoiceContent order={order} />
				</div>
			</DialogContent>
		</Dialog>
	);
}
