'use client';

import { Card1, Loader2 } from '@/components/dashboard';
import {
	CheckCircle,
	Clock,
	Pencil,
	ShoppingCart,
	XCircle,
} from 'lucide-react';
import { useVendorProductCountQuery } from './vendor-product-api-slice';

export function VendorProductStatistics() {
	const { data, isLoading, isError } = useVendorProductCountQuery(undefined);

	if (isLoading) {
		return <Loader2 />;
	}

	if (isError || !data) return null;
	const stats = data?.count;

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4 pb-4">
			<Card1
				title="Products"
				countTitle={stats?.total?.toString() || '0'}
				icon={ShoppingCart}
				iconClassName="text-blue-600"
				className="bg-blue-100/60 border-blue-400"
			/>
			<Card1
				title="Active"
				countTitle={stats?.active?.toString() || '0'}
				icon={CheckCircle}
				iconClassName="text-green-600"
				className="bg-green-100/60 border-green-400"
			/>
			<Card1
				title="Pending"
				countTitle={stats?.pending?.toString() || '0'}
				icon={Clock}
				iconClassName="text-yellow-600"
				className="bg-yellow-100/60 border-yellow-400"
			/>
			<Card1
				title="Edited"
				countTitle={stats?.edited?.toString() || '0'}
				icon={Pencil}
				iconClassName="text-purple-600"
				className="bg-purple-100/60 border-purple-400"
			/>
			<Card1
				title="Rejected"
				countTitle={stats?.rejected?.toString() || '0'}
				icon={XCircle}
				iconClassName="text-red-600"
				className="bg-red-100/60 border-red-400"
			/>
		</div>
	);
}
