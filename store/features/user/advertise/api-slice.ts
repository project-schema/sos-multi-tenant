import { apiSlice } from '@/store/features/api/apiSlice';
import { iUserAdvertiseResponse, iUserAdvertiseStatistics } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		UserAdvertise: builder.query<
			iUserAdvertiseResponse,
			{ page: number | string; search: string }
		>({
			query: ({ page, search }) => ({
				url: '/all-advertise',
				method: 'GET',
				params: { page, search },
			}),
		}),

		// create-advertise
		UserAdvertiseCreate: builder.mutation<
			{ status: 200; message: string },
			any
		>({
			query: (data) => ({
				url: '/advertise',
				method: 'POST',
				body: data,
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

export const {
	useUserAdvertiseQuery,
	useUserAdvertiseCountQuery,
	useUserAdvertiseViewQuery,
} = api;
