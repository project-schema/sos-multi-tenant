'use client';

import { Card1 } from '@/components/dashboard';
import {
	CircleAlert,
	CircleDashed,
	Clock,
	PackageCheck,
	ShoppingCart,
} from 'lucide-react';

export function VendorProductStatistics() {
	// if (isLoading) {
	// 	return <Loader2 />;
	// }

	// if (isError || !data) return null;
	const stats = {
		all: '10',
		hold: '10',
		pending: '10',
		progress: '10',
		received: '10',
		delivered: '10',
		cancelled: '10',
	};

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 gap-4 pb-4">
			<Card1
				title="All Support"
				countTitle={stats?.all?.toString() || '0'}
				icon={ShoppingCart}
				iconClassName="text-blue-600"
				className="bg-blue-100/60 border-blue-400 cursor-pointer"
			/>
			<Card1
				title="New Support"
				countTitle={stats?.hold?.toString() || '0'}
				icon={CircleAlert}
				iconClassName="text-gray-600"
				className="bg-gray-100/60 border-gray-400 cursor-pointer"
			/>
			<Card1
				title="Answered Support"
				countTitle={stats?.pending?.toString() || '0'}
				icon={Clock}
				iconClassName="text-yellow-600"
				className="bg-yellow-100/60 border-yellow-400 cursor-pointer"
			/>
			<Card1
				title="Replied Support"
				countTitle={stats?.progress?.toString() || '0'}
				icon={CircleDashed}
				iconClassName="text-purple-600"
				className="bg-purple-100/60 border-purple-400 cursor-pointer"
			/>
			<Card1
				title="Close Support"
				countTitle={stats?.received?.toString() || '0'}
				icon={PackageCheck}
				iconClassName="text-blue-600"
				className="bg-blue-100/60 border-blue-400 cursor-pointer"
			/>
		</div>
	);
}
