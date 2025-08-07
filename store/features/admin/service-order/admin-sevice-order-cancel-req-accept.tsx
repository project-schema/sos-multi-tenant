'use client';

import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Check, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { alertConfirm } from '@/lib';
import { useAdminCancelServiceOrderRequestMutation } from './service-order.api.slice';
import { iAdminServiceOrder } from './service-order.type';

export function AdminServiceOrderStatusAccept({
	data,
}: {
	data: iAdminServiceOrder;
}) {
	const [mutation, { isLoading }] = useAdminCancelServiceOrderRequestMutation();
	const [clicked, setClicked] = useState(false);

	const handleClick = async () => {
		if (clicked || isLoading) return;

		setClicked(true);

		alertConfirm({
			onOk: async () => {
				try {
					const res = await mutation({
						service_order_id: data.id,
						status: '1',
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
			disabled={isLoading || clicked}
			className="flex items-center gap-2"
			variant="destructive"
		>
			<DropdownMenuShortcut className="ml-0">
				{isLoading ? (
					<LoaderCircle className={`size-4 animate-spin`} />
				) : (
					<Check className={`size-4 text-destructive`} />
				)}
			</DropdownMenuShortcut>
			Accept Reject Status
		</DropdownMenuItem>
	);
}
