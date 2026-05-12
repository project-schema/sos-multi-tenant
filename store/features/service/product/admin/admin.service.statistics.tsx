'use client';

import { Card1, Loader2 } from '@/components/dashboard';
import { Briefcase, CheckCircle, Clock, XCircle } from 'lucide-react'; // Changed icons to better suit "services"
import { useAdminVendorServiceStatisticsQuery } from './admin.service.api.slice';

export function AdminServiceStatistics() {
	const { data, isLoading, isError } =
		useAdminVendorServiceStatisticsQuery(undefined);

	if (isLoading) {
		return <Loader2 />;
	}

	if (isError || !data) return null;
	const stats = data.message;

	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-2 lg:gap-4">
			<Card1
				title="Services"
				countTitle={stats.totalservice.toString()}
				icon={Briefcase}
				iconClassName="text-blue-600"
				className="bg-blue-100/60 border-blue-400"
			/>
			<Card1
				title="Active"
				countTitle={stats.totalactiveservice.toString()}
				icon={CheckCircle}
				iconClassName="text-green-600"
				className="bg-green-100/60 border-green-400"
			/>
			<Card1
				title="Pending"
				countTitle={stats.totalpendingservice.toString()}
				icon={Clock}
				iconClassName="text-yellow-600"
				className="bg-yellow-100/60 border-yellow-400"
			/>
			<Card1
				title="Rejected"
				countTitle={stats.totalrejectedservice.toString()}
				icon={XCircle}
				iconClassName="text-red-600"
				className="bg-red-100/60 border-red-400"
			/>
		</div>
	);
}
