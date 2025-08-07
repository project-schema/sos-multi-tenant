import { apiSlice } from '../../api/apiSlice';
import { iAdminRole } from './role-permission-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		adminRoleCreate: builder.mutation<
			{ message: string; status: number; data: any; success: boolean },
			any
		>({
			query: (body) => ({
				url: `/admin/create-role`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['AdminRole'],
		}),

		// /admin/all-roll
		adminAllRole: builder.query<iAdminRole[], undefined>({
			query: () => ({
				url: `/admin/all-roll`,
				method: 'GET',
			}),
			providesTags: ['AdminRole'],
		}),
	}),
});

export const { useAdminRoleCreateMutation, useAdminAllRoleQuery } = api;
