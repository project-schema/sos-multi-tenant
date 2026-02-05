import { useGetOrdersQuery } from './api-slice';
import { iOrder } from './type';

export function OrdersTable() {
	const { data, isLoading, error } = useGetOrdersQuery();

	if (isLoading) {
		return (
			<div className="border rounded-md overflow-hidden">
				<div className="p-8 text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
					<p className="mt-2 text-gray-600">Loading orders...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="border rounded-md overflow-hidden">
				<div className="p-8 text-center text-red-600">
					<p>Failed to load orders. Please try again.</p>
				</div>
			</div>
		);
	}

	const orders = data?.orders || [];

	const getStatusColor = (status: string) => {
		switch (status?.toLowerCase()) {
			case 'pending':
				return 'bg-yellow-100 text-yellow-700';
			case 'processing':
				return 'bg-blue-100 text-blue-700';
			case 'completed':
				return 'bg-green-100 text-green-700';
			case 'cancelled':
				return 'bg-red-100 text-red-700';
			default:
				return 'bg-gray-100 text-gray-700';
		}
	};

	const getPaymentStatusColor = (status: string) => {
		switch (status?.toLowerCase()) {
			case 'paid':
				return 'bg-green-100 text-green-700';
			case 'unpaid':
				return 'bg-red-100 text-red-700';
			case 'partial':
				return 'bg-yellow-100 text-yellow-700';
			default:
				return 'bg-gray-100 text-gray-700';
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	const capitalizeFirst = (str: string) => {
		return str?.charAt(0).toUpperCase() + str?.slice(1);
	};

	return (
		<div className="border rounded-md overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full text-sm text-left">
					<thead className="bg-gray-50 text-gray-700 font-semibold">
						<tr>
							<th className="px-4 py-3 whitespace-nowrap">ORDER #</th>
							<th className="px-4 py-3">TOTAL</th>
							<th className="px-4 py-3 whitespace-nowrap">ORDER STATUS</th>
							<th className="px-4 py-3 whitespace-nowrap">PAYMENT STATUS</th>
							<th className="px-4 py-3 whitespace-nowrap">DATE</th>
							<th className="px-4 py-3 text-right">ACTIONS</th>
						</tr>
					</thead>
					<tbody className="divide-y">
						{orders.length === 0 ? (
							<tr>
								<td colSpan={6} className="px-4 py-8 text-center text-gray-500">
									No orders found
								</td>
							</tr>
						) : (
							orders.map((order: iOrder) => (
								<tr key={order.id} className="hover:bg-gray-50">
									<td className="px-4 py-3 whitespace-nowrap">
										{order.order_id}
									</td>
									<td className="px-4 py-3">{order.total}৳</td>
									<td className="px-4 py-3">
										<span
											className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
												order.status
											)}`}
										>
											{capitalizeFirst(order.status)}
										</span>
									</td>
									<td className="px-4 py-3">
										<span
											className={`px-2 py-1 rounded text-xs font-medium ${getPaymentStatusColor(
												order.payment_status
											)}`}
										>
											{capitalizeFirst(order.payment_status)}
										</span>
									</td>
									<td className="px-4 py-3 whitespace-nowrap">
										{formatDate(order.created_at)}
									</td>
									<td className="px-4 py-3 text-right">
										<button className="border rounded px-3 py-1 text-sm hover:bg-gray-50 transition-colors">
											Details
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
