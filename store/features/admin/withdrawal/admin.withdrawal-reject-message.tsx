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
import { cn } from '@/lib/utils';
import { AlertCircleIcon, Pen } from 'lucide-react';
import React, { useState } from 'react';
import { iAdminWithdrawal } from './admin.withdrawal.type';

//  Component
export function AdminWithdrawalRejectMessageModal({
	data,
}: {
	data: iAdminWithdrawal;
}) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
				<DialogTrigger className="flex items-center gap-2 w-full">
					<DropdownMenuShortcut className="ml-0">
						<Pen className="size-4" />
					</DropdownMenuShortcut>
					Reject Message
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent className={cn('sm:max-w-2xl w-full')}>
				<DialogHeader>
					<DialogTitle>Reject Message</DialogTitle>
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
			<Alert variant="destructive">
				<AlertCircleIcon />
				<AlertTitle>Admin Message</AlertTitle>
				<AlertDescription>
					<p>{editData?.reason}</p>
				</AlertDescription>
			</Alert>

			<div className="flex justify-end">
				<Button variant="destructive" onClick={() => setOpen(false)}>
					Close
				</Button>
			</div>
		</div>
	);
};
