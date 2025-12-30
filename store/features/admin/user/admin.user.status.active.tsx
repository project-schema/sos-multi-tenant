'use client';

import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { LoaderCircle, UserRoundCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { alertConfirm } from '@/lib';
import { useAdminUserStatusUpdateMutation } from './admin.user.api.slice';
import { iUser } from './type';

export function UserStatusActive({ user }: { user: iUser }) {
	const [mutation, { isLoading }] = useAdminUserStatusUpdateMutation();
	const [clicked, setClicked] = useState(false);

	const handleClick = async () => {
		if (clicked || isLoading) return;

		setClicked(true);

		alertConfirm({
			onOk: async () => {
				try {
					const res = await mutation({
						id: user.id,
						status: 'active',
						is_tenant: user.is_tenant,
					}).unwrap();
					if (res.status === 200) {
						toast.success(res.message || 'User status updated to active');
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
					<UserRoundCheck className="size-4" />
				)}
			</DropdownMenuShortcut>
			Set Active
		</DropdownMenuItem>
	);
}
