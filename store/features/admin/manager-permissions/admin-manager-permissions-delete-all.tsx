'use client';

import { Button } from '@/components/ui/button';
import { alertConfirm } from '@/lib';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { useAdminDeleteManagerMutation } from './admin-manager-permissions-api-slice';
import { iAdminManager } from './admin-manager-permissions-type';

export function AdminManagerDeleteAll({
	managers,
}: {
	managers: iAdminManager[];
}) {
	const [mutation, { isLoading }] = useAdminDeleteManagerMutation();

	const [clicked, setClicked] = useState(false);

	const handleDeleteAll = async () => {
		if (clicked || isLoading) return;

		setClicked(true);

		alertConfirm({
			onOk: async () => {
				try {
					await Promise.all(
						managers.map((manager) =>
							mutation({
								id: manager.id,
							}).unwrap(),
						),
					);

					toast.success('All managers deleted successfully');
				} catch (error) {
					toast.error('Failed to delete all managers');
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
			onClick={handleDeleteAll}
			variant="destructive"
			disabled={isLoading || clicked || managers.length === 0}
			className="flex items-center gap-2"
		>
			{isLoading ? (
				<LoaderCircle className="size-4 animate-spin" />
			) : (
				<Trash2 className="size-4" />
			)}
			Delete All
		</Button>
	);
}
