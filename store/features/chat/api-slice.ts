import { apiSlice } from '../api/apiSlice';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all conversations
		GetConversations: builder.query<any, void>({
			query: () => ({
				url: '/tenant-chat/conversation',
				method: 'GET',
			}),
		}),

		// get messages by peerId
		GetMessages: builder.query<any, string | number>({
			query: (peerId) => ({
				url: `/tenant-chat/messages/${peerId}`,
				method: 'GET',
			}),
		}),

		// send message
		SendMessage: builder.mutation<any, any>({
			query: (data) => ({
				url: '/tenant-chat/messages/send',
				method: 'POST',
				body: data,
			}),
		}),

		// report chat
		ChatReport: builder.mutation<any, { id: number; data: any }>({
			query: ({ id, data }) => ({
				url: `/tenant-chat/chat-report/${id}`,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const {
	useGetConversationsQuery,
	useGetMessagesQuery,
	useSendMessageMutation,
	useChatReportMutation,
} = api;
