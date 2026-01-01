import { iPagination } from '@/types';
import {
	iCompleteMerchantProduct,
	iRequestDropProduct,
} from '../../admin/merchant-product';
import { apiSlice } from '../../api/apiSlice';
import { iDropShipperProductResponse } from './dropshipper-product-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		// https://sos.futureinltd.com/api/affiliator/products?page=null&search=%20&low_to_high=low_to_high&category_id=21&start_stock=12&end_stock=12&start_price=12&end_price=12&start_commission=12&end_commission=12&rating=12&warranty=21

		DropShipperProductAll: builder.query<
			iDropShipperProductResponse,
			{
				page: number | string;
				search: string;
				low_to_high: string;
				high_to_low: string;
				top_sale: string;
				category_id: string;
				start_stock: string;
				end_stock: string;
				start_price: string;
				end_price: string;
				start_commission: string;
				end_commission: string;
				rating: string;
				warranty: string;
			}
		>({
			query: ({
				page,
				search = '',
				low_to_high = '',
				category_id = '',
				start_stock = '',
				end_stock = '',
				start_price = '',
				// end_price = '',
				start_commission = '',
				end_commission = '',
				rating = '',
				warranty = '',
				top_sale = '',
				high_to_low = '',
			}) => ({
				url: `/tenant-dropshipper/products?page=${page}&search=${search}&low_to_high=${low_to_high}&category_id=${category_id}&start_stock=${start_stock}&end_stock=${end_stock}&start_price=${start_price}&start_commission=${start_commission}&end_commission=${end_commission}&rating=${rating}&warranty=${warranty}&top_sale=${top_sale}&high_to_low=${high_to_low}`,
				method: 'GET',
			}),
			providesTags: ['DropShipperProduct'],
		}),

		// /single/product/{tenant_id}/{id}

		SingleProduct: builder.query<
			{ product: iCompleteMerchantProduct },
			{ tenantId: string; productId: string }
		>({
			query: ({ tenantId, productId }) => ({
				url: `/tenant-dropshipper/single/product/${tenantId}/${productId}`,
				method: 'GET',
			}),
			providesTags: ['DropShipperProduct'],
		}),

		// request/product
		RequestProduct: builder.mutation<
			{ status: 200; message: string },
			{ tenantId: string; productId: string; comments: string }
		>({
			query: ({ tenantId, productId, comments }) => ({
				url: `/tenant-dropshipper/request/product/${tenantId}/${productId}`,
				method: 'POST',
				body: { reason: comments },
			}),
			invalidatesTags: ['DropShipperProduct'],
		}),

		// add-to-cart
		AddToCart: builder.mutation<{ status: 201; message: string }, any>({
			query: (data) => ({
				url: `/tenant-dropshipper/add-to-cart`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['DropShipperProduct'],
		}),

		AllRequestProduct: builder.query<
			{ products: iPagination<iRequestDropProduct> },
			{ page: number | string; search: string; status: string }
		>({
			query: ({ page, search, status }) => ({
				url: `/tenant-dropshipper/request/${status}/product?page=${page}&search=${search}`,
				method: 'GET',
			}),
			providesTags: ['DropShipperProduct'],
		}),

		// dropshipper custom price
		DropshipperCustomPrice: builder.mutation<
			{ status: 200; message: string },
			{ id: string; profit_amount: string }
		>({
			query: ({ id, profit_amount }) => ({
				url: `/tenant-dropshipper/single/product/add-profit/${id}`,
				method: 'POST',
				body: { profit_amount },
			}),
		}),
	}),
});

export const {
	useDropShipperProductAllQuery,
	useSingleProductQuery,
	useRequestProductMutation,
	useAddToCartMutation,
	useAllRequestProductQuery,
	useDropshipperCustomPriceMutation,
} = api;
