import { apiSlice } from '../../api/apiSlice';
import {
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
				url: `/delete-product/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminService'],
		}),
	}),
});

export const {
	useAdminVendorServiceQuery,
	useAdminVendorServiceStatisticsQuery,
	useAdminDeleteServiceMutation,
} = api;
