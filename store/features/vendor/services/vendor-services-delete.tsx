'use client';

import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { LoaderCircle, PackageX } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { alertConfirm } from '@/lib';
import { useVendorServicesDeleteMutation } from './vendor-services-api-slice';
import { iVendorServices } from './vendor-services-type';

export function VendorServicesDelete({ data }: { data: iVendorServices }) {
	const [mutation, { isLoading }] = useVendorServicesDeleteMutation();
	const [clicked, setClicked] = useState(false);

	const handleClick = async () => {
		if (clicked || isLoading) return;

		setClicked(true);

		alertConfirm({
			onOk: async () => {
				try {
					const res = await mutation({
						id: data.id.toString(),
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
					<PackageX className="size-4 text-destructive" />
				)}
			</DropdownMenuShortcut>
			Delete Service
		</DropdownMenuItem>
	);
}
