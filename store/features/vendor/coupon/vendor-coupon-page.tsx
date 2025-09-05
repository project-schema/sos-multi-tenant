'use client';

import { Container1 } from '@/components/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { dateFormat } from '@/lib';
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
									<TableCell>{requestData?.message?.status}</TableCell>
									<TableCell>
										{dateFormat(requestData?.message?.created_at)}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			)}
		</Container1>
	);
}
