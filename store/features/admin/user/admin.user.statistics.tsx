'use client';

import { Card1, Loader2 } from '@/components/dashboard';
import { SquareUser, Users } from 'lucide-react';
import { useAdminUserStatisticsQuery } from './admin.user.api.slice';

export function AdminUserStatistics() {
	const { data, isLoading, isError } = useAdminUserStatisticsQuery(undefined);

	if (isLoading) {
		return <Loader2 />;
	}

	if (isError || !data) return null;
	const stats = data.message;

	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
			<Card1
				title="All Members"
				countTitle={stats?.totalmember?.toString()}
				icon={SquareUser}
				iconClassName="text-blue-600"
				className="bg-blue-100/60 border-blue-400"
			/>
			<Card1
				title="All Vendors"
				countTitle={stats?.totalvendor?.toString()}
				icon={Users}
				iconClassName="text-green-600"
				className="bg-green-100/60 border-green-400"
			/>
			<Card1
				title="All Affiliates"
				countTitle={stats?.totalaffiliate?.toString()}
				icon={Users}
				iconClassName="text-yellow-600"
				className="bg-yellow-100/60 border-yellow-400"
			/>

			<Card1
				title="All Users"
				countTitle={stats?.totaluser?.toString()}
				icon={Users}
				iconClassName="text-gray-600"
				className="bg-gray-100/60 border-gray-400"
			/>
		</div>
	);
}
