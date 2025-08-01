import { apiSlice } from '../../api/apiSlice';
import {
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
	}),
});

export const {
	useAdminServiceOrderStatisticsQuery,
	useAdminServiceOrderQuery,
} = api;
