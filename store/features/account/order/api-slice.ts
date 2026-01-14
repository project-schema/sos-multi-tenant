import { apiSlice } from '@/store/features/api/apiSlice';
import { iOrderResponse } from './type';

const orderApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getOrders: builder.query<iOrderResponse, void>({
			query: () => ({
				url: '/tenant-frontend/dashboard/orders',
				method: 'GET',
			}),
			providesTags: ['AccountOrders'],
		}),
	}),
});

export const { useGetOrdersQuery } = orderApi;
