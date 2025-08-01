import { apiSlice } from '../../api/apiSlice';
import {
	iDropShipReqResponse,
	iDropShipReqStatistics,
} from './dropshipper-request.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminRequestProduct: builder.query<
			iDropShipReqResponse,
			{ page: number | string; search: string; status: string }
		>({
			query: ({ page, search, status }) => {
				/*
				api/admin/request/product/all?page=null&search=
				api/admin/request/product/active?page=null&search=
				api/admin/request/product/pending?page=null&search=
				api/admin/request/product/rejected?page=null&search=

				*/
				if (!status) {
					status = 'all';
				}

				return {
					url: `/admin/request/product/${status}?page=${page}&search=${search}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminProductRequest'],
		}),

		// statistics
		adminAffiliateProductStatistics: builder.query<
			iDropShipReqStatistics,
			undefined
		>({
			query: () => ({
				url: `/admin/affiliate-request-statistics`,
				method: 'GET',
			}),
			providesTags: ['AdminProductRequest'],
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
			invalidatesTags: ['AdminProductRequest'],
		}),
	}),
});

export const {
	useAdminDeleteProductMutation,
	useAdminAffiliateProductStatisticsQuery,
	useAdminRequestProductQuery,
} = api;
