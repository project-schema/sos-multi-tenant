import { apiSlice } from '../../api/apiSlice';
import { iCrmCompanionResponse } from './crm-admin-companion.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewCrmCompanion: builder.query<
			iCrmCompanionResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/companion?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['CrmAdminCompanion'],
		}),

		// store
		adminStoreCrmCompanion: builder.mutation<
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
					url: `/admin/companion`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['CrmAdminCompanion'],
		}),

		// update
		adminUpdateCrmCompanion: builder.mutation<
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
					url: `/admin/companion/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['CrmAdminCompanion'],
		}),

		// delete
		adminDeleteCrmCompanion: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/companion/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['CrmAdminCompanion'],
		}),
	}),
});

export const {
	useAdminViewCrmCompanionQuery,
	useAdminStoreCrmCompanionMutation,
	useAdminDeleteCrmCompanionMutation,
	useAdminUpdateCrmCompanionMutation,
} = api;
