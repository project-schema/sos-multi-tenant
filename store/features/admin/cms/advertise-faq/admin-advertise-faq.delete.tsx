'use client';

import { Button } from '@/components/ui/button';
import { alertConfirm } from '@/lib';
import { LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAdminDeleteAdvertiseFaqMutation } from './admin-advertise-faq.api.slice';
import { iAdvertiseFaq } from './admin-advertise-faq.type';

export function AdvertiseFaqDelete({ data }: { data: iAdvertiseFaq }) {
	const [mutation, { isLoading }] = useAdminDeleteAdvertiseFaqMutation();
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
		<Button onClick={handleClick} variant="outline" size="icon">
			{isLoading ? (
				<LoaderCircle className="size-4 animate-spin text-destructive" />
			) : (
				<X className="size-4 text-destructive" />
			)}
			<span className="sr-only">Delete</span>
		</Button>
	);
}
