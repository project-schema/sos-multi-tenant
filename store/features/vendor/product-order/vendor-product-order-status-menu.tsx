'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { badgeFormat, changeOrderStatusText } from '@/lib';
import { ChevronDown } from 'lucide-react';
import { VendorProductOrderStatus } from './vendor-product-order-status';
import { VendorProductOrderStatusCancel } from './vendor-product-order-status-cancel';
import type { iVendorProductOrder } from './vendor-product-order-type';

export function VendorProductOrderStatusMenuItems({
	data,
}: {
	data: iVendorProductOrder;
}) {
	return (
		<>
			{data?.status === 'hold' && (
				<VendorProductOrderStatus
					data={data}
					icon="Clock"
					status="pending"
					text="Order Pending"
				/>
			)}
			{data?.status === 'pending' && (
				<VendorProductOrderStatus
					data={data}
					icon="PackageCheck"
					status="received"
					text="Order Received"
				/>
			)}
			{data?.status === 'received' && (
				<VendorProductOrderStatus
					data={data}
					icon="PackageSearch"
					status="processing"
					text="Product Processing"
				/>
			)}
			{data?.status === 'processing' && (
				<VendorProductOrderStatus
					data={data}
					icon="Box"
					status="ready"
					text="Product Ready"
				/>
			)}
			{!['hold', 'pending', 'progress', 'cancel', 'delivered'].includes(
				data?.status
			) && (
				<VendorProductOrderStatus
					data={data}
					icon="Truck"
					status="progress"
					text="Delivery Processing"
				/>
			)}
			{['ready', 'processing', 'received', 'pending', 'hold'].includes(
				data?.status
			) && <VendorProductOrderStatusCancel data={data} />}
			{data?.status === 'progress' && (
				<>
					<VendorProductOrderStatus
						data={data}
						icon="CheckCircle2"
						status="delivered"
						text="Product Delivered"
					/>
					<VendorProductOrderStatus
						data={data}
						icon="RotateCcw"
						status="return"
						text="Product Return"
					/>
				</>
			)}
		</>
	);
}

export function VendorProductOrderStatusDropdown({
	data,
}: {
	data: iVendorProductOrder;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="data-[state=open]:bg-muted h-auto gap-2 px-3 py-1.5"
				>
					<Badge
						className="capitalize pointer-events-none"
						variant={badgeFormat(data.status)}
					>
						{changeOrderStatusText(data.status)}
					</Badge>
					<ChevronDown className="size-4 text-muted-foreground" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<VendorProductOrderStatusMenuItems data={data} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
