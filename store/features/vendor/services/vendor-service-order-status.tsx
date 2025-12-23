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
import { iAdminServiceOrder } from '../../admin/service';
import { useVendorServiceOrderStatusUpdateMutation } from './vendor-services-api-slice';

export function VendorServiceOrderStatus({
	data,
	status,
	text,
	icon,
	type,
}: {
	data: iAdminServiceOrder;
	status: iAdminServiceOrder['status'];
	text: string;
	icon: string;
	type?: 'default' | 'destructive';
}) {
	const [mutation, { isLoading }] = useVendorServiceOrderStatusUpdateMutation();
	const [clicked, setClicked] = useState(false);

	const handleClick = async () => {
		if (clicked || isLoading) return;

		setClicked(true);

		alertConfirm({
			onOk: async () => {
				try {
					const res = await mutation({
						service_order_id: data.id,
						status,
					}).unwrap();
					if (res.status === 200) {
						toast.success(res.message || 'Status updated');
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
					<LoaderCircle
						className={`size-4 animate-spin ${
							type === 'destructive' ? 'text-destructive' : ''
						}`}
					/>
				) : (
					<DynamicIcon
						icon={icon}
						className={`size-4 ${
							type === 'destructive' ? 'text-destructive' : ''
						}`}
					/>
				)}
			</DropdownMenuShortcut>
			{text}
		</DropdownMenuItem>
	);
}
