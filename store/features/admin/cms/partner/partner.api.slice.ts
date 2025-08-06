import { apiSlice } from '../../../api/apiSlice';
import { iPartnerResponse } from './partner.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewPartner: builder.query<
			iPartnerResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/partner?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminPartner'],
		}),

		// store
		adminStorePartner: builder.mutation<{ status: 200; message: string }, any>({
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
			invalidatesTags: ['AdminPartner'],
		}),

		// update
		adminUpdatePartner: builder.mutation<{ status: 200; message: string }, any>(
			{
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
				invalidatesTags: ['AdminPartner'],
			}
		),

		// delete
		adminDeletePartner: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/partner/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminPartner'],
		}),
	}),
});

export const {
	useAdminViewPartnerQuery,
	useAdminStorePartnerMutation,
	useAdminDeletePartnerMutation,
	useAdminUpdatePartnerMutation,
} = api;
