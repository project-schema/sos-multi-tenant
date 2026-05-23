'use client';

import { Button } from '@/components/ui/button';
import { alertConfirm } from '@/lib';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { useAdminDeleteAdvertiseMutation } from './admin.advertise.api.slice';
import { iAdminAdvertise } from './admin.advertise.type';

export function AdminDeleteAllAdvertise({
	advertises,
}: {
	advertises: iAdminAdvertise[];
}) {
	const [mutation, { isLoading }] = useAdminDeleteAdvertiseMutation();

	const [clicked, setClicked] = useState(false);

	const router = useRouter();

	const handleDeleteAll = async () => {
		if (clicked || isLoading) return;

		setClicked(true);

		alertConfirm({
			onOk: async () => {
				try {
					// parallel delete
					await Promise.all(
						advertises.map((item) =>
							mutation({
								id: item.id,
							}).unwrap(),
						),
					);

					toast.success('All advertisements deleted successfully');

					router.push('/admin/advertise');
				} catch (error) {
					toast.error('Failed to delete all advertisements');
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
			disabled={isLoading || clicked || advertises.length === 0}
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
