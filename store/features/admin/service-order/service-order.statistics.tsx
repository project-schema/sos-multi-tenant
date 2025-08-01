'use client';

import { Card1, Loader2 } from '@/components/dashboard';
import {
	CheckCircle,
	Clock,
	FileEdit,
	Loader,
	PackageOpen,
	Truck,
	XCircle,
} from 'lucide-react';
import { useAdminServiceOrderStatisticsQuery } from './service-order.api.slice';

export function AdminServiceOrderStatistics() {
	const { data, isLoading, isError } =
		useAdminServiceOrderStatisticsQuery(undefined);

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
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 pb-4 ml-6">
			<Card1
				title="Total Orders"
				countTitle={stats.totalserviceorder.toString()}
				icon={PackageOpen}
				iconClassName="text-blue-600"
				className="bg-blue-100/60 border-blue-400"
			/>
			<Card1
				title="Pending"
				countTitle={stats.totalpendingservice.toString()}
				icon={Clock}
				iconClassName="text-yellow-600"
				className="bg-yellow-100/60 border-yellow-400"
			/>
			<Card1
				title="In Progress"
				countTitle={stats.totalprogressservice.toString()}
				icon={Loader}
				iconClassName="text-orange-600"
				className="bg-orange-100/60 border-orange-400"
			/>
			<Card1
				title="Revision"
				countTitle={stats.totalrevisionservice.toString()}
				icon={FileEdit}
				iconClassName="text-purple-600"
				className="bg-purple-100/60 border-purple-400"
			/>
			<Card1
				title="Delivered"
				countTitle={stats.totaldeliveredservice.toString()}
				icon={Truck}
				iconClassName="text-indigo-600"
				className="bg-indigo-100/60 border-indigo-400"
			/>
			<Card1
				title="Success"
				countTitle={stats.totalsuccessservice.toString()}
				icon={CheckCircle}
				iconClassName="text-green-600"
				className="bg-green-100/60 border-green-400"
			/>
			<Card1
				title="Canceled"
				countTitle={stats.totalcanceledservice.toString()}
				icon={XCircle}
				iconClassName="text-red-600"
				className="bg-red-100/60 border-red-400"
			/>
		</div>
	);
}
