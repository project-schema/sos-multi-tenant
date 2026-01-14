import { apiSlice } from '@/store/features/api/apiSlice';

export interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

const contactApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		storeContact: builder.mutation({
			query: (contactData: ContactFormData) => ({
				url: '/tenant-frontend/contact',
				method: 'POST',
				body: contactData,
			}),
		}),
	}),
});

export const { useStoreContactMutation } = contactApi;
