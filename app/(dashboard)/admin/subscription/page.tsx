'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
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

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Subscription Plan</CardTitle>}
			>
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
						setPackageType(value as 'monthly' | 'half_yearly' | 'yearly')
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
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
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
			</Container1>
		</>
	);
}
