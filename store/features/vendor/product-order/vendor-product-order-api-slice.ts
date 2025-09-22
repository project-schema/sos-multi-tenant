import { apiSlice } from '../../api/apiSlice';
import {
	iVendorProductOrderResponse,
	statusRouteMap,
} from './vendor-product-order-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorProductOrderAll: builder.query<
			iVendorProductOrderResponse,
			{ page: number | string; search: string; status: string }
		>({
			query: ({ page, search = '', status = 'all' }) => {
				// Use 'all' as default status
				const route = statusRouteMap[status] || statusRouteMap['all'];

				return {
					url: `/tenant-product-order/${route}?page=${page}&search=${search}`,
					method: 'GET',
				};
			},
			providesTags: ['VendorProductOrder'],
		}),
	}),
});

export const { useVendorProductOrderAllQuery } = api;
