import { apiSlice } from '../../../api/apiSlice';
import { iOrganizationResponse } from './admin-organization.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewOrganization: builder.query<
			iOrganizationResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/organization?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminOrganization'],
		}),

		// store
		adminStoreOrganization: builder.mutation<
			{ status: 200; message: string },
			any
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/admin/organization`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminOrganization'],
		}),

		// update
		adminUpdateOrganization: builder.mutation<
			{ status: 200; message: string },
			any
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});
				body.append('_method', 'PUT');

				return {
					url: `/admin/organization/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminOrganization'],
		}),

		// delete
		adminDeleteOrganization: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/organization/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminOrganization'],
		}),
	}),
});

export const {
	useAdminViewOrganizationQuery,
	useAdminStoreOrganizationMutation,
	useAdminDeleteOrganizationMutation,
	useAdminUpdateOrganizationMutation,
} = api;
