import { apiSlice } from '../../api/apiSlice';
import {
	iVendorProductOrder,
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

		VendorProductOrderUpdate: builder.mutation<
			{ message: string; status: number },
			any
		>({
			query: (body) => ({
				url: `/tenant-product-order/status/${body.id}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['VendorProductOrder'],
		}),

		// view
		VendorProductOrderView: builder.query<iVendorProductOrder, { id: string }>({
			query: ({ id }) => ({
				url: `/tenant-product-order/order/view/${id}`,
				method: 'GET',
			}),
			providesTags: ['VendorProductOrder'],
		}),
	}),
});

export const {
	useVendorProductOrderAllQuery,
	useVendorProductOrderUpdateMutation,
	useVendorProductOrderViewQuery,
} = api;
