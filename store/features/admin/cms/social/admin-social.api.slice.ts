import { apiSlice } from '../../../api/apiSlice';
import { iSocialResponse } from './admin-social.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewSocial: builder.query<iSocialResponse, { page: number | string }>({
			query: ({ page }) => ({
				url: `/admin/footer-media?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminSocial'],
		}),

		// store
		adminStoreSocial: builder.mutation<{ status: 200; message: string }, any>({
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
			invalidatesTags: ['AdminSocial'],
		}),

		// update
		adminUpdateSocial: builder.mutation<{ status: 200; message: string }, any>({
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
			invalidatesTags: ['AdminSocial'],
		}),

		// delete
		adminDeleteSocial: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/footer-media/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminSocial'],
		}),
	}),
});

export const {
	useAdminViewSocialQuery,
	useAdminStoreSocialMutation,
	useAdminDeleteSocialMutation,
	useAdminUpdateSocialMutation,
} = api;
