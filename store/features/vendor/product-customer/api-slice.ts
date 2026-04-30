import { apiSlice } from '../../api/apiSlice';
import { iRegisterCustomerResponse } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorRegisterCustomer: builder.query<
			iRegisterCustomerResponse,
			{ page: number | string; search: string }
		>({
			query: ({ page, search = '' }) => {
				return {
					url: `/tenant/customers?page=${page}&search=${search}`,
					method: 'GET',
				};
			},
		}),
	}),
});

export const { useVendorRegisterCustomerQuery } = api;
