import { apiSlice } from '../../api/apiSlice';
import { Customer } from './vendor-pos-sales.slice';
import {
	iVendorPosSalesAllOrdersResponse,
	iVendorPosSalesAllReturnResponse,
	iVendorPosSalesOrderShow,
	iVendorPosSalesPaymentHistoryResponse,
	iVendorPosSalesProductDetailsResponse,
	iVendorPosSalesResponse,
} from './vendor-pos-sales.type';

export interface SearchCustomerResponse {
	status: number;
	customers: Customer[];
}

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// Get create data
		VendorPosSalesCreateData: builder.query<
			iVendorPosSalesResponse,
			{
				brand_id: string;
				category_id: string;
				search: string;
			}
		>({
			query: ({ brand_id, category_id, search }) => ({
				url: `/tenant-product-pos-sales/create?brand_id=${brand_id}&category_id=${category_id}&search=${search}`,
				method: 'GET',
			}),
			providesTags: ['VendorPosSales'],
		}),

		// Get product details
		VendorPosSalesProductDetails: builder.query<
			iVendorPosSalesProductDetailsResponse,
			{
				product_id: string;
			}
		>({
			query: ({ product_id }) => ({
				url: `/tenant-product-pos-sales/product/select/${product_id}`,
				method: 'GET',
			}),
			providesTags: ['VendorPosSales'],
		}),

		// Create new sale
		createSale: builder.mutation<any, any>({
			query: (data) => ({
				url: '/tenant-product-pos-sales/store',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['VendorPosSales'],
		}),

		// get all orders
		VendorPosSalesAllOrders: builder.query<
			iVendorPosSalesAllOrdersResponse,
			{
				page: number | string;
				status: 'all' | 'due' | 'paid';
				search: string;
				start_date: string;
				end_date: string;
			}
		>({
			query: ({
				page,
				status,
				search = '',
				start_date = '',
				end_date = '',
			}) => {
				if (status === 'all') {
					status = '' as any;
				}
				return {
					url: `/tenant-product-pos-sales/orders?page=${page}&payment_status=${status}&search=${search}&start_date=${start_date}&end_date=${end_date}`,
					method: 'GET',
				};
			},
			providesTags: ['VendorPosSales'],
		}),

		VendorPosSalesOrderShow: builder.query<
			iVendorPosSalesOrderShow,
			{ id: string }
		>({
			query: ({ id }) => ({
				url: `/tenant-product-pos-sales/show/${id}`,
			}),
			providesTags: ['VendorPosSales'],
		}),

		// add payment
		VendorPosSalesAddPayment: builder.mutation<
			{ status: number; message: string },
			any
		>({
			query: (data) => ({
				url: `/tenant-product-pos-sales/add-payment/${data.id}`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['VendorPosSales'],
		}),

		// sell return
		VendorPosSellReturn: builder.mutation<any, any>({
			query: (data) => ({
				url: `/tenant-product-pos-sales-return/${data.id}`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['VendorPosSales'],
		}),

		// get all return
		VendorPosSalesAllReturn: builder.query<
			iVendorPosSalesAllReturnResponse,
			{
				page: number | string;
				status: 'all' | 'due' | 'paid';
				search: string;
				start_date: string;
				end_date: string;
			}
		>({
			query: ({
				page,
				status,
				search = '',
				start_date = '',
				end_date = '',
			}) => {
				if (status === 'all') {
					status = '' as any;
				}
				return {
					url: `tenant-product-pos-sales-return?page=${page}&payment_status=${status}&search=${search}&start_date=${start_date}&end_date=${end_date}`,
					method: 'GET',
				};
			},
			providesTags: ['VendorPosSales'],
		}),

		//   payment-history
		VendorPosPaymentHistory: builder.query<
			iVendorPosSalesPaymentHistoryResponse,
			{
				page: number | string;
				status: 'all' | 'due' | 'paid';
				search: string;
				start_date: string;
				end_date: string;
			}
		>({
			query: ({
				page,
				status,
				search = '',
				start_date = '',
				end_date = '',
			}) => {
				if (status === 'all') {
					status = '' as any;
				}
				return {
					url: `/tenant-product-pos-sales/payment-history?page=${page}&payment_status=${status}&search=${search}&start_date=${start_date}&end_date=${end_date}`,
					method: 'GET',
				};
			},
			providesTags: ['VendorPosSales'],
		}),

		// create exchange sale
		createExchangeSale: builder.mutation<any, any>({
			query: (data) => ({
				url: `/tenant-product-pos-sales/exchange/${data.id}`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['VendorPosSales'],
		}),
	}),
});

export const {
	useVendorPosSalesCreateDataQuery,
	useVendorPosSalesProductDetailsQuery,
	useCreateSaleMutation,
	useVendorPosSalesAllOrdersQuery,
	useVendorPosSalesAddPaymentMutation,
	useVendorPosSalesOrderShowQuery,
	useVendorPosSellReturnMutation,
	useVendorPosSalesAllReturnQuery,
	useVendorPosPaymentHistoryQuery,
	useCreateExchangeSaleMutation,
} = api;
