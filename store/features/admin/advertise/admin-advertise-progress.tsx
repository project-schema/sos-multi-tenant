'use client';

import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Clock, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { alertConfirm } from '@/lib';
import { useAdminAdvertiseStatusMutation } from './admin.advertise.api.slice';
import { iAdminAdvertise } from './admin.advertise.type';

export function AdminAdvertiseProgress({ data }: { data: iAdminAdvertise }) {
	const [mutation, { isLoading }] = useAdminAdvertiseStatusMutation();
	const [clicked, setClicked] = useState(false);

	const handleClick = async () => {
		if (clicked || isLoading) return;

		setClicked(true);

		alertConfirm({
			onOk: async () => {
				try {
					const res = await mutation({
						advertise_id: data.id,
					}).unwrap();
					if (res.status === 200) {
						toast.success('Progress successfully');
					}
				} catch (err) {
					toast.error('Failed to progress');
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
					<LoaderCircle className="size-4 animate-spin" />
				) : (
					<Clock className="size-4" />
				)}
			</DropdownMenuShortcut>
			Progress Advertise
		</DropdownMenuItem>
	);
}
