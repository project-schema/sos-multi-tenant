'use client';

import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { LoaderCircle, PackageX } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { alertConfirm } from '@/lib';
import { useAdminDeleteProductMutation } from './merchant-product.api.slice';
import { iMerchantProduct } from './merchant-product.type';

export function MerchantProductDelete({ data }: { data: iMerchantProduct }) {
	const [mutation, { isLoading }] = useAdminDeleteProductMutation();
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
		<DropdownMenuItem
			onSelect={(e) => {
				e.preventDefault();
				handleClick();
			}}
			disabled={isLoading || clicked}
			className="flex items-center gap-2 cursor-pointer"
			variant="destructive"
		>
			<DropdownMenuShortcut className="ml-0">
				{isLoading ? (
					<LoaderCircle className="size-4 animate-spin text-destructive" />
				) : (
					<PackageX className="size-4 text-destructive" />
				)}
			</DropdownMenuShortcut>
			Delete Product
		</DropdownMenuItem>
	);
}
