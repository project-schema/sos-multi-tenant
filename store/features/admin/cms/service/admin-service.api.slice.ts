import { apiSlice } from '../../../api/apiSlice';
import { iServiceResponse } from './admin-service.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewService: builder.query<
			iServiceResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/service?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminService'],
		}),

		// store
		adminStoreService: builder.mutation<{ status: 200; message: string }, any>({
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
			invalidatesTags: ['AdminService'],
		}),

		// update
		adminUpdateService: builder.mutation<{ status: 200; message: string }, any>(
			{
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
				invalidatesTags: ['AdminService'],
			}
		),

		// delete
		adminDeleteService: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/service/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminService'],
		}),
	}),
});

export const {
	useAdminViewServiceQuery,
	useAdminStoreServiceMutation,
	useAdminDeleteServiceMutation,
	useAdminUpdateServiceMutation,
} = api;
