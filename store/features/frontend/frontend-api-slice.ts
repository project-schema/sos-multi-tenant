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
} = api;
