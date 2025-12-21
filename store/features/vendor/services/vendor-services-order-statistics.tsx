'use client';

import { Card1, Loader2 } from '@/components/dashboard';
import {
	CheckCircle,
	Clock,
	FileEdit,
	PackageCheck,
	PackageX,
	TrendingUp,
} from 'lucide-react'; // Added more icons
import { useVendorServicesOrderCountQuery } from './vendor-services-api-slice';

export function VendorServicesOrderStatistics() {
	const { data, isLoading, isError } =
		useVendorServicesOrderCountQuery(undefined);

	if (isLoading) {
		return <Loader2 />;
	}

	if (isError || !data) return null;
	const stats = data;

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 pb-4">
			<Card1
				title="All Services"
				countTitle={stats.all?.toString() || '00'}
				icon={TrendingUp}
				iconClassName="text-purple-600"
				className="bg-purple-100/60 border-purple-400"
			/>
			<Card1
				title="Pending Services"
				countTitle={stats.pending?.toString() || '00'}
				icon={Clock}
				iconClassName="text-yellow-600"
				className="bg-yellow-100/60 border-yellow-400"
			/>
			<Card1
				title="In Progress"
				countTitle={stats.progress?.toString() || '00'}
				icon={Clock}
				iconClassName="text-cyan-600"
				className="bg-cyan-100/60 border-cyan-400"
			/>
			<Card1
				title="Delivered"
				countTitle={stats.delivered?.toString() || '00'}
				icon={PackageCheck}
				iconClassName="text-emerald-600"
				className="bg-emerald-100/60 border-emerald-400"
			/>
			<Card1
				title="Revision"
				countTitle={stats.revision?.toString() || '00'}
				icon={FileEdit}
				iconClassName="text-purple-600"
				className="bg-purple-100/60 border-purple-400"
			/>

			<Card1
				title="Success"
				countTitle={stats.success?.toString() || '00'}
				icon={CheckCircle}
				iconClassName="text-green-600"
				className="bg-green-100/60 border-green-400"
			/>
			<Card1
				title="Cancelled"
				countTitle={stats.canceled?.toString() || '00'}
				icon={PackageX}
				iconClassName="text-red-600"
				className="bg-red-100/60 border-red-400"
			/>
		</div>
	);
}
