'use client';

import { DbHeader, Loader5 } from '@/components/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { ErrorAlert } from '@/lib';
import {
	AdminSubscriptionCards,
	useAdminSubscriptionQuery,
} from '@/store/features/admin/subscription';
import { useState } from 'react';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Subscription' },
];

export default function Page() {
	const [userType, setUserType] = useState<'vendor' | 'affiliate'>('vendor');
	const [packageType, setPackageType] = useState<
		'monthly' | 'half_yearly' | 'yearly'
	>('half_yearly');

	const { data, isLoading, isError, isFetching } =
		useAdminSubscriptionQuery(undefined);

	if (isError) {
		return <ErrorAlert />;
	}

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="db-container space-y-6">
				<Card className="gap-0">
					<CardHeader className="pb-3 flex items-center justify-between">
						<CardTitle className="text-2xl font-bold">
							Subscription Plan
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Table */}
						{isLoading ? (
							<>
								<Loader5 />
								<Loader5 />
								<Loader5 />
								<Loader5 />
							</>
						) : (
							<>
								<div className="flex items-center justify-center gap-3 mb-5">
									<p className="me-3 text-xl">Merchant</p>
									<Switch
										className="scale-150"
										id="payment-schedule"
										checked={userType === 'affiliate'}
										onCheckedChange={(checked) =>
											setUserType(checked ? 'affiliate' : 'vendor')
										}
									/>

									<p className="relative ms-3 text-xl">Dropshipper</p>
								</div>
								<RadioGroup
									className="flex items-center justify-center gap-4 mb-7"
									value={packageType}
									onValueChange={(value) =>
										setPackageType(
											value as 'monthly' | 'half_yearly' | 'yearly'
										)
									}
								>
									<div className="flex items-center gap-2">
										<RadioGroupItem value="monthly" id="r1" />
										<Label htmlFor="r1">Monthly</Label>
									</div>
									<div className="flex items-center gap-2">
										<RadioGroupItem value="half_yearly" id="r2" />
										<Label htmlFor="r2">Half Yearly</Label>
									</div>
									<div className="flex items-center gap-2">
										<RadioGroupItem value="yearly" id="r3" />
										<Label htmlFor="r3">Yearly</Label>
									</div>
								</RadioGroup>
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
									{data?.data
										?.filter(
											(item) =>
												item.subscription_user_type === userType &&
												item.subscription_package_type === packageType
										)
										?.map((item) => (
											<AdminSubscriptionCards item={item} key={item.id} />
										))}
								</div>
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</>
	);
}
