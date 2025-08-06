import { apiSlice } from '../../api/apiSlice';
import { iAdminSubscription } from './admin.subscription.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		adminSubscription: builder.query<
			{ data: iAdminSubscription[]; status: 200 },
			undefined
		>({
			query: () => ({
				url: '/admin/subscription',
				method: 'GET',
			}),
			providesTags: ['AdminSubscriptionPlan'],
		}),

		// update
		adminUpdateSubscriptionFeature: builder.mutation<
			{ status: 200; message: string; success: boolean },
			any
		>({
			query: (data) => ({
				url: `/admin/subscription/requirement/${data.id}`,
				body: data,
				method: 'POST',
			}),
			invalidatesTags: ['AdminSubscriptionPlan'],
		}),
		// update
		adminUpdateSubscription: builder.mutation<
			{ status: 200; message: string; success: boolean },
			any
		>({
			query: (data) => ({
				url: `/admin/subscription/${data.id}`,
				body: data,
				method: 'PUT',
			}),
			invalidatesTags: ['AdminSubscriptionPlan'],
		}),
	}),
});

export const {
	useAdminSubscriptionQuery,
	useAdminUpdateSubscriptionMutation,
	useAdminUpdateSubscriptionFeatureMutation,
} = api;
