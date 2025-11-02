'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import { CardContent, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { badgeFormat, dateFormat, tableSrCount, timeFormat } from '@/lib';
import { useGetAllCartsQuery } from '@/store/features/dropshipper/cart';

export default function CartPageClient() {
	const { data, isLoading, isError, isFetching } = useGetAllCartsQuery();

	return (
		<Container1
			isLoading={isLoading}
			isError={isError}
			header={<CardTitle>Cart List</CardTitle>}
		>
			<CardContent className="space-y-4">
				<div className="border rounded-lg relative">
					{isFetching && <Loader8 />}
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="bg-stone-100">Sr. Product </TableHead>
								<TableHead className="bg-stone-100">Transition ID </TableHead>
								<TableHead className="bg-stone-100">Price </TableHead>
								<TableHead className="bg-stone-100">Per Commission </TableHead>
								<TableHead className="bg-stone-100">Qty</TableHead>
								<TableHead className="bg-stone-100">Income </TableHead>
								<TableHead className="bg-stone-100">Date</TableHead>
								<TableHead className="bg-stone-100">Action </TableHead>
								<TableHead className="bg-stone-100">Checkout </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.data.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={11}
										className="text-center py-8 text-muted-foreground"
									>
										No users found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								data?.data?.map((user, i) => (
									<TableRow key={user.id}>
										<TableCell className="font-medium py-4">
											{tableSrCount(historyData?.current_page, i)}
										</TableCell>
										<TableCell className="font-medium py-4">
											#{user.trxid}
										</TableCell>

										<TableCell className="py-2">{user.amount}</TableCell>
										<TableCell className="py-2">
											{user.transition_type}
										</TableCell>
										<TableCell className="py-2">
											<Badge variant={badgeFormat(user.payment_method)}>
												{user.payment_method}
											</Badge>
										</TableCell>
										<TableCell className="py-2">
											{user.coupon || 'Not Applied'}
										</TableCell>
										<TableCell className="py-2">{user.quantity}</TableCell>
										<TableCell className="py-2">{user.income}</TableCell>
										<TableCell className="py-2">
											<Badge
												className="capitalize"
												variant={badgeFormat(user.balance_type)}
											>
												{user.balance_type === '+' ? 'in' : 'out'}
											</Badge>
										</TableCell>
										<TableCell className="py-2">
											{dateFormat(user.created_at)} <br />
											{timeFormat(user.created_at)}
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Container1>
	);
}
