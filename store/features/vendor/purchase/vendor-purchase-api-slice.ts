import { apiSlice } from '../../api/apiSlice';
import {
	VendorPurchaseCreateData,
	iVendorPurchaseResponse,
} from './vendor-purchase-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorPurchase: builder.query<
			iVendorPurchaseResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/tenant-product-purchase?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['VendorPurchase'],
		}),

		//  get create data
		VendorPurchaseCreateData: builder.query<
			VendorPurchaseCreateData,
			undefined
		>({
			query: () => ({
				url: `/tenant-product-purchase/create`,
				method: 'GET',
			}),
			providesTags: ['VendorProductPurchaseCreateData'],
		}),

		// get product by supplier id
		VendorPurchaseProductBySupplierId: builder.query<
			{
				status: 200;
				products: {
					id: number;
					name: string;
					original_price: string;
				}[];
			},
			{ supplier_id: string | number }
		>({
			query: ({ supplier_id }) => ({
				url: `/tenant-product-purchase/supplier-product/${supplier_id}`,
				method: 'GET',
			}),
		}),

		// store
		VendorPurchaseStore: builder.mutation<
			{ status: 200; message: string },
			any
		>({
			query: (data) => {
				return {
					url: `/tenant-product-purchase/store`,
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: ['VendorPurchase'],
		}),

		// update
		VendorPurchaseUpdate: builder.mutation<
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
					url: `/tenant-product-purchase/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorPurchase'],
		}),

		// delete
		VendorPurchaseDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-product-purchase/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorPurchase'],
		}),
	}),
});

export const {
	useVendorPurchaseQuery,
	useVendorPurchaseCreateDataQuery,
	useVendorPurchaseStoreMutation,
	useVendorPurchaseDeleteMutation,
	useVendorPurchaseUpdateMutation,
	useVendorPurchaseProductBySupplierIdQuery,
} = api;
