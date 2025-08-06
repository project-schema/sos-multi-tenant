'use client';

import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib';
import { CheckIcon, X } from 'lucide-react';
import { EditSubscriptionFeature } from './admin.subscription-edit-feature-modal';
import { UpdateAdminSubscription } from './admin.subscription-update-modal';
import { iAdminSubscription } from './admin.subscription.type';

export function AdminSubscriptionCards({ item }: { item: iAdminSubscription }) {
	return (
		<Card className="flex flex-col relative">
			<CardHeader className="pb-2">
				{item?.suggest?.toString() === '1' && (
					<Badge
						className={cn(
							'uppercase w-fit self-center mb-3 absolute top-2 right-2'
						)}
					>
						Most popular
					</Badge>
				)}
				<CardTitle className="mb-4">
					<span className="text-xl">৳{item?.subscription_amount || '00'}</span>{' '}
					<sub className="text-gray-500">
						/{item?.subscription_package_type?.replace(/_/, ' ')}
					</sub>
				</CardTitle>
				<span className="font-bold uppercase text-3xl">
					{item?.card_heading || ''}
				</span>
			</CardHeader>
			<CardContent className="flex-1">
				<h3 className="text-lg font-semibold">You Will Get:</h3>
				<ul className="mt-3 space-y-2.5 text-sm mb-4">
					<GetA title="Drop Shipper Request" value={item?.affiliate_request} />
					<GetA title="Product Quantity" value={item?.product_qty} />
					<GetA title="Service Quantity" value={item?.service_qty} />
					<GetA title="Product Request" value={item?.product_request} />
					<GetA title="Product Approve" value={item?.product_approve} />
					<GetA title="Service Create" value={item?.service_create} />
					<GetA title="Pos Sell Qty" value={item?.pos_sale_qty} />
					<GetA title="Chat Access" value={item?.chat_access ? 'Yes' : 'No'} />
					{item?.subscription_user_type === 'vendor' && (
						<GetA
							title="Employee Create"
							value={item?.employee_create ? 'Yes' : 'No'}
						/>
					)}
				</ul>
				<EditSubscriptionFeature data={item} />
				<h3 className="text-lg font-semibold mt-7">Features Included :</h3>
				<ul className="mt-3 space-y-2.5 text-sm">
					{item?.card_facilities_title?.map((facility, index) => (
						<GetB key={index} facility={facility} />
					))}
				</ul>
			</CardContent>
			<CardFooter>
				<UpdateAdminSubscription data={item} />
			</CardFooter>
		</Card>
	);
}

const GetA = ({
	title,
	value,
}: {
	title: string;
	value: string | null | number;
}) => {
	return (
		value !== null && (
			<li className="flex space-x-2">
				<CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
				<div className="flex justify-between w-full">
					<span>{title}:</span>
					<span>{value}</span>
				</div>
			</li>
		)
	);
};
const GetB = ({ facility }: { facility: { value: string; key: string } }) => {
	return (
		<li className="flex space-x-2">
			{facility.key === 'yes' ? (
				<CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
			) : (
				<X className="flex-shrink-0 mt-0.5 h-4 w-4" />
			)}
			<span className={facility.key === 'yes' ? '' : 'text-muted-foreground'}>
				{facility.value}
			</span>
		</li>
	);
};
