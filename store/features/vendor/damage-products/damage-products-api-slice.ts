import { apiSlice } from '../../api/apiSlice';
import { iVendorDamageProductsResponse } from './damage-products-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorDamageProductsAll: builder.query<
			iVendorDamageProductsResponse,
			undefined
		>({
			query: () => {
				return {
					url: `/tenant-product-damage`,
					method: 'GET',
				};
			},
			providesTags: ['VendorDamageProducts'],
		}),

		// store
		VendorDamageProductsStore: builder.mutation<
			{ status: 200; message: string },
			any
		>({
			query: (data) => {
				return {
					url: `/tenant-product-damage/store`,
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: ['VendorDamageProducts'],
		}),
	}),
});

export const {
	useVendorDamageProductsAllQuery,
	useVendorDamageProductsStoreMutation,
} = api;
