import { apiSlice } from '../../api/apiSlice';
import { iAdminManager } from './admin-manager-permissions-type';
/*
{
    "name": "test",
    "email": "ert@sdfsd.bg",
    "number": "erer",
    "c_password": "234",
    "password": "234",
    "role": 50
}
*/
const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		adminManagerCreate: builder.mutation<
			{ message: string; status: number; data: any; success: boolean },
			any
		>({
			query: (body) => ({
				url: `/admin/add-manager`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['AdminManager'],
		}),

		// /admin/all-roll
		adminAllManagerList: builder.query<iAdminManager[], undefined>({
			query: () => ({
				url: `/admin/all-manager-list`,
				method: 'GET',
			}),
			providesTags: ['AdminManager'],
		}),

		// update manager
		adminUpdateManager: builder.mutation<
			{ message: string; status: number; data: any; success: boolean },
			any
		>({
			query: (body) => ({
				url: `/admin/update-manager-data/${body.id}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['AdminManager'],
		}),

		// delete manager
		adminDeleteManager: builder.mutation<
			{ message: string; status: number; data: any; success: boolean },
			{ id: number }
		>({
			query: (body) => ({
				url: `/admin/delete-manager/${body.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminManager'],
		}),
	}),
});

export const {
	useAdminManagerCreateMutation,
	useAdminAllManagerListQuery,
	useAdminUpdateManagerMutation,
	useAdminDeleteManagerMutation,
} = api;
