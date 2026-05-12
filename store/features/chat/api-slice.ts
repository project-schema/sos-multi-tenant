import { apiSlice } from '../api/apiSlice';
import { iChat, iChatMessage, SendMessageBody } from './type';

function normalizeMessagesResponse(raw: unknown): iChatMessage[] {
	if (Array.isArray(raw)) return raw as iChatMessage[];
	if (raw && typeof raw === 'object') {
		const o = raw as Record<string, unknown>;
		if (Array.isArray(o.messages)) return o.messages as iChatMessage[];
		if (Array.isArray(o.data)) return o.data as iChatMessage[];
	}
	return [];
}

function normalizeSendMessageResponse(raw: unknown): iChatMessage {
	if (raw && typeof raw === 'object') {
		const o = raw as Record<string, unknown>;
		if (o.data && typeof o.data === 'object') return o.data as iChatMessage;
		if (o.message && typeof o.message === 'object')
			return o.message as iChatMessage;
	}
	return raw as iChatMessage;
}

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all conversations
		GetConversations: builder.query<{ conversations: iChat[] }, void>({
			query: () => ({
				url: '/tenant-chat/conversation',
				method: 'GET',
			}),
		}),

		// get messages by peerId
		GetMessages: builder.query<iChatMessage[], string | number>({
			query: (peerId) => ({
				url: `/tenant-chat/messages/${peerId}`,
				method: 'GET',
			}),
			transformResponse: normalizeMessagesResponse,
		}),

		// send message (JSON or multipart when `image` is present)
		SendMessage: builder.mutation<iChatMessage, SendMessageBody>({
			query: ({ receiver_id, message, image }) => {
				if (image) {
					const body = new FormData();
					body.append('receiver_id', String(receiver_id));
					body.append('message', message);
					body.append('image', image);
					return {
						url: '/tenant-chat/messages/send',
						method: 'POST',
						body,
						formData: true,
					};
				}
				return {
					url: '/tenant-chat/messages/send',
					method: 'POST',
					body: { receiver_id, message },
				};
			},
			transformResponse: normalizeSendMessageResponse,
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
