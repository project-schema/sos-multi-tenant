import { apiSlice } from '../../api/apiSlice';
import { iVendorDeliveryChargeResponse } from './vendor-delivery-charge-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorDeliveryCharge: builder.query<
			iVendorDeliveryChargeResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/tenant-delivery-charge?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['VendorDeliveryCharge'],
		}),

		// store
		VendorDeliveryChargeStore: builder.mutation<
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
					url: `/tenant-delivery-charge/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorDeliveryCharge', 'VendorProductCreateData'],
		}),

		// update
		VendorDeliveryChargeUpdate: builder.mutation<
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
					url: `/tenant-delivery-charge/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorDeliveryCharge', 'VendorProductCreateData'],
		}),

		// delete
		VendorDeliveryChargeDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-delivery-charge/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorDeliveryCharge', 'VendorProductCreateData'],
		}),
	}),
});

export const {
	useVendorDeliveryChargeQuery,
	useVendorDeliveryChargeStoreMutation,
	useVendorDeliveryChargeDeleteMutation,
	useVendorDeliveryChargeUpdateMutation,
} = api;
