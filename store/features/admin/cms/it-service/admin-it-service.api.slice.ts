import { apiSlice } from '../../../api/apiSlice';
import { iITServiceResponse } from './admin-it-service.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewITService: builder.query<
			iITServiceResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/it-service?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminITService'],
		}),

		// store
		adminStoreITService: builder.mutation<
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
					url: `/admin/it-service`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminITService'],
		}),

		// update
		adminUpdateITService: builder.mutation<
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
					url: `/admin/it-service/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminITService'],
		}),

		// delete
		adminDeleteITService: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/it-service/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminITService'],
		}),
	}),
});

export const {
	useAdminViewITServiceQuery,
	useAdminStoreITServiceMutation,
	useAdminDeleteITServiceMutation,
	useAdminUpdateITServiceMutation,
} = api;
