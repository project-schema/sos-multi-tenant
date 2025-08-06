import { apiSlice } from '../../../api/apiSlice';
import { iMissionResponse } from './admin-mission.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewMission: builder.query<
			iMissionResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/mission?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminMission'],
		}),

		// store
		adminStoreMission: builder.mutation<{ status: 200; message: string }, any>({
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
			invalidatesTags: ['AdminMission'],
		}),

		// update
		adminUpdateMission: builder.mutation<{ status: 200; message: string }, any>(
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
						url: `/admin/mission/${data.id}`,
						method: 'POST',
						body,
						formData: true,
					};
				},
				invalidatesTags: ['AdminMission'],
			}
		),

		// delete
		adminDeleteMission: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/mission/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminMission'],
		}),
	}),
});

export const {
	useAdminViewMissionQuery,
	useAdminStoreMissionMutation,
	useAdminDeleteMissionMutation,
	useAdminUpdateMissionMutation,
} = api;
