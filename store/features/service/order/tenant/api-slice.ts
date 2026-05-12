import { apiSlice } from '@/store/features/api/apiSlice';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		ServiceOrderStatusCancelReq: builder.mutation<
			{ message: string; status: number; data: 'success' },
			{
				service_order_id: number | string;
				reason?: string;
				status: 'cancel_request';
			}
		>({
			query: (body) => ({
				url: `/tenant-service/status`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['AdminServiceOrder'],
		}),
	}),
});

export const { useServiceOrderStatusCancelReqMutation } = api;
