'use client';

import { useState } from 'react';
import { ChatWindow } from './ChatWindow';
import { contacts, messages } from './data';
import { Sidebar } from './Sidebar';

export function ChatApp() {
	const [activeId, setActiveId] = useState('8');

	const activeContact = contacts.find((c) => c.id === activeId) ?? contacts[0];

	return (
		<div className="flex h-screen max-h-[calc(100vh-5rem)] items-center justify-center  px-4">
			<div className="flex w-full  h-full overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
				<Sidebar
					contacts={contacts}
					activeContactId={activeId}
					onSelectContact={setActiveId}
				/>
				<ChatWindow contact={activeContact} messages={messages} />
			</div>
		</div>
	);
}
