import { apiSlice } from '../api/apiSlice';
import { iSupportSubCategoryResponse } from './support-sub-category.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewSupportSubCategory: builder.query<
			iSupportSubCategoryResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/supportproblem-topic?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminSupportSubCategory'],
		}),

		// store
		adminStoreSupportSubCategory: builder.mutation<
			{ status: 200; message: string; success: boolean },
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
					url: `/admin/supportproblem-topic`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminSupportSubCategory'],
		}),

		// update
		adminUpdateSupportSubCategory: builder.mutation<
			{ status: 200; message: string; success: boolean },
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
					url: `/admin/supportproblem-topic/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminSupportSubCategory'],
		}),

		// delete
		adminDeleteSupportSubCategory: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/supportproblem-topic/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminSupportSubCategory'],
		}),
	}),
});

export const {
	useAdminViewSupportSubCategoryQuery,
	useAdminStoreSupportSubCategoryMutation,
	useAdminDeleteSupportSubCategoryMutation,
	useAdminUpdateSupportSubCategoryMutation,
} = api;
