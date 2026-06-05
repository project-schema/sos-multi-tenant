import { apiSlice } from '../../api/apiSlice';
import type { DropshipperDashboardData } from './dropshipper-dashboard-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDropshipperDashboard: builder.query<DropshipperDashboardData, void>({
			query: () => ({
				url: '/tenant-dashboard/statistics',
				method: 'GET',
			}),
			providesTags: ['DropshipperDashboard'],
		}),
	}),
});

export const { useGetDropshipperDashboardQuery } = api;
