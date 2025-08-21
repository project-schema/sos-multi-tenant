'use client';

import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { LoaderCircle, PackageCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { alertConfirm } from '@/lib';
import { useVendorPurchaseStatusMutation } from './vendor-purchase-api-slice';
import { iVendorPurchase } from './vendor-purchase-type';

export function VendorPurchaseStatusReceive({
	data,
}: {
	data: iVendorPurchase;
}) {
	const [mutation, { isLoading }] = useVendorPurchaseStatusMutation();
	const [clicked, setClicked] = useState(false);

	const handleClick = async () => {
		if (clicked || isLoading) return;

		setClicked(true);

		alertConfirm({
			onOk: async () => {
				try {
					const res = await mutation({
						id: data.id,
					}).unwrap();
					if (res.status === 200) {
						toast.success(res.message || 'Status updated to received');
					}
				} catch (err) {
					toast.error('Failed to update status');
				} finally {
					setClicked(false);
				}
			},
			onCancel: () => {
				setClicked(false);
			},
		});
	};

	return (
		<DropdownMenuItem
			onSelect={(e) => {
				e.preventDefault();
				handleClick();
			}}
			disabled={isLoading || clicked}
			className="flex items-center gap-2"
		>
			<DropdownMenuShortcut className="ml-0">
				{isLoading ? (
					<LoaderCircle className="size-4 animate-spin" />
				) : (
					<PackageCheck className="size-4" />
				)}
			</DropdownMenuShortcut>
			Purchase Receive
		</DropdownMenuItem>
	);
}
