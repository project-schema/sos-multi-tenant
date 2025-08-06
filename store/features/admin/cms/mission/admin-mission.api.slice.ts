import { apiSlice } from '../../../api/apiSlice';
import { iCrmMissionResponse } from './admin-mission.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewCrmMission: builder.query<
			iCrmMissionResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/mission?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['CrmAdminMission'],
		}),

		// store
		adminStoreCrmMission: builder.mutation<
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
					url: `/admin/mission`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['CrmAdminMission'],
		}),

		// update
		adminUpdateCrmMission: builder.mutation<
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
					url: `/admin/mission/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['CrmAdminMission'],
		}),

		// delete
		adminDeleteCrmMission: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/mission/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['CrmAdminMission'],
		}),
	}),
});

export const {
	useAdminViewCrmMissionQuery,
	useAdminStoreCrmMissionMutation,
	useAdminDeleteCrmMissionMutation,
	useAdminUpdateCrmMissionMutation,
} = api;
