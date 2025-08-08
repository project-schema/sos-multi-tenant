import { apiSlice } from '../../api/apiSlice';
import { iAdminRole, iAdminRoleSingleRes } from './role-permission-type';

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

		// get single
		// admin/role-with-permission/68
		adminRoleWithPermission: builder.query<iAdminRoleSingleRes, { id: number }>(
			{
				query: ({ id }) => ({
					url: `/admin/role-with-permission/${id}`,
					method: 'GET',
				}),
				providesTags: ['AdminRole'],
			}
		),
		// admin/update-role/68
		adminUpdateRole: builder.mutation<
			{ message: string; status: number; data: any; success: boolean },
			{ role: string; id: number; permission: string[] }
		>({
			query: (body) => ({
				url: `/admin/update-role/${body.id}`,
				method: 'POST',
				body: {
					role: body.role,
					permission: body.permission,
				},
			}),
			invalidatesTags: ['AdminRole'],
		}),

		// admin/delete-role/70
		adminDeleteRole: builder.mutation<
			{ message: string; status: number; data: any; success: boolean },
			{ id: number }
		>({
			query: ({ id }) => ({
				url: `/admin/delete-role/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminRole'],
		}),
	}),
});

export const {
	useAdminRoleCreateMutation,
	useAdminAllRoleQuery,
	useAdminUpdateRoleMutation,
	useAdminDeleteRoleMutation,
	useAdminRoleWithPermissionQuery,
} = api;
