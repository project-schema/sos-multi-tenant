'use client';
import { Button } from '@/components/ui/button';

import { alertConfirm } from '@/lib';
import { Check, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useVendorCourierCompanyDefaultMutation } from './vendor-courier-company-api-slice';
import { iVendorCourierCompany } from './vendor-courier-company-type';

export function VendorCourierCompanySetDefault({
	data,
}: {
	data: iVendorCourierCompany;
}) {
	const [mutation, { isLoading }] = useVendorCourierCompanyDefaultMutation();
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
						toast.success('Set default successfully');
					}
				} catch (err) {
					toast.error('Failed to set default');
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
		<Button type="button" onClick={handleClick} variant="outline">
			{isLoading ? (
				<LoaderCircle className="size-4 animate-spin" />
			) : (
				<Check className="size-4" />
			)}
			<span>Set Default</span>
		</Button>
	);
}
