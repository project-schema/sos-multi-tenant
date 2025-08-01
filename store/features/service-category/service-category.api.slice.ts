import { apiSlice } from '../api/apiSlice';
import { iServiceCategoryResponse } from './service-category.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewServiceCategory: builder.query<
			iServiceCategoryResponse,
			{ page: number | string | '' }
		>({
			query: ({ page }) => ({
				url: `/admin/servicecategory?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminServiceCategory'],
		}),

		// store
		adminStoreServiceCategory: builder.mutation<
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
					url: `/admin/servicecategory/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminServiceCategory'],
		}),

		// update
		adminUpdateServiceCategory: builder.mutation<
			{ data: 'success'; message: string },
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
					url: `/admin/servicecategory/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminServiceCategory'],
		}),

		// delete
		adminDeleteServiceCategory: builder.mutation<
			{ data: 'success'; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/servicecategory/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminServiceCategory'],
		}),
	}),
});

export const {
	useAdminViewServiceCategoryQuery,
	useAdminStoreServiceCategoryMutation,
	useAdminDeleteServiceCategoryMutation,
	useAdminUpdateServiceCategoryMutation,
} = api;
