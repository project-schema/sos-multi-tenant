import { apiSlice } from '../../api/apiSlice';
import { iVendorWooCommerceResponse } from './vendor-woo-commerce-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorWooCommerce: builder.query<
			iVendorWooCommerceResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/tenant-woo-commerce-credential?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['VendorWooCommerce'],
		}),

		// store
		VendorWooCommerceStore: builder.mutation<
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
					url: `/tenant-woo-commerce-credential/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorWooCommerce', 'VendorProductCreateData'],
		}),

		// update
		VendorWooCommerceUpdate: builder.mutation<
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
					url: `/tenant-woo-commerce-credential/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorWooCommerce', 'VendorProductCreateData'],
		}),

		// delete
		VendorWooCommerceDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-woo-commerce-credential/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorWooCommerce', 'VendorProductCreateData'],
		}),
	}),
});

export const {
	useVendorWooCommerceQuery,
	useVendorWooCommerceStoreMutation,
	useVendorWooCommerceDeleteMutation,
	useVendorWooCommerceUpdateMutation,
} = api;
