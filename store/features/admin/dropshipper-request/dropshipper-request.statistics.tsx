'use client';

import { Card1, Loader2 } from '@/components/dashboard';
import { CheckCircle, Clock, ShoppingCart, XCircle } from 'lucide-react';
import { useAdminAffiliateProductStatisticsQuery } from './dropshipper-request.api.slice';

export function DropshipperProductStatistics() {
	const { data, isLoading, isError } =
		useAdminAffiliateProductStatisticsQuery(undefined);

	if (isLoading) {
		return <Loader2 />;
	}

	if (isError || !data) return null;
	const stats = data.message;

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-4">
			<Card1
				title="All Requested"
				countTitle={stats?.totalrequest.toString()}
				icon={ShoppingCart}
				iconClassName="text-blue-600"
				className="bg-blue-100/60 border-blue-400"
			/>
			<Card1
				title="Active"
				countTitle={stats?.totalactiverequest.toString()}
				icon={CheckCircle}
				iconClassName="text-green-600"
				className="bg-green-100/60 border-green-400"
			/>
			<Card1
				title="Pending"
				countTitle={stats?.totalpendingrequest.toString()}
				icon={Clock}
				iconClassName="text-yellow-600"
				className="bg-yellow-100/60 border-yellow-400"
			/>

			<Card1
				title="Rejected"
				countTitle={stats?.totalrejectedrequest.toString()}
				icon={XCircle}
				iconClassName="text-red-600"
				className="bg-red-100/60 border-red-400"
			/>
		</div>
	);
}
