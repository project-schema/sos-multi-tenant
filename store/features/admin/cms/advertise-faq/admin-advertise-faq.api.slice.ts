import { apiSlice } from '../../../api/apiSlice';
import { iAdvertiseFaqResponse } from './admin-advertise-faq.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewAdvertiseFaq: builder.query<
			iAdvertiseFaqResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/faq?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminAdvertiseFaq'],
		}),

		// store
		adminStoreAdvertiseFaq: builder.mutation<
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
			invalidatesTags: ['AdminAdvertiseFaq'],
		}),

		// update
		adminUpdateAdvertiseFaq: builder.mutation<
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
			invalidatesTags: ['AdminAdvertiseFaq'],
		}),

		// delete
		adminDeleteAdvertiseFaq: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/faq/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminAdvertiseFaq'],
		}),
	}),
});

export const {
	useAdminViewAdvertiseFaqQuery,
	useAdminStoreAdvertiseFaqMutation,
	useAdminDeleteAdvertiseFaqMutation,
	useAdminUpdateAdvertiseFaqMutation,
} = api;
