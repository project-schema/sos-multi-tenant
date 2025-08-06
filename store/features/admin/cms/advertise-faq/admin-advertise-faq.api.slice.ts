import { apiSlice } from '../../../api/apiSlice';
import { iCrmAdvertiseFaqResponse } from './admin-advertise-faq.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewCrmAdvertiseFaq: builder.query<
			iCrmAdvertiseFaqResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/faq?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['CrmAdminAdvertiseFaq'],
		}),

		// store
		adminStoreCrmAdvertiseFaq: builder.mutation<
			{ status: 200; message: string },
			any
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/admin/faq`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['CrmAdminAdvertiseFaq'],
		}),

		// update
		adminUpdateCrmAdvertiseFaq: builder.mutation<
			{ status: 200; message: string },
			any
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});
				body.append('_method', 'PUT');

				return {
					url: `/admin/faq/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['CrmAdminAdvertiseFaq'],
		}),

		// delete
		adminDeleteCrmAdvertiseFaq: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/faq/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['CrmAdminAdvertiseFaq'],
		}),
	}),
});

export const {
	useAdminViewCrmAdvertiseFaqQuery,
	useAdminStoreCrmAdvertiseFaqMutation,
	useAdminDeleteCrmAdvertiseFaqMutation,
	useAdminUpdateCrmAdvertiseFaqMutation,
} = api;
