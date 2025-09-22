'use client';

import { Card1, Loader2 } from '@/components/dashboard';
import {
	CheckCircle,
	CircleAlert,
	CircleDashed,
	Clock,
	PackageCheck,
	ShoppingCart,
	XCircle,
} from 'lucide-react';
import { useVendorProductOrderAllQuery } from './vendor-product-order-api-slice';
import { iVendorProductOrderStatistics } from './vendor-product-order-type';

export function VendorProductStatistics({
	setStatusFilter,
}: {
	setStatusFilter: (status: string) => void;
}) {
	const { data, isLoading, isError } = useVendorProductOrderAllQuery({
		status: 'count',
		page: 1,
		search: '',
	});

	if (isLoading) {
		return <Loader2 />;
	}

	if (isError || !data) return null;
	const stats = data as unknown as iVendorProductOrderStatistics;

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 gap-4 pb-4">
			<Card1
				title="All Orders"
				countTitle={stats?.all?.toString() || '0'}
				icon={ShoppingCart}
				iconClassName="text-blue-600"
				className="bg-blue-100/60 border-blue-400 cursor-pointer"
				cardClick={() => setStatusFilter('all')}
			/>
			<Card1
				title="Hold Orders"
				countTitle={stats?.hold?.toString() || '0'}
				icon={CircleAlert}
				iconClassName="text-gray-600"
				className="bg-gray-100/60 border-gray-400 cursor-pointer"
				cardClick={() => setStatusFilter('hold')}
			/>
			<Card1
				title="Pending Orders"
				countTitle={stats?.pending?.toString() || '0'}
				icon={Clock}
				iconClassName="text-yellow-600"
				className="bg-yellow-100/60 border-yellow-400 cursor-pointer"
				cardClick={() => setStatusFilter('pending')}
			/>
			<Card1
				title="In Progress"
				countTitle={stats?.progress?.toString() || '0'}
				icon={CircleDashed}
				iconClassName="text-purple-600"
				className="bg-purple-100/60 border-purple-400 cursor-pointer"
				cardClick={() => setStatusFilter('progress')}
			/>
			<Card1
				title="Received Orders"
				countTitle={stats?.received?.toString() || '0'}
				icon={PackageCheck}
				iconClassName="text-blue-600"
				className="bg-blue-100/60 border-blue-400 cursor-pointer"
				cardClick={() => setStatusFilter('received')}
			/>
			<Card1
				title="Delivered Orders"
				countTitle={stats?.delivered?.toString() || '0'}
				icon={CheckCircle}
				iconClassName="text-green-600"
				className="bg-green-100/60 border-green-400 cursor-pointer"
				cardClick={() => setStatusFilter('delivered')}
			/>
			<Card1
				title="Cancelled Orders"
				countTitle={stats?.cancel?.toString() || '0'}
				icon={XCircle}
				iconClassName="text-red-600"
				className="bg-red-100/60 border-red-400 cursor-pointer"
				cardClick={() => setStatusFilter('cancelled')}
			/>
		</div>
	);
}
