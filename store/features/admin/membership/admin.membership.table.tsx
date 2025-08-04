'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { badgeFormat, dateFormat, tableSrCount, textCount } from '@/lib';

import { Badge } from '@/components/ui/badge';
import { iPagination } from '@/types';
import { iMembershipType } from './admin.membership.type';
export function AdminMembershipTable({
	data,
	statusFilter,
}: {
	data: iPagination<iMembershipType>;
	statusFilter: 'vendor' | 'affiliate';
}) {
	const memberships = data.data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100 w-10">ID</TableHead>
					<TableHead className="bg-stone-100"> Name </TableHead>
					<TableHead className="bg-stone-100">Email </TableHead>
					<TableHead className="bg-stone-100">Number </TableHead>
					{statusFilter === 'affiliate' && (
						<>
							<TableHead className="bg-stone-100">Service Create </TableHead>
							<TableHead className="bg-stone-100">Product Approve</TableHead>
							<TableHead className="bg-stone-100">Product Request </TableHead>
						</>
					)}
					{statusFilter === 'vendor' && (
						<>
							<TableHead className="bg-stone-100">Service Create</TableHead>
							<TableHead className="bg-stone-100">Product Create</TableHead>
							<TableHead className="bg-stone-100">Affiliate Request</TableHead>
						</>
					)}

					<TableHead className="bg-stone-100">Expired Data </TableHead>
					<TableHead className="bg-stone-100">Status </TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{memberships.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={10}
							className="text-center py-8 text-muted-foreground"
						>
							No items found matching your criteria
						</TableCell>
					</TableRow>
				) : (
					memberships?.map((item, i) => (
						<TableRow key={item?.id}>
							<TableCell className="py-2 pl-4">
								{tableSrCount(data.current_page, i)}
							</TableCell>
							<TableCell className="font-medium py-4">
								#{item?.uniqid}
							</TableCell>
							<TableCell className="font-medium py-4">
								{textCount(item?.name, 15)}
							</TableCell>
							<TableCell className="font-medium py-4">
								{textCount(item?.email, 15)}
							</TableCell>
							<TableCell className="font-medium py-4">
								{textCount(item?.number, 15)}
							</TableCell>
							{statusFilter === 'vendor' && (
								<>
									<TableCell className="font-medium py-4">
										{item?.vendorsubscription?.service_qty || '00'}
									</TableCell>
									<TableCell className="font-medium py-4">
										{item?.vendorsubscription?.product_qty || '00'}
									</TableCell>
									<TableCell className="font-medium py-4">
										{item?.vendorsubscription?.affiliate_request || '00'}
									</TableCell>
								</>
							)}
							{statusFilter === 'affiliate' && (
								<>
									<TableCell className="font-medium py-4">
										{item?.vendorsubscription?.service_create || '00'}
									</TableCell>
									<TableCell className="font-medium py-4">
										{item?.vendorsubscription?.product_approve || '00'}
									</TableCell>
									<TableCell className="font-medium py-4">
										{item?.vendorsubscription?.product_request || '00'}
									</TableCell>
								</>
							)}
							<TableCell className="py-2">
								{dateFormat(item?.vendorsubscription?.expire_date)}
							</TableCell>
							<TableCell className="py-2">
								<Badge variant={badgeFormat(item?.status)}>
									{item?.status}
								</Badge>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
