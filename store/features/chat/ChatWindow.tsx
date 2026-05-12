'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { useGetMessagesQuery } from './api-slice';
import { Message } from './chat';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { MessageBubble } from './MessageBubble';
import { iChat } from './type';
import { formatMessageTime } from './utils';

interface ChatWindowProps {
	activeConversation: iChat | null;
	onMessageSent: () => void;
}

export function ChatWindow({
	activeConversation,
	onMessageSent,
}: ChatWindowProps) {
	const { data: session } = useSession();
	const myId = session?.user?.id;

	const partnerId = activeConversation?.partner_id;
	const skip = partnerId == null;

	const {
		data: rawMessages = [],
		isLoading,
		isFetching,
		isError,
		refetch,
	} = useGetMessagesQuery(partnerId ?? 0, { skip: skip || partnerId === 0 });

	const messages: Message[] = useMemo(() => {
		if (!myId) return [];
		return rawMessages.map((m) => ({
			id: String(m.id),
			content: m.message,
			time: formatMessageTime(m.created_at),
			isSent: m.sender_id === myId,
		}));
	}, [rawMessages, myId]);

	const refresh = () => {
		void refetch();
		onMessageSent();
	};

	return (
		<div className="hidden md:flex flex-1 flex-col min-w-0 bg-background">
			{activeConversation ? (
				<>
					<ChatHeader
						peer={activeConversation.user}
						partnerId={activeConversation.partner_id}
					/>

					<ScrollArea className="flex-1 px-5 py-4">
						<div className="flex flex-col gap-2">
							{(isLoading || isFetching) && messages.length === 0 && (
								<p className="text-sm text-muted-foreground text-center py-8">
									Loading messages…
								</p>
							)}
							{isError && (
								<p className="text-sm text-destructive text-center py-8">
									Could not load messages.
								</p>
							)}
							{messages.map((message) => (
								<MessageBubble key={message.id} message={message} />
							))}
							{!isLoading && !isError && messages.length === 0 && (
								<p className="text-sm text-muted-foreground text-center py-8">
									No messages yet. Say hello.
								</p>
							)}
						</div>
					</ScrollArea>

					<ChatInput receiverId={partnerId ?? null} onMessageSent={refresh} />
				</>
			) : (
				<div className="flex flex-1 items-center justify-center px-6">
					<p className="text-sm text-muted-foreground text-center">
						Select a conversation to start messaging.
					</p>
				</div>
			)}
		</div>
	);
}
