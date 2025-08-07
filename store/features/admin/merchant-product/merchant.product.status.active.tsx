'use client';

import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { LoaderCircle, PackageCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { alertConfirm } from '@/lib';
import { useAdminProductStatusUpdateMutation } from './merchant-product.api.slice';
import { iMerchantProduct } from './merchant-product.type';

export function AdminProductStatusActive({ data }: { data: iMerchantProduct }) {
	const [mutation, { isLoading }] = useAdminProductStatusUpdateMutation();
	const [clicked, setClicked] = useState(false);

	const handleClick = async () => {
		if (clicked || isLoading) return;

		setClicked(true);

		alertConfirm({
			onOk: async () => {
				try {
					const res = await mutation({
						id: data.id,
						status: 'active',
						rejected_details: null,
					}).unwrap();
					if (res.status === 200) {
						toast.success(res.message || 'Status updated to active');
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
					<LoaderCircle className="size-4 animate-spin" />
				) : (
					<PackageCheck className="size-4" />
				)}
			</DropdownMenuShortcut>
			Set Active
		</DropdownMenuItem>
	);
}
