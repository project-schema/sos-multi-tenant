'use client';

import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { CheckIcon, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { alertConfirm } from '@/lib';
import { useAdminUpdateVendorServiceMutation } from './admin.service.api.slice';
import { iAdminService } from './admin.service.type';
export function AdminVendorServiceActive({ data }: { data: iAdminService }) {
	const [mutation, { isLoading }] = useAdminUpdateVendorServiceMutation();
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
						reason: null,
						commission: data?.commission,
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
					<CheckIcon className="size-4" />
				)}
			</DropdownMenuShortcut>
			Set Active
		</DropdownMenuItem>
	);
}
