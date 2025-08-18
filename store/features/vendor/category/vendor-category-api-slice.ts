import { apiSlice } from '../../api/apiSlice';
import {
	iVendorCategory,
	iVendorCategoryResponse,
} from './vendor-category-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorCategoryAll: builder.query<
			iVendorCategoryResponse,
			{ page?: number | string; status?: null | 'active' | 'pending' }
		>({
			query: ({ page = '', status = null }) => {
				const queryStatus = status ? `&status=${status}` : '';
				return {
					url: `/category-all?page=${page}${queryStatus}`,
					method: 'GET',
				};
			},
			providesTags: ['VendorCategory'],
		}),
		// get all active
		VendorCategoryAllActive: builder.query<
			{ categories: iVendorCategory[]; status: 200 },
			undefined
		>({
			query: () => {
				return {
					url: `/category-all/active`,
					method: 'GET',
				};
			},
			providesTags: ['VendorCategory'],
		}),

		// store
		VendorCategoryStore: builder.mutation<
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
					url: `/category-store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorCategory'],
		}),

		// update
		VendorCategoryUpdate: builder.mutation<
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
					url: `/category-update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorCategory'],
		}),

		// delete
		VendorCategoryDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/category-delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorCategory'],
		}),
	}),
});

export const {
	useVendorCategoryAllQuery,
	useVendorCategoryAllActiveQuery,
	useVendorCategoryStoreMutation,
	useVendorCategoryDeleteMutation,
	useVendorCategoryUpdateMutation,
} = api;
