'use client';

import { Button } from '@/components/ui/button';
import { alertConfirm } from '@/lib';
import { LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useVendorCourierCompanyDeleteMutation } from './vendor-courier-company-api-slice';
import { iVendorCourierCompany } from './vendor-courier-company-type';

export function VendorCourierCompanyDelete({
	data,
}: {
	data: iVendorCourierCompany;
}) {
	const [mutation, { isLoading }] = useVendorCourierCompanyDeleteMutation();
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
						toast.success('Deleted successfully');
					}
				} catch (err) {
					toast.error('Failed to delete');
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
		<Button type="button" onClick={handleClick} variant="destructive">
			{isLoading ? (
				<LoaderCircle className="size-4 animate-spin" />
			) : (
				<X className="size-4" />
			)}
			<span>Delete</span>
		</Button>
	);
}
