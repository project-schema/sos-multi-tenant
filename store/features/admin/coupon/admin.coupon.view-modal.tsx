'use client';

import { Badge } from '@/components/ui/badge';
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
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { badgeFormat, dateFormat } from '@/lib';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import React, { useState } from 'react';
import { iAdminReqCoupon } from './admin.coupon.type';

//  Component
export function ViewCouponModal({ data }: { data: iAdminReqCoupon }) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
				<DialogTrigger className="flex items-center gap-2 w-full">
					<DropdownMenuShortcut className="ml-0">
						<ExternalLink className="size-4" />
					</DropdownMenuShortcut>
					View Coupon
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent className={cn('sm:max-w-2xl w-full')}>
				<DialogHeader>
					<DialogTitle>View Coupon</DialogTitle>
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
	editData: iAdminReqCoupon;
}) => {
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label className="text-muted-foreground">Name</Label>
					<div>{editData.user?.name ?? 'N/A'}</div>
				</div>
				<div className="space-y-2">
					<Label className="text-muted-foreground">Email</Label>
					<div>{editData.user?.email ?? 'N/A'}</div>
				</div>

				<div className="space-y-2">
					<Label className="text-muted-foreground">Status</Label>
					<div className="capitalize">
						<Badge variant={badgeFormat(editData.status)}>
							{editData.status}
						</Badge>
					</div>
				</div>

				<div className="space-y-2">
					<Label className="text-muted-foreground">Created At</Label>
					<div>{dateFormat(editData.created_at)}</div>
				</div>
			</div>

			<Separator />

			<div className="space-y-2 p-2 rounded border">
				<Label className="text-muted-foreground">Comments</Label>
				<div className="whitespace-pre-wrap">{editData.comments || '—'}</div>
			</div>
			{editData.reason && (
				<div className="space-y-2 border p-2 rounded">
					<Label className="text-muted-foreground">Reason</Label>
					<div className="whitespace-pre-wrap">{editData.reason || '—'}</div>
				</div>
			)}

			<div className="flex justify-end pt-4">
				<Button variant="default" onClick={() => setOpen(false)}>
					Close
				</Button>
			</div>
		</div>
	);
};
