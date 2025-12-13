'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Badge } from '@/components/ui/badge';
import { CardContent, CardTitle } from '@/components/ui/card';
import { badgeFormat, dateFormat, tableSrCount, timeFormat } from '@/lib';
import { useState } from 'react';
import { useUserTransitionHistoryQuery } from './user-profile-api-slice';

export function UserHistory() {
	const [page, setPage] = useState(1);
	const {
		data: historyData,
		isLoading,
		isError,
		isFetching,
	} = useUserTransitionHistoryQuery({
		page,
	});

	return (
		<>
			<Container1
				isLoading={isLoading}
				isError={isError}
				header={<CardTitle>History</CardTitle>}
			>
				<CardContent className="space-y-4">
					<div className="border rounded-lg relative">
						{isFetching && <Loader8 />}
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="bg-stone-100">SL. </TableHead>
									<TableHead className="bg-stone-100">Transition ID </TableHead>
									<TableHead className="bg-stone-100">Amount </TableHead>
									<TableHead className="bg-stone-100">
										Transition Type
									</TableHead>
									<TableHead className="bg-stone-100">Payment Method</TableHead>
									<TableHead className="bg-stone-100">Coupon </TableHead>
									<TableHead className="bg-stone-100">
										Balance Statement
									</TableHead>
									<TableHead className="bg-stone-100">Date</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{historyData?.data.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={11}
											className="text-center py-8 text-muted-foreground"
										>
											No users found matching your criteria
										</TableCell>
									</TableRow>
								) : (
									historyData?.data?.map((user, i) => (
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
					{historyData && (
						<Pagination1 pagination={historyData} setPage={setPage} />
					)}
				</CardContent>
			</Container1>
		</>
	);
}
