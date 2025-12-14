import { apiSlice } from '../../api/apiSlice';
import { INotificationResponse } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all notifications
		GetAllNotifications: builder.query<INotificationResponse, void>({
			query: () => ({
				url: '/notification',
				method: 'GET',
			}),
		}),

		// mark as read
		MarkAsReadAll: builder.mutation<{ status: 200; message: string }, void>({
			query: () => ({
				url: `/mark-as-read-all`,
				method: 'GET',
			}),
		}),

		// mark as read
		MarkAsRead: builder.mutation<
			{ status: 200; message: string },
			{ id: string }
		>({
			query: ({ id }) => ({
				url: `/mark-as-read/${id}`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useGetAllNotificationsQuery,
	useMarkAsReadAllMutation,
	useMarkAsReadMutation,
} = api;
