import { apiSlice } from '../../api/apiSlice';
import {
	iAdminProductOrderResponse,
	iAdminProductOrderStatistics,
} from './product-order.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminProductOrder: builder.query<
			iAdminProductOrderResponse,
			{ page: number | string; search: string; status: string }
		>({
			query: ({ page, search, status }) => {
				/*
				api/admin/all-orders?page=null&search=
				api/admin/hold-orders?page=null&search=
				api/admin/pending-orders?page=null&search=
				api/admin/received-orders?page=null&search=
				api/admin/progress-orders?page=null&search=
				api/admin/delivered-orders?page=null&search=
				api/admin/cancel-orders?page=null&search=

 
				*/
				if (!status) {
					status = 'all';
				}

				return {
					url: `/admin/${status}-orders?page=${page}&search=${search}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminProductOrder'],
		}),

		// statistics
		adminOrderStatistics: builder.query<
			iAdminProductOrderStatistics,
			undefined
		>({
			query: () => ({
				url: `/admin/manage-productorder-statistics`,
				method: 'GET',
			}),
			providesTags: ['AdminProductOrder'],
		}),

		/* order status  
			hold
				cancel
				pending
			pending
			 received
				cancel
			received
				processing
				cancel
			processing
				ready
				cancel
			ready
				progress
				cancel
			progress
				delivered
		*/

		adminProductOrderUpdate: builder.mutation<
			{ message: string; status: number },
			any
		>({
			query: (body) => ({
				url: `/admin/order/update/${body.id}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['AdminProductOrder'],
		}),
	}),
});

export const {
	useAdminOrderStatisticsQuery,
	useAdminProductOrderQuery,
	useAdminProductOrderUpdateMutation,
} = api;
