import { apiSlice } from '../../api/apiSlice';
import { iSubCategoryResponse } from './vendor-sub-category.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorSubCategoryAll: builder.query<
			iSubCategoryResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/subcategory-all?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['VendorSubCategory'],
		}),

		// store
		VendorSubCategoryStore: builder.mutation<
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
					url: `/subcategory-store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorSubCategory'],
		}),

		// update
		VendorSubCategoryUpdate: builder.mutation<
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

				body.append('_method', 'PUT');

				return {
					url: `/subcategory-update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorSubCategory'],
		}),

		// delete
		VendorSubCategoryDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/subcategory-delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorSubCategory'],
		}),
	}),
});

export const {
	useVendorSubCategoryAllQuery,
	useVendorSubCategoryStoreMutation,
	useVendorSubCategoryDeleteMutation,
	useVendorSubCategoryUpdateMutation,
} = api;
