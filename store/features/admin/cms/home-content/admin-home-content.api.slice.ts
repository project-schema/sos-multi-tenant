import { apiSlice } from '../../../api/apiSlice';
import { iCrmHomeContentResponse } from './admin-home-content.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewCrmHomeContent: builder.query<iCrmHomeContentResponse, undefined>({
			query: () => ({
				url: `/admin/settings`,
				method: 'GET',
			}),
		}),

		// update
		adminUpdateCrmHomeContent: builder.mutation<
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
					url: `/admin/settings-update/1`,
					method: 'POST',
					body,
					formData: true,
				};
			},
		}),
	}),
});

export const {
	useAdminViewCrmHomeContentQuery,
	useAdminUpdateCrmHomeContentMutation,
} = api;
