'use client';

import { Card1, Loader6 } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { checkCoupon, dateFormat, sign } from '@/lib';
import {
	Box,
	CalendarClock,
	Globe,
	Layers,
	MessageCircle,
	PackageCheck,
	Send,
	ShoppingCart,
	Store,
	ThumbsUp,
	Users,
	Wrench,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useVendorProfileInfoQuery } from './vendor-profile-api-slice';

export function VendorUserSubscription() {
	const { data: session } = useSession();
	const { data, isLoading, isError } = useVendorProfileInfoQuery(undefined);

	const subscription = data?.usersubscription ?? data?.user?.usersubscription;
	const isMerchant = session?.tenant_type === 'merchant';
	const isDropshipper = session?.tenant_type === 'dropshipper';

	if (isLoading) {
		return (
			<div className="space-y-4">
				<Loader6 />
				<Loader6 />
			</div>
		);
	}

	if (isError || !data) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Something went wrong</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-destructive">
						Please try again later or contact support.
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
					<p className="text-sm text-muted-foreground">
						You do not have an active subscription plan yet.
					</p>
				</CardContent>
			</Card>
		);
	}

	const expireDate = checkCoupon(subscription.subscription_id)
		? 'Life Time'
		: dateFormat(subscription.expire_date);

	return (
		<div className="space-y-6">
			<div>
				<h5 className="mb-4 text-lg font-semibold text-gray-800">
					Subscription Package:{' '}
					<Badge variant="success" className="ml-2 uppercase">
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
				<h5 className="mb-4 text-lg font-semibold text-gray-800">
					Subscription Information
				</h5>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<Card1
						title="Subscription Price"
						countTitle={`${subscription.subscription_price || 0} ${sign.tk}`}
						icon={PackageCheck}
						iconClassName="text-violet-600"
						className="bg-violet-100/55 border-violet-400"
					/>
					<Card1
						title="Expire Date"
						countTitle={expireDate}
						icon={CalendarClock}
						iconClassName="text-emerald-600"
						className="bg-emerald-100/55 border-emerald-400"
					/>

					{isMerchant && (
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
								title="POS Sale Qty"
								countTitle={subscription.pos_sale_qty || 'No'}
								icon={Store}
								iconClassName="text-blue-600"
								className="bg-blue-100/55 border-blue-400"
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

					{isDropshipper && (
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
								title="Chat Access"
								countTitle={subscription.chat_access || 'No'}
								icon={MessageCircle}
								iconClassName="text-purple-600"
								className="bg-purple-100/55 border-purple-400"
							/>
						</>
					)}

					<Card1
						title="Website Create"
						countTitle={subscription.has_website || 'No'}
						icon={Globe}
						iconClassName="text-orange-600"
						className="bg-orange-100/55 border-orange-400"
					/>
					<Card1
						title="Website Visits"
						countTitle={subscription.website_visits || 'No'}
						icon={Users}
						iconClassName="text-emerald-600"
						className="bg-emerald-100/55 border-emerald-400"
					/>
					<Card1
						title="Already Visits"
						countTitle={subscription.already_visits || 'No'}
						icon={Users}
						iconClassName="text-cyan-600"
						className="bg-cyan-100/55 border-cyan-400"
					/>
				</div>
			</div>
		</div>
	);
}
