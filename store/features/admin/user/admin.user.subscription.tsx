'use client';

import { Card1, Loader6 } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { checkCoupon, dateFormat } from '@/lib';
import {
	Box,
	CalendarClock,
	Layers,
	MessageCircle,
	PackageCheck,
	Send,
	ShoppingCart,
	ThumbsUp,
	Users,
	Wrench,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useAdminVendorProfileByIdQuery } from './admin.user.api.slice';

export function AdminUserSubscription() {
	const { id } = useParams();
	const { data, isLoading, isError } = useAdminVendorProfileByIdQuery({
		id: id as string,
	});

	const subscription = data?.vendor?.usersubscription;
	const isVendor = data?.vendor.role_as === '2';
	const isDropShipper = data?.vendor?.role_as === '3';
	if (isLoading) {
		return (
			<div className="space-y-4">
				<Loader6 />
				<Loader6 />
			</div>
		);
	}

	if ((isError || !data) && !isLoading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Some thing went wrong</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-destructive">
						Please try again later. or contact to support
					</p>
				</CardContent>
			</Card>
		);
	}
	if (!subscription) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>No Subscription</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-destructive">
						This user has no subscription
					</p>
				</CardContent>
			</Card>
		);
	}
	const expireDate = checkCoupon(subscription?.subscription_id)
		? 'Life Time'
		: dateFormat(subscription?.expire_date);

	return (
		<div>
			<div className="space-y-6">
				<div>
					<h5 className="text-lg font-semibold text-gray-800 mb-4">
						Subscription Package:{' '}
						<Badge variant={'success'} className="ml-2 uppercase">
							{subscription.subscription?.card_heading}
						</Badge>
					</h5>
					<Card1
						title="Active Package"
						countTitle={subscription.subscription?.card_heading}
						icon={PackageCheck}
						iconClassName="text-green-600"
						className="bg-green-100/55 border-green-400"
					/>
				</div>

				<div>
					<h5 className="text-lg font-semibold text-gray-800 mb-4">
						Subscription Information:
					</h5>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{isVendor && (
							<>
								<Card1
									title="Max Drop Shipper Request"
									countTitle={subscription.affiliate_request}
									icon={Send}
									iconClassName="text-sky-600"
									className="bg-sky-100/55 border-sky-400"
								/>
								<Card1
									title="Max Service Quantity"
									countTitle={subscription.service_qty}
									icon={Wrench}
									iconClassName="text-amber-600"
									className="bg-amber-100/55 border-amber-400"
								/>
								<Card1
									title="Max Product Quantity"
									countTitle={subscription.product_qty}
									icon={Box}
									iconClassName="text-rose-600"
									className="bg-rose-100/55 border-rose-400"
								/>
								<Card1
									title="Expire Date"
									countTitle={expireDate}
									icon={CalendarClock}
									iconClassName="text-emerald-600"
									className="bg-emerald-100/55 border-emerald-400"
								/>
								<Card1
									title="Chat Access"
									countTitle={subscription.chat_access || 'No'}
									icon={MessageCircle}
									iconClassName="text-indigo-600"
									className="bg-indigo-100/55 border-indigo-400"
								/>
								<Card1
									title="Employee Create"
									countTitle={subscription.employee_create || 'No'}
									icon={Users}
									iconClassName="text-orange-600"
									className="bg-orange-100/55 border-orange-400"
								/>
							</>
						)}

						{isDropShipper && (
							<>
								<Card1
									title="Max Product Request"
									countTitle={subscription.product_request}
									icon={ShoppingCart}
									iconClassName="text-pink-600"
									className="bg-pink-100/55 border-pink-400"
								/>
								<Card1
									title="Max Product Approve"
									countTitle={subscription.product_approve}
									icon={ThumbsUp}
									iconClassName="text-lime-600"
									className="bg-lime-100/55 border-lime-400"
								/>
								<Card1
									title="Max Service Create"
									countTitle={subscription.service_create}
									icon={Layers}
									iconClassName="text-cyan-600"
									className="bg-cyan-100/55 border-cyan-400"
								/>
								<Card1
									title="Expire Date"
									countTitle={expireDate}
									icon={CalendarClock}
									iconClassName="text-teal-600"
									className="bg-teal-100/55 border-teal-400"
								/>
								<Card1
									title="Chat Access"
									countTitle={subscription.chat_access || 'No'}
									icon={MessageCircle}
									iconClassName="text-purple-600"
									className="bg-purple-100/55 border-purple-400"
								/>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
