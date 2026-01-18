import { apiSlice } from '../../api/apiSlice';
import { iTenantCouponResponse } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		TenantCoupon: builder.query<
			iTenantCouponResponse,
			{
				page: number | string;
				search: string;
				status?: string;
				discount_type?: string;
				valid_from?: string;
				valid_to?: string;
			}
		>({
			query: ({
				page,
				search,
				status,
				discount_type,
				valid_from,
				valid_to,
			}) => {
				const params = new URLSearchParams();
				params.append('page', String(page));
				if (search) params.append('search', search);
				if (status) params.append('status', status);
				if (discount_type) params.append('discount_type', discount_type);
				if (valid_from) params.append('valid_from', valid_from);
				if (valid_to) params.append('valid_to', valid_to);

				return {
					url: `/tenant-coupon?${params.toString()}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminCoupon'],
		}),

		// store
		TenantStoreCoupon: builder.mutation<
			{ status: 200; message: string; success: boolean },
			any
		>({
			query: (data) => ({
				url: `/tenant-coupon/store`,
				body: data,
				method: 'POST',
			}),
			invalidatesTags: ['AdminCoupon'],
		}),

		// update
		TenantUpdateCoupon: builder.mutation<
			{ status: 200; message: string; success: boolean },
			any
		>({
			query: (data) => ({
				url: `/tenant-coupon/update/${data.id}`,
				body: data,
				method: 'POST',
			}),
			invalidatesTags: ['AdminCoupon'],
		}),

		// delete
		TenantDeleteCoupon: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-coupon/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminCoupon'],
		}),
	}),
});

export const {
	useTenantCouponQuery,
	useTenantDeleteCouponMutation,
	useTenantStoreCouponMutation,
	useTenantUpdateCouponMutation,
} = api;
