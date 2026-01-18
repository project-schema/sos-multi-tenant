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
import { badgeFormat, dateFormat, sign, tableSrCount } from '@/lib';

import { ClickToCopy } from '@/hooks/use-copy';
import { TenantCouponDelete } from './coupon-delete';
import { EditCouponModal } from './edit-modal';
import { iTenantCoupon } from './type';

export function AdminCouponTable({ data }: { data: iTenantCoupon[] }) {
	const items = data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100">Name</TableHead>
					<TableHead className="bg-stone-100">Code</TableHead>
					<TableHead className="bg-stone-100">Discount</TableHead>
					<TableHead className="bg-stone-100">Min Order</TableHead>
					<TableHead className="bg-stone-100">Max Discount</TableHead>
					<TableHead className="bg-stone-100">Usage Limit</TableHead>
					<TableHead className="bg-stone-100">Per User</TableHead>
					<TableHead className="bg-stone-100">Valid From</TableHead>
					<TableHead className="bg-stone-100">Valid To</TableHead>
					<TableHead className="bg-stone-100">Status</TableHead>
					<TableHead className="bg-stone-100">Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{items.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={12}
							className="text-center py-8 text-muted-foreground"
						>
							No coupons found matching your criteria
						</TableCell>
					</TableRow>
				) : (
					items?.map((item, i) => (
						<TableRow key={item.id}>
							<TableCell className="py-2 pl-4">{tableSrCount(1, i)}</TableCell>
							<TableCell className="font-medium py-4">{item.name}</TableCell>
							<TableCell className="py-2">
								<span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
									{item.code}
								</span>
								<ClickToCopy text={item.code} iconClassName="w-4 h-4 ml-1" />
							</TableCell>
							<TableCell className="py-2">
								{item.discount_value}
								{item.discount_type === 'percentage' ? sign.percent : sign.tk}
							</TableCell>
							<TableCell className="py-2">
								{item.min_order_amount}
								{sign.tk}
							</TableCell>
							<TableCell className="py-2">
								{item.max_discount_amount}
								{sign.tk}
							</TableCell>
							<TableCell className="py-2">{item.usage_limit}</TableCell>
							<TableCell className="py-2">
								{item.usage_limit_per_user}
							</TableCell>
							<TableCell className="py-2">
								{dateFormat(item.valid_from)}
							</TableCell>
							<TableCell className="py-2">
								{dateFormat(item.valid_to)}
							</TableCell>
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
								<TenantCouponDelete data={item} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
