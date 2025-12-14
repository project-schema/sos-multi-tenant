import { apiSlice } from '@/store/features/api/apiSlice';
import { iUserAdvertiseResponse, iUserAdvertiseStatistics } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		UserServiceOrder: builder.query<
			iUserAdvertiseResponse,
			{ page: number | string; search: string }
		>({
			query: ({ page, search }) => ({
				url: '/service/orders',
				method: 'GET',
				params: { page, search },
			}),
		}),

		// count
		UserAdvertiseCount: builder.query<iUserAdvertiseStatistics, void>({
			query: () => '/advertise/count',
		}),

		// view
		UserAdvertiseView: builder.query<any, { id: string }>({
			query: ({ id }) => `/advertise/${id}`,
		}),
	}),
});

export const { useUserServiceOrderQuery } = api;
