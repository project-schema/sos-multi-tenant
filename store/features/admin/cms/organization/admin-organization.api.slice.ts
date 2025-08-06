import { apiSlice } from '../../../api/apiSlice';
import { iCrmOrganizationResponse } from './admin-organization.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewCrmOrganization: builder.query<
			iCrmOrganizationResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/organization?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['CrmAdminOrganization'],
		}),

		// store
		adminStoreCrmOrganization: builder.mutation<
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
			invalidatesTags: ['CrmAdminOrganization'],
		}),

		// update
		adminUpdateCrmOrganization: builder.mutation<
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
			invalidatesTags: ['CrmAdminOrganization'],
		}),

		// delete
		adminDeleteCrmOrganization: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/organization/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['CrmAdminOrganization'],
		}),
	}),
});

export const {
	useAdminViewCrmOrganizationQuery,
	useAdminStoreCrmOrganizationMutation,
	useAdminDeleteCrmOrganizationMutation,
	useAdminUpdateCrmOrganizationMutation,
} = api;
