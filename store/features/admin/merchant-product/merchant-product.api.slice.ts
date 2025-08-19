import { apiSlice } from '../../api/apiSlice';
import {
	iMerchantProductResponse,
	iMerchantProductSingleResponse,
	iMerchantProductStatistics,
} from './merchant-product.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewProduct: builder.query<
			iMerchantProductResponse,
			{ page: number | string; search: string; status: string }
		>({
			query: ({ page, search, status }) => {
				/*
				api/view-product?page=null&search=
				api/view-product/active?page=null&search=
				api/view-product/pending?page=null&search=
				api/view-product/rejected?page=null&search=
				api/admin/vendor-products-edit-request?page=null&search=

				*/
				if (status === 'all' || !status) {
					status = '';
				}
				let url = `/view-product${status}?page=${page}&search=${search}`;
				if (status === '/edited') {
					url = `/admin/vendor-products-edit-request?page=${page}&search=${search}`;
				}

				return {
					url,
					method: 'GET',
				};
			},
			providesTags: ['AdminProduct'],
		}),

		// get single api/edit-product/324
		adminGetSingleProduct: builder.query<
			iMerchantProductSingleResponse,
			{ id: number | string }
		>({
			query: ({ id }) => ({
				url: `/edit-product/${id}`,
				method: 'GET',
			}),
			providesTags: ['AdminProduct'],
		}),
		// statistics
		adminVendorProductStatistics: builder.query<
			iMerchantProductStatistics,
			undefined
		>({
			query: () => ({
				url: `/admin/vendor-product-statistics`,
				method: 'GET',
			}),
			providesTags: ['AdminProduct'],
		}),

		// delete
		adminDeleteProduct: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/delete-product/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminProduct'],
		}),

		//  status  product
		adminProductStatusUpdate: builder.mutation<
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
					url: `/admin-product-status-update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminProduct'],
		}),
	}),
});

export const {
	useAdminVendorProductStatisticsQuery,
	useAdminViewProductQuery,
	useAdminDeleteProductMutation,
	useAdminProductStatusUpdateMutation,
	useAdminGetSingleProductQuery,
} = api;
