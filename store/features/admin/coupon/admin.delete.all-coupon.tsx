'use client';

import { Button } from '@/components/ui/button';
import { alertConfirm } from '@/lib';
import { toast } from 'sonner';
import { useAdminDeleteCouponMutation } from './admin.coupon.api.slice';
import { iAdminCoupon } from './admin.coupon.type';

export function AdminDeleteAllCoupons({
	coupons,
}: {
	coupons: iAdminCoupon[];
}) {
	const [deleteCoupon, { isLoading }] = useAdminDeleteCouponMutation();

	const handleDeleteAll = async () => {
		alertConfirm({
			onOk: async () => {
				try {
					await Promise.all(
						coupons.map((coupon) => deleteCoupon({ id: coupon.id }).unwrap()),
					);

					toast.success('All coupons deleted successfully');
				} catch (error) {
					toast.error('Some coupons failed to delete');
				}
			},
		});
	};

	return (
		<Button
			variant="destructive"
			onClick={handleDeleteAll}
			disabled={isLoading || coupons.length === 0}
		>
			Delete All
		</Button>
	);
}
