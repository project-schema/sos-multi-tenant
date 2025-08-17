import { apiSlice } from '../../api/apiSlice';
import { iBrandResponse } from './brand.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewBrand: builder.query<iBrandResponse, { page: number | string }>({
			query: ({ page }) => ({
				url: `/view-brand?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminBrand'],
		}),

		// store
		adminStoreBrand: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/store-brand`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminBrand'],
		}),

		// update
		adminUpdateBrand: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/update-brand/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminBrand'],
		}),

		// delete
		adminDeleteBrand: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/delete-brand/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminBrand'],
		}),
	}),
});

export const {
	useAdminViewBrandQuery,
	useAdminStoreBrandMutation,
	useAdminDeleteBrandMutation,
	useAdminUpdateBrandMutation,
} = api;
