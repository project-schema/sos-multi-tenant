import { apiSlice } from '../../api/apiSlice';
import { iCrmITServiceResponse } from './crm-admin-it-service.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewCrmITService: builder.query<
			iCrmITServiceResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/it-service?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['CrmAdminITService'],
		}),

		// store
		adminStoreCrmITService: builder.mutation<
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
					url: `/admin/it-service`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['CrmAdminITService'],
		}),

		// update
		adminUpdateCrmITService: builder.mutation<
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
					url: `/admin/it-service/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['CrmAdminITService'],
		}),

		// delete
		adminDeleteCrmITService: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/it-service/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['CrmAdminITService'],
		}),
	}),
});

export const {
	useAdminViewCrmITServiceQuery,
	useAdminStoreCrmITServiceMutation,
	useAdminDeleteCrmITServiceMutation,
	useAdminUpdateCrmITServiceMutation,
} = api;
