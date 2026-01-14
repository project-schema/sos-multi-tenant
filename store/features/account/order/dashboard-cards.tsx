'use client';
import { Package } from 'lucide-react';
import { useGetOrdersQuery } from './api-slice';

export function OrderDashboardCards() {
	const { data, isLoading, isError } = useGetOrdersQuery();
	if (isLoading)
		return (
			<div className="border rounded-md overflow-hidden">
				<div className="p-8 text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
					<p className="mt-2 text-gray-600">Loading orders...</p>
				</div>
			</div>
		);
	if (isError) return <div>Error loading orders</div>;

	const allOrders = data?.all_order || 0;
	const pendingOrders = data?.pending_order || 0;
	const completedOrders = data?.completed_order || 0;
	const canceledOrders = data?.cancelled_order || 0;
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
			<StatCard title="All Orders" count={allOrders} />
			<StatCard title="All Orders" count={pendingOrders} />
			<StatCard title="Completed Order" count={completedOrders} />
			<StatCard title="Canceled Order" count={canceledOrders} />
			<StatCard title="Pending Order" count={pendingOrders} />
		</div>
	);
}
function StatCard({ title, count }: { title: string; count: number }) {
	return (
		<div className="flex items-center gap-4 border rounded-xl p-5 bg-white">
			<div className="w-12 h-12 rounded-lg bg-black text-white flex items-center justify-center">
				<Package className="w-6 h-6" />
			</div>
			<div>
				<p className="text-sm text-gray-600">{title}</p>
				<p className="text-2xl font-bold">{count}</p>
			</div>
		</div>
	);
}
