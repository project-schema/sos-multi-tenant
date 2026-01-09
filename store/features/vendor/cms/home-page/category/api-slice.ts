import { apiSlice } from '@/store/features/api/apiSlice';
import { iHomePageCategoryResponse } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all home page categories
		tenantViewHomePageCategory: builder.query<iHomePageCategoryResponse, { page: number | string }>(
			{
				query: ({ page }) => ({
					url: `/tenant/cms/home-page-categories?page=${page}`,
					method: 'GET',
				}),
				providesTags: ['TenantHomePageCategory'],
			}
		),

		// store home page category
		tenantStoreHomePageCategory: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => ({
				url: `/tenant/cms/home-page-categories`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['TenantHomePageCategory'],
		}),

		// update home page category
		tenantUpdateHomePageCategory: builder.mutation<{ status: 200; message: string }, any>(
			{
				query: (data) => ({
					url: `/tenant/cms/home-page-categories/${data.id}`,
					method: 'PUT',
					body: data,
				}),
				invalidatesTags: ['TenantHomePageCategory'],
			}
		),

		// delete home page category
		tenantDeleteHomePageCategory: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant/cms/home-page-categories/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['TenantHomePageCategory'],
		}),
	}),
});

export const {
	useTenantViewHomePageCategoryQuery,
	useTenantStoreHomePageCategoryMutation,
	useTenantUpdateHomePageCategoryMutation,
	useTenantDeleteHomePageCategoryMutation,
} = api;