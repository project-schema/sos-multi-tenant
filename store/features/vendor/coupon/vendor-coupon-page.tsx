'use client';

import { Container1 } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { badgeFormat, dateFormat, sign } from '@/lib';
import {
	useVendorCouponQuery,
	useVendorCouponRequestQuery,
} from './vendor-coupon-api-slice';
import { VendorCouponRequestModal } from './vendor-coupon-req-modal';

export function VendorCouponPage() {
	const { data, isLoading, isError } = useVendorCouponQuery(undefined);
	const {
		data: requestData,
		isLoading: requestLoading,
		isError: requestError,
	} = useVendorCouponRequestQuery(undefined);

	return (
		<Container1
			isLoading={isLoading || requestLoading}
			isError={isError || requestError}
			header={<CardTitle>Coupons</CardTitle>}
		>
			{data?.message.length === 0 && requestData?.status !== 200 && (
				<Card>
					<CardContent>
						<VendorCouponRequestModal />
					</CardContent>
				</Card>
			)}

			{requestData?.status === 200 && (
				<Card>
					<CardHeader>
						<CardTitle className="xl:text-md">Request Coupon</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto border rounded-lg">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Comment</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Date</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>{requestData?.message?.comments}</TableCell>
										<TableCell>
											<Badge
												className="capitalize"
												variant={badgeFormat(requestData?.message?.status)}
											>
												{requestData?.message?.status}
											</Badge>{' '}
											<br />
											{requestData?.message?.status === 'reject' && (
												<span className="text-destructive">
													{requestData?.message?.reason}
												</span>
											)}
										</TableCell>
										<TableCell>
											{dateFormat(requestData?.message?.created_at)}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			)}
			{data?.status === 200 && data.message.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle className="xl:text-md">Coupons</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto border rounded-lg">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Coupon Code</TableHead>
										<TableHead>Amount</TableHead>
										<TableHead>Commission</TableHead>
										<TableHead>Limitation</TableHead>
										<TableHead>Income</TableHead>
										<TableHead>Use</TableHead>
										<TableHead>Expire Date</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Date</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data?.message?.map((item) => (
										<TableRow key={item.id}>
											<TableCell>{item.name}</TableCell>
											<TableCell>{item.amount}</TableCell>
											<TableCell>
												{item.commission}{' '}
												{item.commission_type === 'flat'
													? sign.tk
													: sign.percent}
											</TableCell>
											<TableCell>{item.limitation}</TableCell>
											<TableCell>
												{item.couponused_sum_total_commission || '0'} {sign.tk}
											</TableCell>
											<TableCell>{item.couponused_count}</TableCell>
											<TableCell>{dateFormat(item.expire_date)}</TableCell>
											<TableCell>
												<Badge
													className="capitalize"
													variant={badgeFormat(item.status)}
												>
													{item.status}
												</Badge>
											</TableCell>
											<TableCell>{dateFormat(item.created_at)}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			)}
		</Container1>
	);
}
