import { apiSlice } from '../../api/apiSlice';
import { iCrmServiceResponse } from './crm-admin-service.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewCrmService: builder.query<
			iCrmServiceResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/service?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['CrmAdminService'],
		}),

		// store
		adminStoreCrmService: builder.mutation<
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
					url: `/admin/service`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['CrmAdminService'],
		}),

		// update
		adminUpdateCrmService: builder.mutation<
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
					url: `/admin/service/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['CrmAdminService'],
		}),

		// delete
		adminDeleteCrmService: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/service/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['CrmAdminService'],
		}),
	}),
});

export const {
	useAdminViewCrmServiceQuery,
	useAdminStoreCrmServiceMutation,
	useAdminDeleteCrmServiceMutation,
	useAdminUpdateCrmServiceMutation,
} = api;
