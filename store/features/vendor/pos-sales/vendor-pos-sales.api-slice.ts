import { apiSlice } from '../../api/apiSlice';
import {
	CartItem,
	Customer,
	InvoiceInfo,
	PaymentInfo,
} from './vendor-pos-sales.slice';
import {
	iVendorPosSalesProductDetailsResponse,
	iVendorPosSalesResponse,
} from './vendor-pos-sales.type';

// Types for API responses
export interface CreateSaleRequest {
	customer: Customer;
	items: CartItem[];
	payment: PaymentInfo;
	invoice: InvoiceInfo;
	subtotal: number;
	discount: number;
	tax: number;
	total: number;
}

export interface CreateSaleResponse {
	status: number;
	message: string;
	data: {
		sale_id: number;
		invoice_no: string;
		total_amount: number;
		payment_status: string;
		created_at: string;
	};
}

export interface SearchCustomerResponse {
	status: number;
	customers: Customer[];
}

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
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
		}),

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
		}),

		// Create new sale
		createSale: builder.mutation<CreateSaleResponse, CreateSaleRequest>({
			query: (data) => ({
				url: '/tenant-product-pos-sales/store',
				method: 'POST',
				body: data,
			}),
		}),

		// Search customers
		searchCustomers: builder.query<SearchCustomerResponse, { search: string }>({
			query: ({ search }) => ({
				url: `/tenant-product-pos-sales/customers/search?search=${search}`,
				method: 'GET',
			}),
		}),

		// Get sale by invoice number
		getSaleByInvoice: builder.query<CreateSaleResponse, { invoice_no: string }>(
			{
				query: ({ invoice_no }) => ({
					url: `/tenant-product-pos-sales/sale/${invoice_no}`,
					method: 'GET',
				}),
			}
		),

		// Process payment
		processPayment: builder.mutation<
			{ status: number; message: string },
			{ sale_id: number; payment: PaymentInfo }
		>({
			query: ({ sale_id, payment }) => ({
				url: `/tenant-product-pos-sales/payment/${sale_id}`,
				method: 'POST',
				body: payment,
			}),
		}),
	}),
});

export const {
	useVendorPosSalesCreateDataQuery,
	useVendorPosSalesProductDetailsQuery,
	useCreateSaleMutation,
	useSearchCustomersQuery,
	useGetSaleByInvoiceQuery,
	useProcessPaymentMutation,
} = api;
