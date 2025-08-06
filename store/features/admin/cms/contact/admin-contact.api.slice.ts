import { apiSlice } from '../../../api/apiSlice';
import { iContactResponse } from './admin-contact.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewContact: builder.query<iContactResponse, undefined>({
			query: () => ({
				url: `/admin/contact-page-data`,
				method: 'GET',
			}),
		}),

		// update
		adminUpdateContact: builder.mutation<{ status: 200; message: string }, any>(
			{
				query: (data) => {
					const body = new FormData();
					Object.entries(data).forEach(([key, value]) => {
						if (value) {
							body.append(key, value as string);
						}
					});

					return {
						url: `/admin/contact-page`,
						method: 'POST',
						body,
						formData: true,
					};
				},
			}
		),
	}),
});

export const { useAdminViewContactQuery, useAdminUpdateContactMutation } = api;
