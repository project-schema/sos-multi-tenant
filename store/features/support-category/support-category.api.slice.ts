import { apiSlice } from '../api/apiSlice';
import { iSupportCategoryResponse } from './support-category.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewSupportCategory: builder.query<
			iSupportCategoryResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/supportboxcategory?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminSupportCategory'],
		}),

		// store
		adminStoreSupportCategory: builder.mutation<
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
					url: `/admin/supportboxcategory`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminSupportCategory'],
		}),

		// update
		adminUpdateSupportCategory: builder.mutation<
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
					url: `/admin/supportboxcategory/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminSupportCategory'],
		}),

		// delete
		adminDeleteSupportCategory: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/supportboxcategory/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminSupportCategory'],
		}),
	}),
});

export const {
	useAdminViewSupportCategoryQuery,
	useAdminStoreSupportCategoryMutation,
	useAdminDeleteSupportCategoryMutation,
	useAdminUpdateSupportCategoryMutation,
} = api;
