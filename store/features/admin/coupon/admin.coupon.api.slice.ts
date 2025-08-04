import { iPagination } from '@/types';
import { apiSlice } from '../../api/apiSlice';
import {
	iAdminCoupon,
	iAdminCouponResponse,
	iAdminCouponUsersRes,
	iAdminReqCoupon,
} from './admin.coupon.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminCoupon: builder.query<
			iAdminCouponResponse,
			{
				page: number | string;
				search: string;
				end_commission: string;
				start_commission: string;
				end_amount: string;
				start_amount: string;
				to: string;
				from: string;
			}
		>({
			query: ({
				page,
				search,
				end_commission,
				start_commission,
				end_amount,
				start_amount,
				to,
				from,
			}) => {
				return {
					url: `/admin/coupons?page=${page}&search=${
						search || ''
					}&end_commission=${end_commission || ''}&start_commission=${
						start_commission || ''
					}&end_amount=${end_amount || ''}&start_amount=${
						start_amount || ''
					}&to=${to || ''}&from=${from || ''}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminCoupon'],
		}),

		// get coupon users
		adminCouponUsers: builder.query<iAdminCouponUsersRes, undefined>({
			query: () => ({
				url: `/admin/coupon-users`,
				method: 'GET',
			}),
		}),

		// store
		adminStoreCoupon: builder.mutation<
			{ status: 200; message: string; success: boolean },
			Partial<iAdminCoupon>
		>({
			query: (data) => ({
				url: `/admin/coupons`,
				body: data,
				method: 'POST',
			}),
			invalidatesTags: ['AdminCoupon', 'AdminCouponRequest'],
		}),

		// update
		adminUpdateCoupon: builder.mutation<
			{ status: 200; message: string; success: boolean },
			Partial<iAdminCoupon>
		>({
			query: (data) => ({
				url: `/admin/coupons/${data.id}`,
				body: data,
				method: 'PUT',
			}),
			invalidatesTags: ['AdminCoupon'],
		}),

		// delete
		adminDeleteCoupon: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/coupons/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminCoupon'],
		}),

		// admin/all-coupon-request
		adminAllCouponRequest: builder.query<
			iPagination<iAdminReqCoupon>,
			{ page: number | string; search: string; status?: string }
		>({
			query: ({ page, search, status }) => ({
				url: `/admin/all-coupon-request?page=${page}&search=${search}&status=${
					status || ''
				}`,
				method: 'GET',
			}),
			providesTags: ['AdminCouponRequest'],
		}),

		// delete
		adminDeleteCouponRequest: builder.mutation<
			{ status: 200; message: string; data: 'success' },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/coupon-request-delete/${data.id}`,
				method: 'POST',
			}),
			invalidatesTags: ['AdminCouponRequest'],
		}),

		// reject
		adminRejectCouponRequest: builder.mutation<
			{ status: 200; message: string; data: 'success' },
			{ id: string | number; reason: string; status: 'reject' }
		>({
			query: (data) => ({
				url: `/admin/coupon-request-status-change/${data.id}`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['AdminCouponRequest'],
		}),
	}),
});

export const {
	useAdminCouponQuery,
	useAdminDeleteCouponMutation,
	useAdminStoreCouponMutation,
	useAdminUpdateCouponMutation,
	useAdminCouponUsersQuery,
	useAdminAllCouponRequestQuery,
	useAdminDeleteCouponRequestMutation,
	useAdminRejectCouponRequestMutation,
} = api;
