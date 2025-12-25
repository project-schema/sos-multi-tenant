import { apiSlice } from '@/store/features/api/apiSlice';
import { iAdminServiceOrder } from '../../admin/service';
import { iUserAdvertiseStatistics, iUserServiceOrderResponse } from './type';
const data = {
	all: 12,
	success: 0,
	delivered: 0,
	revision: 0,
	pending: 7,
	canceled: 0,
	progress: 0,
};
const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		UserServiceOrder: builder.query<
			iUserServiceOrderResponse,
			{ page: number | string; search: string }
		>({
			query: ({ page, search }) => ({
				url: '/service/order',
				method: 'GET',
				params: { page, search },
			}),
			providesTags: ['AdminService'],
		}),

		UserSingleServiceOrder: builder.query<
			{ message: iAdminServiceOrder; status: number; data: 'success' },
			{ id: number | string }
		>({
			query: ({ id }) => ({
				url: `/service/order/${id}`,
				method: 'GET',
			}),
			providesTags: ['AdminService'],
		}),

		// service count
		UserServiceCount: builder.query<
			{
				all: number;
				success: number;
				delivered: number;
				revision: number;
				pending: number;
				canceled: number;
				progress: number;
			},
			void
		>({
			query: () => '/service-buy-count',
			providesTags: ['AdminService'],
		}),

		// count
		UserAdvertiseCount: builder.query<iUserAdvertiseStatistics, void>({
			query: () => '/advertise/count',
			providesTags: ['AdminService'],
		}),

		// view
		UserAdvertiseView: builder.query<any, { id: string }>({
			query: ({ id }) => `/advertise/${id}`,
			providesTags: ['AdminService'],
		}),

		UserServiceOrderRevisionRequest: builder.mutation<
			{ message: string; status: number; data: 'success' },
			{ service_order_id: number | string; order_delivery_id: number | string }
		>({
			query: ({ service_order_id, order_delivery_id }) => ({
				url: `/service/order/status`,
				method: 'POST',
				body: {
					service_order_id,
					order_delivery_id,
					status: 'revision',
				},
			}),
			invalidatesTags: ['AdminService'],
		}),

		UserServiceOrderDeliverySuccess: builder.mutation<
			{ message: string; status: number; data: 'success' },
			{ order_delivery_id: number | string; service_order_id: number | string }
		>({
			query: ({ order_delivery_id, service_order_id }) => ({
				url: `/service/order/status`,
				method: 'POST',
				body: {
					order_delivery_id,
					service_order_id,
					status: 'success',
				},
			}),
			invalidatesTags: ['AdminService'],
		}),

		// rating store
		UserServiceRating: builder.mutation<
			{ message: string; status: number; data: 'success' },
			{
				service_order_id: number | string;
				rating: number;
				comment: string;
				vendor_service_id: number | string;
			}
		>({
			query: ({ service_order_id, rating, comment, vendor_service_id }) => ({
				url: `/service-rating`,
				method: 'POST',
				body: {
					service_order_id,
					rating,
					comment,
					vendor_service_id,
				},
			}),
			invalidatesTags: ['AdminService'],
		}),
	}),
});

export const {
	useUserServiceOrderQuery,
	useUserServiceCountQuery,
	useUserSingleServiceOrderQuery,
	useUserServiceOrderRevisionRequestMutation,
	useUserServiceOrderDeliverySuccessMutation,
	useUserServiceRatingMutation,
} = api;
