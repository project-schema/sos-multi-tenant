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
import { badgeFormat, dateFormat, sign, tableSrCount, textCount } from '@/lib';

import { ClickToCopy } from '@/hooks/use-copy';
import { iPagination } from '@/types';
import { AdminActiveCouponDelete } from './admin.active-coupon.delete';
import { EditCouponModal } from './admin.coupon.edit-modal';
import { iAdminCoupon } from './admin.coupon.type';
export function AdminCouponTable({
	data,
}: {
	data: iPagination<iAdminCoupon>;
}) {
	const advertises = data.data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100 w-10">Name</TableHead>
					<TableHead className="bg-stone-100">Discount </TableHead>
					<TableHead className="bg-stone-100">Commission </TableHead>
					<TableHead className="bg-stone-100">Limitation </TableHead>
					<TableHead className="bg-stone-100">Income </TableHead>
					<TableHead className="bg-stone-100">Use </TableHead>
					<TableHead className="bg-stone-100">Expire Date </TableHead>
					<TableHead className="bg-stone-100">User </TableHead>
					<TableHead className="bg-stone-100">Email </TableHead>
					<TableHead className="bg-stone-100">Status </TableHead>
					<TableHead className="bg-stone-100">Action </TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{advertises.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={12}
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
							<TableCell className="font-medium py-4">
								{item.name}{' '}
								<ClickToCopy text={item.name} iconClassName="w-4 h-4" />
							</TableCell>
							<TableCell className="py-2">
								{item.amount}
								{item.type === 'percentage' ? sign.percent : sign.tk}
							</TableCell>
							<TableCell className="py-2">
								{item.commission}
								{item.commission_type === 'percentage' ? sign.percent : sign.tk}
							</TableCell>
							<TableCell className="py-2">{item.limitation}</TableCell>
							<TableCell className="py-2">
								{item?.couponused_sum_total_commission || '0'}
							</TableCell>
							<TableCell className="py-2">
								{item?.couponused_count || '0'}
							</TableCell>
							<TableCell className="py-2">
								{dateFormat(item.expire_date.toString())}
							</TableCell>
							<TableCell className="py-2">
								{textCount(item?.user?.name, 10)}
							</TableCell>
							<TableCell className="py-2">{item?.user?.email}</TableCell>
							<TableCell className="py-2">
								<Badge
									className="capitalize"
									variant={badgeFormat(item.status)}
								>
									{item.status}
								</Badge>
							</TableCell>

							<TableCell className="py-2 space-x-2">
								<EditCouponModal data={item} />
								<AdminActiveCouponDelete data={item} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
