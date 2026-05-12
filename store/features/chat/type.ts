export type iChatUser = {
	id: number;
	name: string;
	email: string;
	uniqid: null;
	role_type: string;
	last_seen: string;
	created_at: string;
	updated_at: string;
};

export type iChatMessage = {
	id: number;
	tenant_id: string;
	conversation_id: number;
	sender_id: number;
	receiver_id: number;
	user_id: number;
	message: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	sender: iChatUser;
	receiver: iChatUser;
};

export type iChat = {
	partner_id: number;
	me: iChatUser;
	user: iChatUser;
	last_message: {
		id: number;
		tenant_id: string;
		conversation_id: number;
		sender_id: number;
		receiver_id: number;
		user_id: number;
		message: string;
		deleted_at: null;
		created_at: string;
		updated_at: string;
		sender: iChatUser;
		receiver: iChatUser;
	};
	messages: iChatMessage[];
};

export type SendMessageBody = {
	receiver_id: number;
	/** Plain text; can be empty when sending image-only if the API allows it */
	message: string;
	/** When set, request is sent as multipart FormData */
	image?: File;
};
