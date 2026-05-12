'use client';

import { useEffect, useMemo, useState } from 'react';
import { useGetConversationsQuery } from './api-slice';
import { ChatWindow } from './ChatWindow';
import { Sidebar } from './Sidebar';

export function ChatApp() {
	const { data, isLoading, isError, refetch: refetchConversations } =
		useGetConversationsQuery();

	const conversations = useMemo(
		() => data?.conversations ?? [],
		[data?.conversations],
	);

	const [activePartnerId, setActivePartnerId] = useState<number | null>(null);

	useEffect(() => {
		if (conversations.length === 0) return;
		setActivePartnerId((current) => {
			if (
				current != null &&
				conversations.some((c) => c.partner_id === current)
			) {
				return current;
			}
			return conversations[0]?.partner_id ?? null;
		});
	}, [conversations]);

	const activeConversation =
		conversations.find((c) => c.partner_id === activePartnerId) ?? null;

	const afterSend = () => {
		void refetchConversations();
	};

	return (
		<div className="flex h-screen max-h-[calc(100vh-5rem)] items-center justify-center  px-4">
			<div className="flex w-full  h-full overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
				<Sidebar
					conversations={conversations}
					isLoading={isLoading}
					isError={isError}
					activePartnerId={activePartnerId}
					onSelectContact={setActivePartnerId}
				/>
				<ChatWindow
					activeConversation={activeConversation}
					onMessageSent={afterSend}
				/>
			</div>
		</div>
	);
}
