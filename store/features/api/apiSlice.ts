import { env } from '@/lib';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: `${env.baseAPI}/api`,
	prepareHeaders: async (headers) => {
		headers.set('Authorization', `Bearer ${env.token}`);
		return headers;
	},
});

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery,
	endpoints: () => ({}),
	refetchOnReconnect: true,
	refetchOnFocus: true,
	tagTypes: ['UserProfile', 'AdminUserStatistics'],
	keepUnusedDataFor: 50000,
});
