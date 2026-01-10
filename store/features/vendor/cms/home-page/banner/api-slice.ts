import { apiSlice } from '@/store/features/api/apiSlice';
import { iBannerResponse } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all banners
		tenantViewBanner: builder.query<iBannerResponse, { page: number | string }>(
			{
				query: ({ page }) => ({
					url: `/tenant/banner?page=${page}`,
					method: 'GET',
				}),
				providesTags: ['TenantBanner'],
			}
		),

		// store banner
		tenantStoreBanner: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value !== undefined && value !== null) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/tenant/banner`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['TenantBanner'],
		}),

		// update banner
		tenantUpdateBanner: builder.mutation<{ status: 200; message: string }, any>(
			{
				query: (data) => {
					const body = new FormData();
					Object.entries(data).forEach(([key, value]) => {
						if (value !== undefined && value !== null) {
							body.append(key, value as string);
						}
					});

					return {
						url: `/tenant/banner/${data.id}`,
						method: 'POST',
						body,
						formData: true,
					};
				},
				invalidatesTags: ['TenantBanner'],
			}
		),

		// delete banner
		tenantDeleteBanner: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant/banner/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['TenantBanner'],
		}),
	}),
});

export const {
	useTenantViewBannerQuery,
	useTenantStoreBannerMutation,
	useTenantUpdateBannerMutation,
	useTenantDeleteBannerMutation,
} = api;
