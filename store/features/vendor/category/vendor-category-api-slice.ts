import { apiSlice } from '../../api/apiSlice';
import { iVendorCategoryResponse } from './vendor-category-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorViewCategory: builder.query<
			iVendorCategoryResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/vendor-all-category?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['VendorCategory'],
		}),

		// store
		VendorStoreCategory: builder.mutation<
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
					url: `/store-category`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorCategory'],
		}),

		// update
		VendorUpdateCategory: builder.mutation<
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
			invalidatesTags: ['VendorCategory'],
		}),

		// delete
		VendorDeleteCategory: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/delete-category/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorCategory'],
		}),
	}),
});

export const {
	useVendorViewCategoryQuery,
	useVendorStoreCategoryMutation,
	useVendorDeleteCategoryMutation,
	useVendorUpdateCategoryMutation,
} = api;
