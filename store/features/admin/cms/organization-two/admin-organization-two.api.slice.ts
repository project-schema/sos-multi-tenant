import { apiSlice } from '../../../api/apiSlice';
import { iCrmOrganizationTwoResponse } from './admin-organization-two.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewCrmOrganizationTwo: builder.query<
			iCrmOrganizationTwoResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/organizationTwo?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['CrmAdminOrganizationTwo'],
		}),

		// store
		adminStoreCrmOrganizationTwo: builder.mutation<
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
					url: `/admin/organizationTwo`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['CrmAdminOrganizationTwo'],
		}),

		// update
		adminUpdateCrmOrganizationTwo: builder.mutation<
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
					url: `/admin/organizationTwo/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['CrmAdminOrganizationTwo'],
		}),

		// delete
		adminDeleteCrmOrganizationTwo: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/organizationTwo/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['CrmAdminOrganizationTwo'],
		}),
	}),
});

export const {
	useAdminViewCrmOrganizationTwoQuery,
	useAdminStoreCrmOrganizationTwoMutation,
	useAdminDeleteCrmOrganizationTwoMutation,
	useAdminUpdateCrmOrganizationTwoMutation,
} = api;
