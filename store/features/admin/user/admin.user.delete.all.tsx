'use client';

import { alertConfirm } from '@/lib';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useAdminDeleteUserMutation } from './admin.user.api.slice';
import { iUser } from './type';

export function DeleteAllUsers({ users }: { users: iUser[] }) {
	const [mutation, { isLoading }] = useAdminDeleteUserMutation();
	const [clicked, setClicked] = useState(false);

	const handleDeleteAll = async () => {
		if (clicked || isLoading) return;

		setClicked(true);

		alertConfirm({
			onOk: async () => {
				try {
					// sequential delete
					for (const user of users) {
						await mutation({
							id: user.id,
							type: user.is_tenant ? 'tenant' : 'user',
						}).unwrap();
					}

					toast.success('All users deleted successfully');
				} catch (error) {
					toast.error('Failed to delete all users');
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
		<Button
			variant="destructive"
			onClick={handleDeleteAll}
			disabled={isLoading || users.length === 0}
		>
			Delete All Users
		</Button>
	);
}
