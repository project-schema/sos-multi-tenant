'use client';

import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { alertConfirm } from '@/lib';
import { useAdminCancelServiceOrderRequestMutation } from './service-order.api.slice';
import { iAdminServiceOrder } from './service-order.type';

export function AdminServiceOrderStatusCancel({
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
						status: '0',
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
		>
			<DropdownMenuShortcut className="ml-0">
				{isLoading ? (
					<LoaderCircle className={`size-4 animate-spin`} />
				) : (
					<X className={`size-4`} />
				)}
			</DropdownMenuShortcut>
			Cancel Reject Status
		</DropdownMenuItem>
	);
}
