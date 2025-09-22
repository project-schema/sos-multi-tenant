'use client';

import { alertConfirm, env } from '@/lib';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useVendorProductImageDeleteMutation } from './vendor-product-api-slice';

export function VendorProductImageDelete({
	data,
}: {
	data: {
		id: string | number;
		image: string;
	};
}) {
	const [mutation, { isLoading }] = useVendorProductImageDeleteMutation();
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
		<div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shadow">
			<img
				src={`${env.baseAPI}/${data.image}`}
				alt={`Preview ${data.id}`}
				className="w-full h-full object-cover"
			/>
			<button
				type="button"
				onClick={handleClick}
				disabled={isLoading || clicked}
				className="absolute top-1 right-1 bg-red-600/80 p-1 rounded-md"
			>
				{isLoading ? (
					<LoaderCircle className="size-4 animate-spin text-white" />
				) : (
					<Trash2 className="w-4 h-4 text-white" />
				)}
			</button>
		</div>
	);
}
