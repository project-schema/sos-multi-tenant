import { apiSlice } from '../api/apiSlice';
import { iService } from '../vendor/cms/home-page';
import { iBanner } from '../vendor/cms/home-page/banner';
import { iSystem } from '../vendor/cms/system/type';

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

		// get home page data
		FrontendHomePageData: builder.query<
			{
				content_services: iService[];
				content_banners: iBanner[];
				cms: iSystem;
			},
			void
		>({
			query: () => ({
				url: `/tenant-frontend/cms`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useFrontendEmailSubscribeMutation,
	useFrontendContactStoreMutation,
	useFrontendGetDollarRateQuery,
	useFrontendHomePageDataQuery,
} = api;
