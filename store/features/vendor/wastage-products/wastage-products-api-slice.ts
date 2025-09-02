import { apiSlice } from '../../api/apiSlice';
import {
	iVendorWastageInvoice,
	iVendorWastageListResponse,
	iVendorWastageProducts,
} from './wastage-products-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorWastageProductsAll: builder.query<
			iVendorWastageListResponse,
			undefined
		>({
			query: () => {
				return {
					url: `/tenant-product-wastage`,
					method: 'GET',
				};
			},
			providesTags: ['VendorWastageProducts'],
		}),

		// get by id
		VendorWastageProductsById: builder.query<
			iVendorWastageProducts,
			{ id: string }
		>({
			query: ({ id }) => ({
				url: `/tenant-product-wastage/show/${id}`,
				method: 'GET',
			}),
		}),
		// get by invoice no
		VendorWastageProductsByInvoiceNo: builder.query<
			iVendorWastageInvoice,
			{ id: string }
		>({
			query: ({ id }) => ({
				url: `/tenant-product-wastage/get-invoice?invoice_no=${id}`,
				method: 'GET',
			}),
		}),

		// store
		VendorWastageProductsStore: builder.mutation<
			{ status: 200; message: string },
			any
		>({
			query: (data) => {
				return {
					url: `/tenant-product-wastage/store`,
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: ['VendorWastageProducts'],
		}),
	}),
});

export const {
	useVendorWastageProductsAllQuery,
	useVendorWastageProductsByIdQuery,
	useVendorWastageProductsStoreMutation,
	useVendorWastageProductsByInvoiceNoQuery,
} = api;
