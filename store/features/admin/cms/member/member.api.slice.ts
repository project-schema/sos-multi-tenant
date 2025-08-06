import { apiSlice } from '../../../api/apiSlice';
import { iMemberResponse } from './member.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewMember: builder.query<iMemberResponse, { page: number | string }>({
			query: ({ page }) => ({
				url: `/admin/member?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminMember'],
		}),

		// store
		adminStoreMember: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/admin/member`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminMember'],
		}),

		// update
		adminUpdateMember: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});
				body.append('_method', 'PUT');

				return {
					url: `/admin/member/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminMember'],
		}),

		// delete
		adminDeleteMember: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/member/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminMember'],
		}),
	}),
});

export const {
	useAdminViewMemberQuery,
	useAdminStoreMemberMutation,
	useAdminDeleteMemberMutation,
	useAdminUpdateMemberMutation,
} = api;
