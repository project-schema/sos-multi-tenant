import { apiSlice } from '../../api/apiSlice';
import { iVendorColorResponse } from './vendor-color-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorColor: builder.query<iVendorColorResponse, { page: number | string }>(
			{
				query: ({ page }) => ({
					url: `/tenant-color?status=active`,
					method: 'GET',
				}),
				providesTags: ['VendorColor'],
			}
		),

		// store
		VendorColorStore: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/tenant-color/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorColor', 'VendorProductPurchaseCreateData'],
		}),

		// update
		VendorColorUpdate: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/tenant-color/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorColor', 'VendorProductPurchaseCreateData'],
		}),

		// delete
		VendorColorDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-color/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorColor', 'VendorProductPurchaseCreateData'],
		}),
	}),
});

export const {
	useVendorColorQuery,
	useVendorColorStoreMutation,
	useVendorColorDeleteMutation,
	useVendorColorUpdateMutation,
} = api;
