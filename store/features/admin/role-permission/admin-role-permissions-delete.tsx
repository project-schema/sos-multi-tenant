'use client';

import { Button } from '@/components/ui/button';
import { alertConfirm } from '@/lib';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { iAdminRole } from './role-permission-type';
import { useAdminDeleteRoleMutation } from './role-permissions-api-slice';

export function AdminRoleDelete({ data }: { data: iAdminRole }) {
	const [mutation, { isLoading }] = useAdminDeleteRoleMutation();
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
		<Button onClick={handleClick} variant="outline" size="icon">
			{isLoading ? (
				<LoaderCircle className="size-4 animate-spin text-destructive" />
			) : (
				<Trash2 className="size-4 text-destructive" />
			)}
			<span className="sr-only">Delete</span>
		</Button>
	);
}
