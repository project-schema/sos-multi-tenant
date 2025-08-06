import { apiSlice } from '../../../api/apiSlice';
import { iCompanionResponse } from './admin-companion.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewCompanion: builder.query<
			iCompanionResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/companion?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminCompanion'],
		}),

		// store
		adminStoreCompanion: builder.mutation<
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
			invalidatesTags: ['AdminCompanion'],
		}),

		// update
		adminUpdateCompanion: builder.mutation<
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
			invalidatesTags: ['AdminCompanion'],
		}),

		// delete
		adminDeleteCompanion: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/companion/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminCompanion'],
		}),
	}),
});

export const {
	useAdminViewCompanionQuery,
	useAdminStoreCompanionMutation,
	useAdminDeleteCompanionMutation,
	useAdminUpdateCompanionMutation,
} = api;
