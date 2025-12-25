import { apiSlice } from '@/store/features/api/apiSlice';
import { iUserAdvertiseResponse, iUserAdvertiseStatistics } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		UserAdvertise: builder.query<
			iUserAdvertiseResponse,
			{ page: number | string; search: string }
		>({
			query: ({ page, search }) => ({
				url: '/user/all-advertise',
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
				url: '/user/create-advertise',
				method: 'POST',
				body: data,
				formData: true,
			}),
		}),

		// count
		UserAdvertiseCount: builder.query<iUserAdvertiseStatistics, void>({
			query: () => '/advertise/count',
		}),

		// view
		UserAdvertiseView: builder.query<any, { id: string }>({
			query: ({ id }) => `/user/advertise/${id}`,
		}),
	}),
});

export const {
	useUserAdvertiseQuery,
	useUserAdvertiseCreateMutation,
	useUserAdvertiseCountQuery,
	useUserAdvertiseViewQuery,
} = api;
