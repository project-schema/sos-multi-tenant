import { apiSlice } from '../../api/apiSlice';
import {
	iAdminServiceOrderResponse,
	iAdminServiceResponse,
	iAdminServiceStatistics,
} from './admin.service.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminVendorService: builder.query<
			iAdminServiceResponse,
			{ page: number | string; search: string }
		>({
			query: ({ page, search }) => {
				return {
					url: `/admin/vendor-services?page=${page}&search=${search}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminService'],
		}),

		// /admin/vendor/service/order/724?page
		adminVendorServiceOrder: builder.query<
			iAdminServiceOrderResponse,
			{ id: number | string; page: number }
		>({
			query: ({ id, page }) => {
				return {
					url: `/admin/vendor/service/order/${id}?page=${page}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminService'],
		}),

		// statistics
		adminVendorServiceStatistics: builder.query<
			iAdminServiceStatistics,
			undefined
		>({
			query: () => ({
				url: `/admin/manage-service-statistics`,
				method: 'GET',
			}),
			providesTags: ['AdminService'],
		}),

		// delete
		adminDeleteService: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/vendor-services/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminService'],
		}),

		// /admin/vendor-services/ update
		adminUpdateVendorService: builder.mutation<
			{ status: 200; message: string; data: 'success' },
			{
				id: string | number;
				status: 'active' | 'rejected' | 'pending';
				reason?: string | null;
				commission: number;
			}
		>({
			query: (data) => ({
				url: `/admin/vendor-services/${data.id}`,
				body: data,
				method: 'PUT',
			}),
			invalidatesTags: ['AdminService'],
		}),
	}),
});

export const {
	useAdminVendorServiceQuery,
	useAdminVendorServiceStatisticsQuery,
	useAdminVendorServiceOrderQuery,
	useAdminDeleteServiceMutation,
	useAdminUpdateVendorServiceMutation,
} = api;
