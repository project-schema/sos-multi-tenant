import { apiSlice } from '../../api/apiSlice';
import { iCrmPartnerResponse } from './partner.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewCrmPartner: builder.query<
			iCrmPartnerResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/partner?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminCrmPartner'],
		}),

		// store
		adminStoreCrmPartner: builder.mutation<
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
					url: `/admin/partner`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminCrmPartner'],
		}),

		// update
		adminUpdateCrmPartner: builder.mutation<
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
					url: `/admin/partner/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminCrmPartner'],
		}),

		// delete
		adminDeleteCrmPartner: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/partner/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminCrmPartner'],
		}),
	}),
});

export const {
	useAdminViewCrmPartnerQuery,
	useAdminStoreCrmPartnerMutation,
	useAdminDeleteCrmPartnerMutation,
	useAdminUpdateCrmPartnerMutation,
} = api;
