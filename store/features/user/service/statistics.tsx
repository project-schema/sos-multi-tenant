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
} from 'lucide-react'; // Added more icons
import { useUserServiceCountQuery } from './api-slice';

export function UserServiceStatistics() {
	const { data, isLoading, isError } = useUserServiceCountQuery(undefined);

	if (isLoading) {
		return <Loader2 />;
	}

	if (isError || !data) return null;

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-7 gap-4">
			<Card1
				title="Total Orders"
				countTitle={data?.all?.toString() || '0'}
				icon={PackageOpen}
				iconClassName="text-blue-600"
				className="bg-blue-100/60 border-blue-400"
			/>
			<Card1
				title="Pending"
				countTitle={data?.pending?.toString() || '0'}
				icon={Clock}
				iconClassName="text-yellow-600"
				className="bg-yellow-100/60 border-yellow-400"
			/>
			<Card1
				title="In Progress"
				countTitle={data?.progress?.toString() || '0'}
				icon={Loader}
				iconClassName="text-orange-600"
				className="bg-orange-100/60 border-orange-400"
			/>
			<Card1
				title="Revision"
				countTitle={data?.revision?.toString() || '0'}
				icon={FileEdit}
				iconClassName="text-purple-600"
				className="bg-purple-100/60 border-purple-400"
			/>
			<Card1
				title="Delivered"
				countTitle={data?.delivered?.toString() || '0'}
				icon={Truck}
				iconClassName="text-indigo-600"
				className="bg-indigo-100/60 border-indigo-400"
			/>
			<Card1
				title="Success"
				countTitle={data?.success?.toString() || '0'}
				icon={CheckCircle}
				iconClassName="text-green-600"
				className="bg-green-100/60 border-green-400"
			/>
			<Card1
				title="Canceled"
				countTitle={data?.canceled?.toString() || '0'}
				icon={XCircle}
				iconClassName="text-red-600"
				className="bg-red-100/60 border-red-400"
			/>
		</div>
	);
}
