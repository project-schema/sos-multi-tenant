'use client';

import { Button } from '@/components/ui/button';
import { alertConfirm } from '@/lib';
import { CheckCircle2, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { iAdminServiceOrder } from '../../admin/service';
import { useUserServiceOrderDeliverySuccessMutation } from './api-slice';
export function UserDeliverySuccess({ data }: { data: iAdminServiceOrder }) {
	const [mutation, { isLoading }] =
		useUserServiceOrderDeliverySuccessMutation();
	const [clicked, setClicked] = useState(false);

	const handleClick = async () => {
		if (clicked || isLoading) return;

		setClicked(true);

		alertConfirm({
			onOk: async () => {
				try {
					const res = await mutation({
						order_delivery_id: data.orderdelivery?.at(-1)?.id as number,
						service_order_id: data.id,
					}).unwrap();
					if (res.status === 200) {
						toast.success('Delivery success successfully');
					}
				} catch (err) {
					toast.error('Failed to delivery success');
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
		<Button onClick={handleClick}>
			{isLoading ? (
				<LoaderCircle className="size-4 animate-spin" />
			) : (
				<CheckCircle2 className="size-4" />
			)}
			<span>Delivery Success</span>
		</Button>
	);
}
