import { apiSlice } from '@/store/features/api/apiSlice';
import { iServiceResponse } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all services
		tenantViewService: builder.query<iServiceResponse, { page: number | string }>(
			{
				query: ({ page }) => ({
					url: `/tenant/cms/services?page=${page}`,
					method: 'GET',
				}),
				providesTags: ['TenantService'],
			}
		),

		// store service
		tenantStoreService: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value !== undefined && value !== null) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/tenant/cms/services`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['TenantService'],
		}),

		// update service
		tenantUpdateService: builder.mutation<{ status: 200; message: string }, any>(
			{
				query: (data) => {
					const body = new FormData();
					Object.entries(data).forEach(([key, value]) => {
						if (value !== undefined && value !== null) {
							body.append(key, value as string);
						}
					});

					return {
						url: `/tenant/cms/services/${data.id}`,
						method: 'POST',
						body,
						formData: true,
					};
				},
				invalidatesTags: ['TenantService'],
			}
		),

		// delete service
		tenantDeleteService: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant/cms/services/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['TenantService'],
		}),
	}),
});

export const {
	useTenantViewServiceQuery,
	useTenantStoreServiceMutation,
	useTenantUpdateServiceMutation,
	useTenantDeleteServiceMutation,
} = api;