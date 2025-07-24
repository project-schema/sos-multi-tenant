import { apiSlice } from '../../api/apiSlice';
import {
	AdminUserStatisticType,
	iAllUserResponse,
	statusType,
	userType,
} from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		adminUserStatistics: builder.query<AdminUserStatisticType, any>({
			query: () => ({
				url: '/admin/user-statistics',
				method: 'GET',
			}),
			providesTags: ['AdminUserStatistics'],
		}),

		adminAllUser: builder.query<
			iAllUserResponse,
			{
				status?: statusType;
				userType?: userType;
				page?: number;
				search?: string;
			}
		>({
			query: (params) => ({
				url: `/all/user/${params.status}?type=${params.userType}&page=${params.page}&email=${params.search}`,
				method: 'GET',
				params,
			}),
			providesTags: ['AdminUserStatistics'],
		}),
	}),
});

export const { useAdminUserStatisticsQuery, useAdminAllUserQuery } = api;
