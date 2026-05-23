'use client';

import { Button } from '@/components/ui/button';
import { alertConfirm } from '@/lib';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { useAdminSupportDeleteMutation } from './admin.support.api.slice';
import { iAdminSupport } from './admin.support.type';

export function AdminSupportDeleteAll({
	supports,
}: {
	supports: iAdminSupport[];
}) {
	const [clicked, setClicked] = useState(false);
	const [mutation, { isLoading }] = useAdminSupportDeleteMutation();

	const handleDeleteAll = async () => {
		if (clicked || isLoading) return;

		setClicked(true);

		alertConfirm({
			onOk: async () => {
				try {
					await Promise.all(
						supports.map((support) =>
							mutation({
								id: support.id,
							}).unwrap(),
						),
					);

					toast.success('All supports deleted successfully');
				} catch (error) {
					toast.error('Failed to delete all supports');
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
			disabled={isLoading || clicked || supports.length === 0}
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
