import { apiSlice } from '../api/apiSlice';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// /api/email-subscribe
		frontendEmailSubscribe: builder.mutation<
			{ data: 'success'; message: string },
			{ email: string }
		>({
			query: (data) => ({
				url: `/email-subscribe`,
				method: 'POST',
				body: data,
			}),
		}),

		// get doller-rate
		frontendGetDollarRate: builder.query<
			{ data: string; message: { amount: number }; status: number },
			undefined
		>({
			query: () => ({
				url: `/doller-rate`,
				method: 'GET',
			}),
		}),
		// contact message store api/contact-store
		frontendContactStore: builder.mutation<
			{ errors: any; data: 'success'; message: string; status: number },
			any
		>({
			query: (data) => ({
				url: `/contact-store`,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const {
	useFrontendEmailSubscribeMutation,
	useFrontendContactStoreMutation,
	useFrontendGetDollarRateQuery,
} = api;
