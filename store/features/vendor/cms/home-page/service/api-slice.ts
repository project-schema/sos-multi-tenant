import { apiSlice } from '@/store/features/api/apiSlice';
import { iServiceResponse } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all services
		tenantViewService: builder.query<
			iServiceResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/tenant/content-service?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminService'],
		}),

		// store service
		tenantStoreService: builder.mutation<{ status: string; message: string }, any>(
			{
				query: (data) => {
					const body = new FormData();
					Object.entries(data).forEach(([key, value]) => {
						if (value !== undefined && value !== null) {
							body.append(key, value as string);
						}
					});

					return {
						url: `/tenant/content-service`,
						method: 'POST',
						body,
						formData: true,
					};
				},
				invalidatesTags: ['AdminService'],
			}
		),

		// update service
		tenantUpdateService: builder.mutation<
			{ status: string; message: string },
			any
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value !== undefined && value !== null) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/tenant/content-service/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminService'],
		}),

		// delete service
		tenantDeleteService: builder.mutation<
			{ status: string; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant/content-service/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminService'],
		}),
	}),
});

export const {
	useTenantViewServiceQuery,
	useTenantStoreServiceMutation,
	useTenantUpdateServiceMutation,
	useTenantDeleteServiceMutation,
} = api;
