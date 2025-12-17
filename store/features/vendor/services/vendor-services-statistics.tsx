'use client';

import { Card1, Loader2 } from '@/components/dashboard';
import { Clock, PackageCheck, TrendingUp } from 'lucide-react'; // Added more icons
import { useVendorServicesCountQuery } from './vendor-services-api-slice';

export function VendorServicesStatistics() {
	const { data, isLoading, isError } = useVendorServicesCountQuery(undefined);

	if (isLoading) {
		return <Loader2 />;
	}

	if (isError || !data) return null;
	const stats = data;

	return (
		<div className="grid grid-cols-2 md:grid-cols-3  max-w-2xl gap-4 pb-4">
			<Card1
				title="All Services"
				countTitle={stats.all?.toString() || '00'}
				icon={TrendingUp}
				iconClassName="text-purple-600"
				className="bg-purple-100/60 border-purple-400"
			/>
			<Card1
				title="Active"
				countTitle={stats.active?.toString() || '00'}
				icon={PackageCheck}
				iconClassName="text-emerald-600"
				className="bg-emerald-100/60 border-emerald-400"
			/>
			<Card1
				title="Pending Services"
				countTitle={stats.pending?.toString() || '00'}
				icon={Clock}
				iconClassName="text-yellow-600"
				className="bg-yellow-100/60 border-yellow-400"
			/>
		</div>
	);
}
