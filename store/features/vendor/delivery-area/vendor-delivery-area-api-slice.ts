import { apiSlice } from '../../api/apiSlice';
import { iVendorPickAndDeliveryAddressResponse } from './vendor-delivery-area-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorPickAndDeliveryAddress: builder.query<
			iVendorPickAndDeliveryAddressResponse,
			{ type: 'delivery' | 'pickup' }
		>({
			query: ({ type }) => ({
				url: `/tenant-delivery-and-pickup-address?type=${type}`,
				method: 'GET',
			}),
			providesTags: ['VendorPickAndDeliveryAddress'],
		}),

		// store
		VendorPickAndDeliveryAddressStore: builder.mutation<
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
					url: `/tenant-delivery-and-pickup-address/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: [
				'VendorPickAndDeliveryAddress',
				'VendorProductCreateData',
			],
		}),

		// update
		VendorPickAndDeliveryAddressUpdate: builder.mutation<
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
					url: `/tenant-delivery-and-pickup-address/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: [
				'VendorPickAndDeliveryAddress',
				'VendorProductCreateData',
			],
		}),

		// delete
		VendorPickAndDeliveryAddressDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-delivery-and-pickup-address/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [
				'VendorPickAndDeliveryAddress',
				'VendorProductCreateData',
			],
		}),
	}),
});

export const {
	useVendorPickAndDeliveryAddressQuery,
	useVendorPickAndDeliveryAddressStoreMutation,
	useVendorPickAndDeliveryAddressDeleteMutation,
	useVendorPickAndDeliveryAddressUpdateMutation,
} = api;
