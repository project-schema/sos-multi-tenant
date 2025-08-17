import { apiSlice } from '../../api/apiSlice';
import { iSubCategoryResponse } from './sub-category.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewSubCategory: builder.query<
			iSubCategoryResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/view-subcategory?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminSubCategory'],
		}),

		// store
		adminStoreSubCategory: builder.mutation<
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
					url: `/store-subcategory`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminSubCategory'],
		}),

		// update
		adminUpdateSubCategory: builder.mutation<
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
					url: `/update-subcategory/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminSubCategory'],
		}),

		// delete
		adminDeleteSubCategory: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/delete-subcategory/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminSubCategory'],
		}),
	}),
});

export const {
	useAdminViewSubCategoryQuery,
	useAdminStoreSubCategoryMutation,
	useAdminDeleteSubCategoryMutation,
	useAdminUpdateSubCategoryMutation,
} = api;
