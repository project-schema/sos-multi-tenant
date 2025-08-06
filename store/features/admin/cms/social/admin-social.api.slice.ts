import { apiSlice } from '../../../api/apiSlice';
import { iCrmSocialResponse } from './admin-social.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewCrmSocial: builder.query<
			iCrmSocialResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/footer-media?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['CrmAdminSocial'],
		}),

		// store
		adminStoreCrmSocial: builder.mutation<
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
					url: `/admin/footer-media`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['CrmAdminSocial'],
		}),

		// update
		adminUpdateCrmSocial: builder.mutation<
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
					url: `/admin/footer-media/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['CrmAdminSocial'],
		}),

		// delete
		adminDeleteCrmSocial: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/footer-media/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['CrmAdminSocial'],
		}),
	}),
});

export const {
	useAdminViewCrmSocialQuery,
	useAdminStoreCrmSocialMutation,
	useAdminDeleteCrmSocialMutation,
	useAdminUpdateCrmSocialMutation,
} = api;
