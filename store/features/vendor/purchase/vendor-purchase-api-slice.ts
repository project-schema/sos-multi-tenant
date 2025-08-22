import { apiSlice } from '../../api/apiSlice';
import {
	VendorPurchaseCreateData,
	iVendorPurchasePaymentHistoryResponse,
	iVendorPurchaseResponse,
	iVendorPurchaseReturn,
	iVendorPurchaseReturnShow,
	iVendorPurchaseShow,
} from './vendor-purchase-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorPurchase: builder.query<
			iVendorPurchaseResponse,
			{
				page: number | string;
				search: string;
				status: string;
				start_date: string;
				end_date: string;
			}
		>({
			query: ({ page, search, status, start_date, end_date }) => {
				if (status === 'all') {
					status = '';
				}
				return {
					url: `/tenant-product-purchase?page=${page}&search=${search}&status=${status}&start_date=${start_date}&end_date=${end_date}`,
					method: 'GET',
				};
			},
			providesTags: ['VendorPurchase'],
		}),
		// get all
		VendorPurchasePaymentHistory: builder.query<
			iVendorPurchasePaymentHistoryResponse,
			{
				page: number | string;
				search: string;
				status: string;
				start_date: string;
				end_date: string;
			}
		>({
			query: ({ page, search, status, start_date, end_date }) => {
				if (status === 'all') {
					status = '';
				}
				return {
					url: `/tenant-product-purchase/payment-history?page=${page}&search=${search}&payment_status=${status}&start_date=${start_date}&end_date=${end_date}`,
					method: 'GET',
				};
			},
			providesTags: ['VendorPurchase'],
		}),

		// show
		VendorPurchaseShow: builder.query<
			iVendorPurchaseShow,
			{ id: string | number }
		>({
			query: ({ id }) => ({
				url: `/tenant-product-purchase/show/${id}`,
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

		//  status  purchase
		VendorPurchaseStatus: builder.mutation<
			{ status: number; message: string },
			{ id: string | number }
		>({
			query: ({ id }) => {
				return {
					url: `/tenant-product-purchase/status/${id}`,
					method: 'GET',
				};
			},
			invalidatesTags: ['VendorPurchase'],
		}),

		// add/payment
		VendorPurchaseAddPayment: builder.mutation<
			{ status: number; message: string },
			any
		>({
			query: (data) => ({
				url: `/tenant-product-purchase/add-payment/${data.id}`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['VendorPurchase'],
		}),

		// return store
		VendorPurchaseReturn: builder.mutation<
			{ status: number; message: string },
			any
		>({
			query: (data) => ({
				url: `/tenant-product-purchase/return/${data.id}`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['VendorPurchase'],
		}),
		// return list
		VendorPurchaseReturnList: builder.query<
			{ status: number; return_list: iVendorPurchaseReturn[] },
			{ search: string; start_date: string; end_date: string }
		>({
			query: ({ search, start_date, end_date }) => ({
				url: `/tenant-product-purchase/return/list?search=${search}&start_date=${start_date}&end_date=${end_date}`,
				method: 'GET',
			}),
			providesTags: ['VendorPurchase'],
		}),
		// return show
		VendorPurchaseReturnShow: builder.query<
			iVendorPurchaseReturnShow,
			{ id: string | number }
		>({
			query: ({ id }) => ({
				url: `/tenant-product-purchase/return/list/${id}`,
				method: 'GET',
			}),
			providesTags: ['VendorPurchase'],
		}),
	}),
});

export const {
	useVendorPurchaseQuery,
	useVendorPurchaseShowQuery,
	useVendorPurchaseStoreMutation,
	useVendorPurchaseStatusMutation,
	useVendorPurchaseCreateDataQuery,
	useVendorPurchaseAddPaymentMutation,
	useVendorPurchasePaymentHistoryQuery,
	useVendorPurchaseProductBySupplierIdQuery,
	useVendorPurchaseReturnMutation,
	useVendorPurchaseReturnListQuery,
	useVendorPurchaseReturnShowQuery,
} = api;
