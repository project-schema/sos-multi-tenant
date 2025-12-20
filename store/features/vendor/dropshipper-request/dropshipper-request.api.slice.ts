import { apiSlice } from '../../api/apiSlice';
import { iDropShipReqResponse } from './dropshipper-request.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorRequestProduct: builder.query<
			iDropShipReqResponse,
			{ page: number | string; search: string; status: string }
		>({
			query: ({ page, search, status }) => {
				/*
				/api/affiliator/request/product/all?page=null&search=
				/api/affiliator/request/product/active?page=null&search=
				/api/affiliator/request/product/pending?page=null&search=
				/api/affiliator/request/product/rejected?page=null&search=
				*/
				if (!status) {
					status = 'all';
				}

				return {
					url: `/dropshipper/request/product/${status}?page=${page}&search=${search}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminProductRequest'],
		}),

		// delete
		VendorRequestProductStatus: builder.mutation<
			{ status: 200; message: string },
			{
				id: string | number;
				reason?: string;
				status: 1 | 3;
				tenant_id: string | number;
			}
		>({
			query: (data) => ({
				url: `/dropshipper/request/product-update/${data.tenant_id}/${data.id}`,
				method: 'POST',
				body: {
					reason: data.reason,
					status: data.status,
				},
			}),
			invalidatesTags: ['AdminProductRequest'],
		}),
	}),
});

export const {
	useVendorRequestProductStatusMutation,
	useVendorRequestProductQuery,
} = api;
