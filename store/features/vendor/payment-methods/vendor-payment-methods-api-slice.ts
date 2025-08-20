import { apiSlice } from '../../api/apiSlice';
import { iVendorPaymentMethodsResponse } from './vendor-payment-methods-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorPaymentMethods: builder.query<
			iVendorPaymentMethodsResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/tenant-payment-method?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['VendorPaymentMethods'],
		}),

		// store
		VendorPaymentMethodsStore: builder.mutation<
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
					url: `/tenant-payment-method/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: [
				'VendorPaymentMethods',
				'VendorProductPurchaseCreateData',
			],
		}),

		// update
		VendorPaymentMethodsUpdate: builder.mutation<
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
					url: `/tenant-payment-method/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: [
				'VendorPaymentMethods',
				'VendorProductPurchaseCreateData',
			],
		}),

		// delete
		VendorPaymentMethodsDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-payment-method/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [
				'VendorPaymentMethods',
				'VendorProductPurchaseCreateData',
			],
		}),
	}),
});

export const {
	useVendorPaymentMethodsQuery,
	useVendorPaymentMethodsStoreMutation,
	useVendorPaymentMethodsDeleteMutation,
	useVendorPaymentMethodsUpdateMutation,
} = api;
