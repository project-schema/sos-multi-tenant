import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from 'process';

const baseQuery = fetchBaseQuery({
	baseUrl: `${env.baseAPI || 'http://[::1]:9099'}/api/v1/`,
	prepareHeaders: async (headers) => {
		headers.set('Authorization', `Bearer `);

		return headers;
	},
});

export const TAG_TYPES = [
	'dev-permission-category',
	'Tasks',
	'dev-permission-sub-category',
] as const;

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery,
	endpoints: () => ({}),
	refetchOnReconnect: true,
	refetchOnFocus: true,
	tagTypes: TAG_TYPES as unknown as string[],
	keepUnusedDataFor: 50000,
});
