'use client';
import { Button } from '@/components/ui/button';

import { alertConfirm } from '@/lib';
import { LoaderCircle, SquareCheckBig, SquareX } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useVendorCourierCompanyStatusMutation } from './vendor-courier-company-api-slice';
import { iVendorCourierCompany } from './vendor-courier-company-type';

export function VendorCourierCompanyStatusChange({
	data,
}: {
	data: iVendorCourierCompany;
}) {
	const [mutation, { isLoading }] = useVendorCourierCompanyStatusMutation();
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
						toast.success(res?.message || 'Status changed successfully');
					} else {
						toast.error(res?.message || 'Failed to change status');
					}
				} catch (err) {
					toast.error('Failed to change status');
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
		<Button
			type="button"
			onClick={handleClick}
			variant={data.status !== 'active' ? 'destructive' : 'default'}
		>
			{isLoading ? (
				<LoaderCircle className="size-4 animate-spin" />
			) : data.status !== 'active' ? (
				<SquareX className="size-4" />
			) : (
				<SquareCheckBig className="size-4" />
			)}
			<span>{data.status !== 'active' ? 'Inactive' : 'Active'}</span>
		</Button>
	);
}
