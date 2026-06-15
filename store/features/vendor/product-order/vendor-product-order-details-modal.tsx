'use client';

import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import type { iVendorProductOrder } from './vendor-product-order-type';

export function VendorProductOrderDetailsLink({
	order,
}: {
	order: iVendorProductOrder;
}) {
	return (
		<DropdownMenuItem asChild>
			<Link
				href={`/dashboard/product-order/${order.id}`}
				className="flex w-full items-center gap-2"
			>
				<DropdownMenuShortcut className="ml-0">
					<Eye className="size-4" />
				</DropdownMenuShortcut>
				View Details
			</Link>
		</DropdownMenuItem>
	);
}
