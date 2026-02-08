import { apiSlice } from '@/store/features/api/apiSlice';
import { iCategoryResponse } from './category.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		CmsViewCategory: builder.query<
			iCategoryResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/tenant-news-category?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminCategory'],
		}),

		// store
		CmsStoreCategory: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/tenant-news-category/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminCategory'],
		}),

		// update
		CmsUpdateCategory: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/tenant-news-category/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminCategory'],
		}),

		// delete
		CmsDeleteCategory: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-news-category/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminCategory'],
		}),
	}),
});

export const {
	useCmsViewCategoryQuery,
	useCmsStoreCategoryMutation,
	useCmsDeleteCategoryMutation,
	useCmsUpdateCategoryMutation,
} = api;
