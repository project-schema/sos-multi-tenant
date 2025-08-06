import { apiSlice } from '../../../api/apiSlice';
import { iHomeContentResponse } from './admin-home-content.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewHomeContent: builder.query<iHomeContentResponse, undefined>({
			query: () => ({
				url: `/admin/settings`,
				method: 'GET',
			}),
		}),

		// update
		adminUpdateHomeContent: builder.mutation<
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
	useAdminViewHomeContentQuery,
	useAdminUpdateHomeContentMutation,
} = api;
