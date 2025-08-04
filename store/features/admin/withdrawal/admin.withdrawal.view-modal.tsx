'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { env } from '@/lib';
import { cn } from '@/lib/utils';
import { CheckCircle2Icon, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { iAdminWithdrawal } from './admin.withdrawal.type';

//  Component
export function ViewWithdrawalModal({ data }: { data: iAdminWithdrawal }) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
				<DialogTrigger className="flex items-center gap-2 w-full">
					<DropdownMenuShortcut className="ml-0">
						<ExternalLink className="size-4" />
					</DropdownMenuShortcut>
					View
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent className={cn('sm:max-w-2xl w-full')}>
				<DialogHeader>
					<DialogTitle className="text-center">View Message</DialogTitle>
				</DialogHeader>

				<FORM setOpen={setOpen} editData={data} />
			</DialogContent>
		</Dialog>
	);
}

const FORM = ({
	setOpen,
	editData,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	editData: iAdminWithdrawal;
}) => {
	return (
		<div className="space-y-4">
			{editData.text && (
				<Alert>
					<CheckCircle2Icon />
					<AlertTitle>Admin Message</AlertTitle>
					<AlertDescription>{editData.text}</AlertDescription>
				</Alert>
			)}
			{editData?.admin_screenshot && (
				<div className="text-center">
					<Image
						alt="image"
						className="mx-auto text-center border p-2 rounded-md max-h-96 object-contain"
						width={400}
						height={400}
						src={`${env.baseAPI}/${editData?.admin_screenshot}`}
					/>
				</div>
			)}

			<div className="flex justify-end pt-4">
				<Button variant="destructive" onClick={() => setOpen(false)}>
					Close
				</Button>
			</div>
		</div>
	);
};
