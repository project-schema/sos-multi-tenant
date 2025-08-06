'use client';

import { Card1, Loader2 } from '@/components/dashboard';
import {
	CheckCircle,
	Clock,
	Loader,
	PackageOpen,
	ShoppingCart,
	Truck,
	XCircle,
} from 'lucide-react';
import { useAdminOrderStatisticsQuery } from './product-order.api.slice';

export function AdminProductOrderStatistics() {
	const { data, isLoading, isError } = useAdminOrderStatisticsQuery(undefined);

	if (isLoading) {
		return (
			<div className="px-6 mb-6">
				<Loader2 />
			</div>
		);
	}

	if (isError || !data) return null;

	const stats = data.message;

	return (
		<div className="grid grid-cols-7 gap-4">
			<Card1
				title="All Orders"
				countTitle={stats?.totalorder?.toString()}
				icon={ShoppingCart}
				iconClassName="text-blue-600"
				className="bg-blue-100/60 border-blue-400"
			/>
			<Card1
				title="Hold Orders"
				countTitle={stats?.totalholdorder?.toString()}
				icon={Loader}
				iconClassName="text-purple-600"
				className="bg-purple-100/60 border-purple-400"
			/>
			<Card1
				title="Pending Orders"
				countTitle={stats?.totalpendingorder?.toString()}
				icon={Clock}
				iconClassName="text-yellow-600"
				className="bg-yellow-100/60 border-yellow-400"
			/>
			<Card1
				title="Received Orders"
				countTitle={stats?.totalreceivedorder?.toString()}
				icon={CheckCircle}
				iconClassName="text-green-700"
				className="bg-green-100/60 border-green-400"
			/>
			<Card1
				title="In Progress"
				countTitle={stats?.totalprogressorder?.toString()}
				icon={PackageOpen}
				iconClassName="text-orange-600"
				className="bg-orange-100/60 border-orange-400"
			/>
			<Card1
				title="Delivered"
				countTitle={stats?.totaldeliveredorder?.toString()}
				icon={Truck}
				iconClassName="text-indigo-600"
				className="bg-indigo-100/60 border-indigo-400"
			/>
			<Card1
				title="Cancelled"
				countTitle={stats?.totalcancelorder?.toString()}
				icon={XCircle}
				iconClassName="text-red-600"
				className="bg-red-100/60 border-red-400"
			/>
		</div>
	);
}
