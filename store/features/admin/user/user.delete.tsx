'use client';

import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { LoaderCircle, UserX } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { alertConfirm } from '@/lib';
import { useAdminDeleteUserMutation } from './admin.user.api.slice';
import { iUser } from './type';

export function UserDelete({ user }: { user: iUser }) {
	const [mutation, { isLoading }] = useAdminDeleteUserMutation();
	const [clicked, setClicked] = useState(false);

	const handleClick = async () => {
		if (clicked || isLoading) return;

		setClicked(true);

		alertConfirm({
			onOk: async () => {
				try {
					const res = await mutation({
						id: user.id,
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
			className="flex items-center gap-2"
			variant="destructive"
		>
			<DropdownMenuShortcut className="ml-0">
				{isLoading ? (
					<LoaderCircle className="size-4 animate-spin text-destructive" />
				) : (
					<UserX className="size-4 text-destructive" />
				)}
			</DropdownMenuShortcut>
			Delete User
		</DropdownMenuItem>
	);
}
