import { apiSlice } from '../../api/apiSlice';
import {
	iAdminContactMessages,
	iAdminEmailSubRes,
} from './user-responses.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// email subscribers
		adminEmailSubscriber: builder.query<
			iAdminEmailSubRes,
			{ page: number | string }
		>({
			query: ({ page }) => {
				return {
					url: `/admin/email-subscriber-list?page=${page}`,
					method: 'GET',
				};
			},
		}),

		// contact messages
		adminContactMessages: builder.query<
			{ status: 200; data: iAdminContactMessages[] },
			undefined
		>({
			query: () => ({
				url: `/admin/contact-messages`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useAdminEmailSubscriberQuery, useAdminContactMessagesQuery } =
	api;
