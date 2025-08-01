import { apiSlice } from '../../api/apiSlice';
import {
	iMerchantProductResponse,
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
				console.log(status);
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

				return {
					url: `/view-product${status}?page=${page}&search=${search}`,
					method: 'GET',
				};
			},
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
	}),
});

export const {
	useAdminVendorProductStatisticsQuery,
	useAdminViewProductQuery,
	useAdminDeleteProductMutation,
} = api;
