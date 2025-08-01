import { apiSlice } from '../api/apiSlice';
import { iServiceSubCategoryResponse } from './service-sub-category.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewServiceSubCategory: builder.query<
			iServiceSubCategoryResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/service-sub-category?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminServiceSubCategory'],
		}),

		// store
		adminStoreServiceSubCategory: builder.mutation<
			{ status: 200; message: string; data: 'success' },
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
					url: `/admin/service-sub-category`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminServiceSubCategory'],
		}),

		// update
		adminUpdateServiceSubCategory: builder.mutation<
			{ status: 200; message: string; data: 'success' },
			any
		>({
			query: (data) => {
				return {
					url: `/admin/service-sub-category/${data.id}`,
					method: 'PUT',
					body: data,
				};
			},
			invalidatesTags: ['AdminServiceSubCategory'],
		}),

		// delete
		adminDeleteServiceSubCategory: builder.mutation<
			{ status: 200; message: string; data: 'success' },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/service-sub-category/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminServiceSubCategory'],
		}),
	}),
});

export const {
	useAdminViewServiceSubCategoryQuery,
	useAdminStoreServiceSubCategoryMutation,
	useAdminDeleteServiceSubCategoryMutation,
	useAdminUpdateServiceSubCategoryMutation,
} = api;
