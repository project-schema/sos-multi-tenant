import { apiSlice } from '../../api/apiSlice';
import {
	iAdminAdvertiseDetail,
	iAdminAdvertiseResponse,
	iAdminAdvertiseStatistics,
	iAdminVendorAdvertise,
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

		// view advertise
		// admin/advertise/id
		adminViewAdvertise: builder.query<
			{ status: 200; product: iAdminAdvertiseDetail },
			{ id: number | string }
		>({
			query: ({ id }) => {
				return {
					url: `/admin/advertise/${id}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminAdvertise'],
		}),

		// admin/vendor/advertise/
		adminVendorAdvertise: builder.query<
			iAdminVendorAdvertise,
			{ id: number | string; page: number }
		>({
			query: ({ id, page }) => {
				return {
					url: `/admin/vendor/advertise/${id}?page=${page}`,
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
				url: `/admin/advertise/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminAdvertise'],
		}),

		// admin/advertise/status
		adminAdvertiseStatus: builder.mutation<
			{ status: 200; message: string },
			{ advertise_id: string | number }
		>({
			query: (data) => ({
				url: `/admin/advertise/status`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['AdminAdvertise'],
		}),

		// admin/advertise/delivery
		adminAdvertiseDelivery: builder.mutation<
			{ status: 200; message: string },
			{ advertise_id: string | number; images: any }
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (key === 'images') {
						for (let i = 0; i < value.length; i++) {
							body.append('files[]', value[i] as string);
						}
					}
					if (key === 'advertise_id') {
						body.append('advertise_id', value as string);
					}
				});
				return {
					url: `/admin/advertise/delivery`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminAdvertise'],
		}),

		// /admin/advertise/cancel
		adminAdvertiseCancel: builder.mutation<
			{ status: 200; message: string },
			{
				advertise_id: string | number;
				reason: string;
				cost_balance: number;
				return_balance: number;
			}
		>({
			query: (data) => ({
				url: `/admin/advertise/cancel`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['AdminAdvertise'],
		}),
	}),
});

export const {
	useAdminAdvertiseQuery,
	useAdminViewAdvertiseQuery,
	useAdminAdvertiseStatisticsQuery,
	useAdminDeleteAdvertiseMutation,
	useAdminVendorAdvertiseQuery,
	useAdminAdvertiseStatusMutation,
	useAdminAdvertiseDeliveryMutation,
	useAdminAdvertiseCancelMutation,
} = api;
