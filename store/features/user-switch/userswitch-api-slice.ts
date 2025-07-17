import { apiSlice } from '../api/apiSlice';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		userSwitch: builder.query<any, any>({
			query: (data) => ({
				url: 'https://jsonplaceholder.typicode.com/posts',
				method: 'GET',
			}),
		}),
	}),
});

export const { useUserSwitchQuery } = api;
