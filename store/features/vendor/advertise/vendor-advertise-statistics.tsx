'use client';

import { Card1, Loader2 } from '@/components/dashboard';
import { Clock, PackageCheck, PackageX, TrendingUp } from 'lucide-react'; // Added more icons
import { useVendorAdvertiseCountQuery } from './vendor-advertise-api-slice';

export function VendorAdvertiseStatistics() {
	const { data, isLoading, isError } = useVendorAdvertiseCountQuery(undefined);

	if (isLoading) {
		return <Loader2 />;
	}

	if (isError || !data) return null;
	const stats: any = data;

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 pb-4">
			<Card1
				title="Advertisements"
				countTitle={stats.totaladvertise.toString()}
				icon={TrendingUp}
				iconClassName="text-purple-600"
				className="bg-purple-100/60 border-purple-400"
			/>
			<Card1
				title="Pending Ads"
				countTitle={stats.totalpendingadvertise.toString()}
				icon={Clock}
				iconClassName="text-yellow-600"
				className="bg-yellow-100/60 border-yellow-400"
			/>
			<Card1
				title="In Progress"
				countTitle={stats.totalprogressadvertise.toString()}
				icon={Clock}
				iconClassName="text-cyan-600"
				className="bg-cyan-100/60 border-cyan-400"
			/>
			<Card1
				title="Delivered"
				countTitle={stats.totaldeliveredadvertise.toString()}
				icon={PackageCheck}
				iconClassName="text-emerald-600"
				className="bg-emerald-100/60 border-emerald-400"
			/>
			<Card1
				title="Cancelled"
				countTitle={stats.totalcanceldadvertise.toString()}
				icon={PackageX}
				iconClassName="text-red-600"
				className="bg-red-100/60 border-red-400"
			/>
		</div>
	);
}
