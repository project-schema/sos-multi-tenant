'use client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { badgeFormat, dateFormat, env, tableSrCount } from '@/lib';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { iPagination } from '@/types';
import { Ellipsis, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { EditActiveCouponModal } from './admin.coupon.active-modal';
import { useAdminDeleteCouponRequestMutation } from './admin.coupon.api.slice';
import { AdminCouponDelete } from './admin.coupon.delete';
import { EditRejectCouponModal } from './admin.coupon.reject-modal';
import { iAdminReqCoupon } from './admin.coupon.type';
import { ViewCouponModal } from './admin.coupon.view-modal';
export function AdminCouponRequestTable({
	data,
}: {
	data: iPagination<iAdminReqCoupon>;
}) {
	const coupons = data.data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100">Profile </TableHead>
					<TableHead className="bg-stone-100">Name </TableHead>
					<TableHead className="bg-stone-100">Email </TableHead>
					<TableHead className="bg-stone-100">Number </TableHead>
					<TableHead className="bg-stone-100">Date </TableHead>
					<TableHead className="bg-stone-100">Status </TableHead>
					<TableHead className="bg-stone-100">Action </TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{coupons.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={8}
							className="text-center py-8 text-muted-foreground"
						>
							No items found matching your criteria
						</TableCell>
					</TableRow>
				) : (
					coupons?.map((item, i) => (
						<TableRow key={item.id}>
							<TableCell className="py-2 pl-4">
								{tableSrCount(data.current_page, i)}
							</TableCell>
							<TableCell className="py-2">
								<Link href={`/admin/users/${item.id}`}>
									<Avatar className="h-12 w-12 rounded-xl">
										<AvatarImage
											src={env.baseAPI + '/' + item?.user?.image}
											alt={'Image'}
										/>
										<AvatarFallback className="rounded-xl bg-sky-100">
											{item?.user?.name?.slice(0, 1) || 'I'}
										</AvatarFallback>
									</Avatar>
								</Link>
							</TableCell>
							<TableCell className="py-2">{item?.user?.name}</TableCell>
							<TableCell className="py-2">{item?.user?.email}</TableCell>
							<TableCell className="py-2">{item?.user?.number}</TableCell>
							<TableCell className="py-2">
								{dateFormat(item.created_at.toString())}
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

const DropDownAction = ({ item }: { item: iAdminReqCoupon }) => {
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
				{item.status !== 'reject' && (
					<>
						<EditActiveCouponModal data={item} />
						<EditRejectCouponModal data={item} />
					</>
				)}

				<DropdownMenuSeparator />

				{/* Delete   */}
				<AdminCouponDelete
					data={item}
					mutation={mutation}
					isLoading={isLoading}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
