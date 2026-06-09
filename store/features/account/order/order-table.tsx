'use client';

import { Badge } from '@/components/ui/badge';
import {
	badgeFormat,
	changeOrderStatusText,
	dateFormat,
	sign,
} from '@/lib';
import { useGetOrdersQuery } from './api-slice';
import { OrderDetailsModal, OrderReviewButton } from './order-details-modal';
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

	return (
		<div className="border rounded-md overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full text-sm text-left">
					<thead className="bg-gray-50 text-gray-700 font-semibold">
						<tr>
							<th className="px-4 py-3 whitespace-nowrap">ORDER #</th>
							<th className="px-4 py-3">PRODUCT</th>
							<th className="px-4 py-3">TOTAL</th>
							<th className="px-4 py-3 whitespace-nowrap">ORDER STATUS</th>
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
									<td className="px-4 py-3 whitespace-nowrap font-medium">
										#{order.order_id}
									</td>
									<td className="px-4 py-3">
										{order.product?.name || '—'}
									</td>
									<td className="px-4 py-3">
										{order.due_amount}
										{sign.tk}
									</td>
									<td className="px-4 py-3">
										<Badge
											className="capitalize"
											variant={badgeFormat(order.status)}
										>
											{changeOrderStatusText(order.status)}
										</Badge>
									</td>
									<td className="px-4 py-3 whitespace-nowrap">
										{dateFormat(order.created_at)}
									</td>
									<td className="px-4 py-3">
										<div className="flex items-center justify-end gap-2">
											<OrderReviewButton order={order} />
											<OrderDetailsModal order={order} />
										</div>
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
