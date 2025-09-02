'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Eye } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { dateFormat } from '@/lib';
import { iVendorDamageProducts } from './damage-products-type';

export function VendorDamageProductsDetails({
	editData,
}: {
	editData: iVendorDamageProducts;
}) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<Eye className="h-4 w-4" />
					<span className="sr-only">Damage Products</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Damage Products</DialogTitle>
					<DialogDescription>Damage Products Details.</DialogDescription>
				</DialogHeader>
				<Details editData={editData} setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
}

const Details = ({
	editData,
	setOpen,
}: {
	editData: iVendorDamageProducts;
	setOpen: (open: boolean) => void;
}) => {
	return (
		<>
			<div className="space-y-3 text-sm">
				<div className="flex justify-between gap-4">
					<span className="text-muted-foreground">Product</span>
					<span className="font-medium">{editData?.product?.name ?? '-'}</span>
				</div>
				<div className="flex justify-between gap-4">
					<span className="text-muted-foreground">User</span>
					<span className="font-medium">{editData?.user?.name ?? '-'}</span>
				</div>
				<div className="flex justify-between gap-4">
					<span className="text-muted-foreground">Quantity</span>
					<span className="font-medium">{editData?.qty ?? '-'}</span>
				</div>
				<div className="flex justify-between gap-4">
					<span className="text-muted-foreground">Date</span>
					<span className="font-medium">
						{dateFormat(editData?.created_at)}
					</span>
				</div>
				<div className="pt-2">
					<div className="text-muted-foreground mb-1">Note</div>
					<div className="rounded-md border p-3 bg-muted/30">
						{editData?.note || '—'}
					</div>
				</div>
			</div>

			<Table className="border border-gray-300 rounded-md">
				<TableHeader>
					<TableRow>
						<TableHead>Unit</TableHead>
						<TableHead>Color</TableHead>
						<TableHead>Variation</TableHead>
						<TableHead>Damage Qty</TableHead>
						<TableHead>Note</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{editData?.damage_details?.map((detail) => (
						<TableRow key={detail.id}>
							<TableCell>{detail?.unit?.unit_name}</TableCell>
							<TableCell>{detail?.color?.name}</TableCell>
							<TableCell>{detail?.size?.name}</TableCell>
							<TableCell>{detail?.damage_qty}</TableCell>
							<TableCell>{detail?.remark}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<DialogFooter>
				<Button variant="destructive" onClick={() => setOpen(false)}>
					Close
				</Button>
			</DialogFooter>
		</>
	);
};
