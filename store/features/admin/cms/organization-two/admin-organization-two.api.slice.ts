import { apiSlice } from '../../../api/apiSlice';
import { iOrganizationTwoResponse } from './admin-organization-two.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewOrganizationTwo: builder.query<
			iOrganizationTwoResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/organizationTwo?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminOrganizationTwo'],
		}),

		// store
		adminStoreOrganizationTwo: builder.mutation<
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
			invalidatesTags: ['AdminOrganizationTwo'],
		}),

		// update
		adminUpdateOrganizationTwo: builder.mutation<
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
			invalidatesTags: ['AdminOrganizationTwo'],
		}),

		// delete
		adminDeleteOrganizationTwo: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/organizationTwo/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminOrganizationTwo'],
		}),
	}),
});

export const {
	useAdminViewOrganizationTwoQuery,
	useAdminStoreOrganizationTwoMutation,
	useAdminDeleteOrganizationTwoMutation,
	useAdminUpdateOrganizationTwoMutation,
} = api;
