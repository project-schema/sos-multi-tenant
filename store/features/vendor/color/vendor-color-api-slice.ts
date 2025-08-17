import { apiSlice } from '../../api/apiSlice';
import { iVendorColorResponse } from './vendor-color-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorColor: builder.query<iVendorColorResponse, { page: number | string }>(
			{
				query: ({ page }) => ({
					url: `/view-color?status=${page}`,
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
					url: `/store-color`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorColor'],
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
					url: `/update-color/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorColor'],
		}),

		// delete
		VendorColorDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/delete-color/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorColor'],
		}),
	}),
});

export const {
	useVendorColorQuery,
	useVendorColorStoreMutation,
	useVendorColorDeleteMutation,
	useVendorColorUpdateMutation,
} = api;
