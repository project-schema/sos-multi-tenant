import { apiSlice } from '../../api/apiSlice';
import { VendorDashboardData } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getVendorDashboard: builder.query<VendorDashboardData, void>({
			query: () => ({
				url: '/tenant-dashboard/statistics',
				method: 'GET',
			}),
			providesTags: ['VendorDashboard'],
		}),
	}),
});

export const { useGetVendorDashboardQuery } = api;
