import { apiSlice } from '../../api/apiSlice';
import { iVendorCustomerResponse } from './vendor-customer-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorCustomer: builder.query<
			iVendorCustomerResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/tenant-customer?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['VendorCustomer'],
		}),

		// store
		VendorCustomerStore: builder.mutation<
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
					url: `/tenant-customer/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorCustomer', 'VendorPosSales'],
		}),

		// update
		VendorCustomerUpdate: builder.mutation<
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
					url: `/tenant-customer/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorCustomer'],
		}),

		// delete
		VendorCustomerDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-customer/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorCustomer'],
		}),
	}),
});

export const {
	useVendorCustomerQuery,
	useVendorCustomerStoreMutation,
	useVendorCustomerDeleteMutation,
	useVendorCustomerUpdateMutation,
} = api;
