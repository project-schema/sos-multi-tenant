'use client';

import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { alertConfirm } from '@/lib';
import { DynamicIcon } from '@/lib/icon/dynamic-icon';
import { useVendorProductOrderUpdateMutation } from './vendor-product-order-api-slice';

export function VendorProductOrderStatus({
	data,
	status,
	text,
	icon,
	type,
}: {
	data: any;
	status: any;
	text: string;
	icon: string;
	type?: 'default' | 'destructive';
}) {
	const [mutation, { isLoading }] = useVendorProductOrderUpdateMutation();
	const [clicked, setClicked] = useState(false);

	const handleClick = async () => {
		if (clicked || isLoading) return;

		setClicked(true);

		alertConfirm({
			onOk: async () => {
				try {
					const res = await mutation({
						id: data.id,
						status,
					}).unwrap();
					const errorResponse = res as any;
					if (res.status === 200) {
						toast.success(res.message || 'Status updated');
					} else {
						if (errorResponse?.message === 'Validation errors') {
							toast.error(
								errorResponse.data.status.toString() ||
									'Failed to update status',
							);
						}
						if (errorResponse.data.delivery_id) {
							toast.error(
								errorResponse.data.delivery_id.toString() ||
									'Failed to update status',
							);
						} else {
							toast.error(res.message || 'Failed to update status');
						}
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
			variant={type || 'default'}
			disabled={isLoading || clicked}
			className="flex items-center gap-2"
		>
			<DropdownMenuShortcut className="ml-0">
				{isLoading ? (
					<LoaderCircle className="size-4 animate-spin" />
				) : (
					<DynamicIcon icon={icon} className="size-4" />
				)}
			</DropdownMenuShortcut>
			{text}
		</DropdownMenuItem>
	);
}
