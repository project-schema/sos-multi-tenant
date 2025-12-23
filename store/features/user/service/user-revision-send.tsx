'use client';

import { Button } from '@/components/ui/button';
import { alertConfirm } from '@/lib';
import { LoaderCircle, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { iAdminServiceOrder } from '../../admin/service';
import { useUserServiceOrderRevisionRequestMutation } from './api-slice';
export function UserRevisionSend({ data }: { data: iAdminServiceOrder }) {
	const [mutation, { isLoading }] =
		useUserServiceOrderRevisionRequestMutation();
	const [clicked, setClicked] = useState(false);

	const handleClick = async () => {
		if (clicked || isLoading) return;

		setClicked(true);
		const lastDelivery = data?.orderdelivery?.at(-1);

		alertConfirm({
			onOk: async () => {
				try {
					const res = await mutation({
						service_order_id: data.id,
						order_delivery_id: lastDelivery?.id as number,
					}).unwrap();
					if (res.status === 200) {
						toast.success('Revision request sent successfully');
					}
				} catch (err) {
					toast.error('Failed to send revision request');
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
		<Button variant="outline" onClick={handleClick}>
			{isLoading ? (
				<LoaderCircle className="size-4 animate-spin" />
			) : (
				<RotateCcw className="size-4" />
			)}
			<span>Send Revision Request</span>
		</Button>
	);
}
