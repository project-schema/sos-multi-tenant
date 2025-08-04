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
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ClickToCopy } from '@/hooks/use-copy';
import { iPagination } from '@/types';
import { Ellipsis, LoaderCircle } from 'lucide-react';
import { useAdminDeleteCouponRequestMutation } from '../coupon';
import { ViewCouponModal } from '../coupon/admin.coupon.view-modal';
import { iAdminWithdrawal } from './admin.withdrawal.type';
export function AdminWithdrawalTable({
	data,
}: {
	data: iPagination<iAdminWithdrawal>;
}) {
	const advertises = data.data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100 w-10">Id </TableHead>
					<TableHead className="bg-stone-100"> Name </TableHead>
					<TableHead className="bg-stone-100">Amount </TableHead>
					<TableHead className="bg-stone-100">Bank Name </TableHead>
					<TableHead className="bg-stone-100">Bank Number </TableHead>
					<TableHead className="bg-stone-100">Ac Holder Name </TableHead>
					<TableHead className="bg-stone-100">Branch Name </TableHead>
					<TableHead className="bg-stone-100">Admin T. Id </TableHead>
					<TableHead className="bg-stone-100">Req Date </TableHead>
					<TableHead className="bg-stone-100">Update Date </TableHead>
					<TableHead className="bg-stone-100">Status </TableHead>
					<TableHead className="bg-stone-100">Action </TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{advertises.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={13}
							className="text-center py-8 text-muted-foreground"
						>
							No items found matching your criteria
						</TableCell>
					</TableRow>
				) : (
					advertises?.map((item, i) => (
						<TableRow key={item.id}>
							<TableCell className="py-2 pl-4">
								{tableSrCount(data.current_page, i)}
							</TableCell>
							<TableCell className="font-medium py-4">#{item.uniqid}</TableCell>
							<TableCell className="py-2">
								{textCount(item?.user?.name, 10)}
							</TableCell>
							<TableCell className="py-2">
								{item.amount}
								{sign.tk}
							</TableCell>
							<TableCell className="py-2">{item.bank_name}</TableCell>
							<TableCell className="py-2">
								{item.ac_or_number}{' '}
								<ClickToCopy text={item.ac_or_number} iconClassName="w-4 h-4" />
							</TableCell>
							<TableCell className="py-2">{item.holder_name}</TableCell>
							<TableCell className="py-2">{item.branch_name}</TableCell>
							<TableCell className="py-2">{item.admin_transition_id}</TableCell>
							<TableCell className="py-2">
								{dateFormat(item.created_at.toString())} <br />
								{timeFormat(item.created_at.toString())}
							</TableCell>
							<TableCell className="py-2">
								{dateFormat(item.updated_at.toString())}
								<br />
								{timeFormat(item.updated_at.toString())}
							</TableCell>
							<TableCell className="py-2">
								<Badge
									className="capitalize"
									variant={badgeFormat(item.status)}
								>
									{item.status}
								</Badge>
							</TableCell>

							<TableCell className="py-2">
								<DropDownAction item={item} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
const DropDownAction = ({ item }: { item: iAdminWithdrawal }) => {
	const [mutation, { isLoading }] = useAdminDeleteCouponRequestMutation();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
					size="icon"
				>
					{isLoading ? (
						<LoaderCircle className="size-4 animate-spin text-destructive" />
					) : (
						<Ellipsis />
					)}
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<ViewCouponModal data={item} />
				{/* {item.status !== 'reject' && (
					<>
						<EditActiveCouponModal data={item} />
						<EditRejectCouponModal data={item} />
					</>
				)} */}

				<DropdownMenuSeparator />

				{/* Delete   */}
				{/* <AdminCouponDelete
					data={item}
					mutation={mutation}
					isLoading={isLoading}
				/> */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
