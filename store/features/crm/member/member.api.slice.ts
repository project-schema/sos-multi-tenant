import { apiSlice } from '../../api/apiSlice';
import { iCrmMemberResponse } from './member.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewCrmMember: builder.query<
			iCrmMemberResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/member?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminCrmMember'],
		}),

		// store
		adminStoreCrmMember: builder.mutation<
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
					url: `/admin/member`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminCrmMember'],
		}),

		// update
		adminUpdateCrmMember: builder.mutation<
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
					url: `/admin/member/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminCrmMember'],
		}),

		// delete
		adminDeleteCrmMember: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/member/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminCrmMember'],
		}),
	}),
});

export const {
	useAdminViewCrmMemberQuery,
	useAdminStoreCrmMemberMutation,
	useAdminDeleteCrmMemberMutation,
	useAdminUpdateCrmMemberMutation,
} = api;
