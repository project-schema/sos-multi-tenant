'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import {
	badgeFormat,
	dateFormat,
	sign,
	tableSrCount,
	textCount,
	timeFormat,
} from '@/lib';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { iPagination } from '@/types';
import { Ellipsis } from 'lucide-react';
import { iAdminWithdrawal } from '../../admin/withdrawal';
import { ViewWithdrawalModal } from '../../admin/withdrawal/admin.withdrawal.view-modal';
import { iVendorWithdraw } from './vendor-withdraw-type';

export function VendorWithdrawTable({
	data,
}: {
	data: iPagination<iVendorWithdraw>;
}) {
	const products = data.data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100">Id</TableHead>
					<TableHead className="bg-stone-100 w-10">Your Bank Nu.</TableHead>
					<TableHead className="bg-stone-100">Amount</TableHead>
					<TableHead className="bg-stone-100">Withdraw Charge </TableHead>
					<TableHead className="bg-stone-100">Bank Name</TableHead>
					<TableHead className="bg-stone-100">Branch Name </TableHead>
					<TableHead className="bg-stone-100">AC Holder Name </TableHead>
					<TableHead className="bg-stone-100">Date </TableHead>
					<TableHead className="bg-stone-100">Admin T.ID </TableHead>
					<TableHead className="bg-stone-100">Status </TableHead>
					<TableHead className="bg-stone-100">Action </TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={11}
							className="text-center py-8 text-muted-foreground"
						>
							No items found matching your criteria
						</TableCell>
					</TableRow>
				) : (
					products?.map((item, i) => (
						<TableRow key={item.id}>
							<TableCell className="py-2 pl-4">
								{tableSrCount(data.current_page, i)}
							</TableCell>
							<TableCell className="font-medium py-4">#{item.uniqid}</TableCell>
							<TableCell className="py-2">
								{textCount(item.bank_name, 10)}
							</TableCell>
							<TableCell className="py-2">
								{item.amount} {sign.tk}
							</TableCell>
							<TableCell className="py-2">
								<Badge variant="info">
									{item.charge} {sign.tk}
								</Badge>
							</TableCell>
							<TableCell className="py-2">
								<Badge variant="outline">{item.bank_name}</Badge>
							</TableCell>
							<TableCell className="py-2">
								<Badge variant="success">{item.branch_name || ''} </Badge>
							</TableCell>

							<TableCell className="py-2">
								<Badge variant="default">{item.holder_name || ''} </Badge>
							</TableCell>
							<TableCell className="py-2">
								{dateFormat(item.created_at)} <br />
								{timeFormat(item.created_at)}
							</TableCell>
							<TableCell className="py-2">{item.admin_transition_id}</TableCell>
							<TableCell className="py-2">
								<Badge
									className="capitalize"
									variant={badgeFormat(item.status)}
								>
									{item.status}
								</Badge>
							</TableCell>
							<TableCell className="py-2">
								<DropDownAction item={item as any} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}

const DropDownAction = ({ item }: { item: iAdminWithdrawal }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
					size="icon"
				>
					<Ellipsis />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				{item.status === 'success' && <ViewWithdrawalModal data={item} />}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
