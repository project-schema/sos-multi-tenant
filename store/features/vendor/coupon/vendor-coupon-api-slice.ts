import { apiSlice } from '../../api/apiSlice';
import {
	iVendorCouponRequest,
	iVendorCouponResponse,
} from './vendor-coupon-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		vendorCoupon: builder.query<iVendorCouponResponse, any>({
			query: () => ({
				url: '/tenant-coupons/list',
				method: 'GET',
			}),
			providesTags: ['VendorCoupon'],
		}),
		vendorCouponRequest: builder.query<
			{
				status: 200;
				data: 'success';
				message: iVendorCouponRequest;
			},
			any
		>({
			query: () => ({
				url: '/tenant-coupons/request-list',
				method: 'GET',
			}),
			providesTags: ['VendorCoupon'],
		}),
		vendorCouponRequestSend: builder.mutation<any, any>({
			query: (body) => ({
				url: '/tenant-coupons/request-send',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['VendorCoupon'],
		}),
	}),
});

export const {
	useVendorCouponQuery,
	useVendorCouponRequestQuery,
	useVendorCouponRequestSendMutation,
} = api;
