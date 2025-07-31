import { apiSlice } from '../api/apiSlice';
import { iCategoryResponse } from './category.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewCategory: builder.query<
			iCategoryResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/view-category?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminCategory'],
		}),

		// store
		adminStoreCategory: builder.mutation<{ status: 200; message: string }, any>(
			{
				query: (data) => {
					const body = new FormData();
					Object.entries(data).forEach(([key, value]) => {
						if (value) {
							body.append(key, value as string);
						}
					});

					return {
						url: `/store-category`,
						method: 'POST',
						body,
						formData: true,
					};
				},
				invalidatesTags: ['AdminCategory'],
			}
		),

		// update
		adminUpdateCategory: builder.mutation<
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
					url: `/update-category/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminCategory'],
		}),

		// delete
		adminDeleteCategory: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/delete-category/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminCategory'],
		}),
	}),
});

export const {
	useAdminViewCategoryQuery,
	useAdminStoreCategoryMutation,
	useAdminDeleteCategoryMutation,
	useAdminUpdateCategoryMutation,
} = api;
