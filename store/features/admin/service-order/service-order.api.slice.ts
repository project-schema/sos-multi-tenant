import { apiSlice } from '../../api/apiSlice';
import {
	iAdminServiceOrder,
	iAdminServiceOrderResponse,
	iAdminServiceOrderStatistics,
} from './service-order.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminServiceOrder: builder.query<
			iAdminServiceOrderResponse,
			{ page: number | string; search: string }
		>({
			query: ({ page, search }) => {
				return {
					url: `/admin/customer-orders?page=${page}&search=${search}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminServiceOrder'],
		}),

		// statistics
		adminServiceOrderStatistics: builder.query<
			iAdminServiceOrderStatistics,
			undefined
		>({
			query: () => ({
				url: `/admin/service-order-statistics`,
				method: 'GET',
			}),
			providesTags: ['AdminServiceOrder'],
		}),

		adminServiceOrderStatusUpdate: builder.mutation<
			{ message: string; status: number; data: 'success' },
			{ id: number; status: iAdminServiceOrder['status'] }
		>({
			query: (body) => ({
				url: `/admin/customer-orders/${body.id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['AdminServiceOrder'],
		}),

		/* status update 
			"service_order_id": 22,
    		"status": "cancel_request",
    		"reason": "Test"
		*/
		adminServiceOrderStatus: builder.mutation<
			{ message: string; status: number; data: 'success' },
			{
				service_order_id: number | string;
				reason?: string;
				status: 'cancel_request';
			}
		>({
			query: (body) => ({
				url: `/service/status`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['AdminServiceOrder'],
		}),
		/* api/cancel-other-serviceorder-request
    	"service_order_id": 28,
    	"status": "0" */

		adminCancelServiceOrderRequest: builder.mutation<
			{ message: string; status: number; data: 'success' },
			{
				service_order_id: number | string;
				status: '0' | '1';
			}
		>({
			query: (body) => ({
				url: `/cancel-other-serviceorder-request`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['AdminServiceOrder'],
		}),
	}),
});

export const {
	useAdminServiceOrderStatisticsQuery,
	useAdminServiceOrderQuery,
	useAdminServiceOrderStatusUpdateMutation,
	useAdminServiceOrderStatusMutation,
	useAdminCancelServiceOrderRequestMutation,
} = api;
