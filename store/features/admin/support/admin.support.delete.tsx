'use client';

import { LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { alertConfirm } from '@/lib';
import { iAdminSupport } from './admin.support.type';

export function AdminSupportDelete({
	data,
	mutation,
	isLoading,
}: {
	data: iAdminSupport;
	mutation: any;
	isLoading: any;
}) {
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
					<X className="size-4 text-destructive" />
				)}
			</DropdownMenuShortcut>
			Delete Support
		</DropdownMenuItem>
	);
}
