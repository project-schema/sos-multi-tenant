'use client';

import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Check, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { alertConfirm } from '@/lib';
import { useVendorRequestProductStatusMutation } from './dropshipper-request.api.slice';
import { iDropShipReq } from './dropshipper-request.type';

export function DropshipperAcceptRequest({ data }: { data: iDropShipReq }) {
	const [mutation, { isLoading }] = useVendorRequestProductStatusMutation();
	const [clicked, setClicked] = useState(false);

	const handleClick = async () => {
		if (clicked || isLoading) return;

		setClicked(true);

		alertConfirm({
			onOk: async () => {
				try {
					const res = await mutation({
						id: data.id,
						status: 1,
						tenant_id: data.tenant_id,
					}).unwrap();
					if (res.status === 200) {
						toast.success('Update successfully');
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
		>
			<DropdownMenuShortcut className="ml-0">
				{isLoading ? (
					<LoaderCircle className="size-4 animate-spin text-destructive" />
				) : (
					<Check className="size-4" />
				)}
			</DropdownMenuShortcut>
			Active Request
		</DropdownMenuItem>
	);
}
