import { iSubscriptionsType } from '@/types';
import { apiSlice } from '../../api/apiSlice';
// tenant-subscription/buy/subscription/{id}
// tenant-subscription/apply/coupon
// tenant-subscription/buy-subscription
const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// tenant-subscription/buy/subscription/{id}
		FrontendBuySubscription: builder.mutation<
			iSubscriptionsType,
			{ id: string }
		>({
			query: ({ id }) => ({
				url: `/tenant-subscription/buy/subscription/${id}`,
				method: 'POST',
			}),
		}),
		// tenant-subscription/apply/coupon
		FrontendApplyCoupon: builder.mutation<
			{ status: 200; message: string; data: any },
			{ name: string }
		>({
			query: ({ name }) => ({
				url: `/tenant-subscription/apply/coupon`,
				method: 'POST',
				body: { name },
			}),
		}),
		// tenant-subscription/buy-subscription
		FrontendBuySubscriptionPay: builder.mutation<
			{ status: 200; message: string; data: any },
			{
				subscription_id: string;
				payment_type: 'aamarpay';
				coupon_id: string | null;
				tenant_id: string;
			}
		>({
			query: ({ subscription_id, payment_type, coupon_id, tenant_id }) => ({
				url: `/tenant-subscription/buy-subscription`,
				method: 'POST',
				body: { subscription_id, payment_type, coupon_id, tenant_id },
			}),
		}),
	}),
});

export const {
	useFrontendBuySubscriptionMutation,
	useFrontendApplyCouponMutation,
	useFrontendBuySubscriptionPayMutation,
} = api;
