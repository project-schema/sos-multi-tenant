import { apiSlice } from '../../api/apiSlice';
import {
	iAdminAdvertiseResponse,
	iAdminAdvertiseStatistics,
} from './admin.advertise.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminAdvertise: builder.query<
			iAdminAdvertiseResponse,
			{ page: number | string; search: string }
		>({
			query: ({ page, search }) => {
				return {
					url: `/admin/advertise?page=${page}&search=${search}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminAdvertise'],
		}),

		// statistics
		adminAdvertiseStatistics: builder.query<
			iAdminAdvertiseStatistics,
			undefined
		>({
			query: () => ({
				url: `/admin/advertise-order-statistics`,
				method: 'GET',
			}),
			providesTags: ['AdminAdvertise'],
		}),

		// delete
		adminDeleteAdvertise: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/delete-product/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminAdvertise'],
		}),
	}),
});

export const {
	useAdminAdvertiseQuery,
	useAdminAdvertiseStatisticsQuery,
	useAdminDeleteAdvertiseMutation,
} = api;
