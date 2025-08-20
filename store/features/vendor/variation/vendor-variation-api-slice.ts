import { apiSlice } from '../../api/apiSlice';
import { iVendorVariationResponse } from './vendor-variation-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorVariation: builder.query<
			iVendorVariationResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/tenant-variant?status=${page}`,
				method: 'GET',
			}),
			providesTags: ['VendorVariation'],
		}),

		// store
		VendorVariationStore: builder.mutation<
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
					url: `/tenant-variant/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorVariation', 'VendorProductPurchaseCreateData'],
		}),

		// update
		VendorVariationUpdate: builder.mutation<
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
					url: `/tenant-variant/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorVariation', 'VendorProductPurchaseCreateData'],
		}),

		// delete
		VendorVariationDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-variant/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorVariation', 'VendorProductPurchaseCreateData'],
		}),
	}),
});

export const {
	useVendorVariationQuery,
	useVendorVariationStoreMutation,
	useVendorVariationDeleteMutation,
	useVendorVariationUpdateMutation,
} = api;
