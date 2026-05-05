'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { useGetConversationsQuery } from './api-slice';
import { Contact } from './chat';
import { ContactItem } from './ContactItem';

interface SidebarProps {
	contacts: Contact[];
	activeContactId: string;
	onSelectContact: (id: string) => void;
}

export function Sidebar({
	contacts,
	activeContactId,
	onSelectContact,
}: SidebarProps) {
	const { data, isLoading, isError } = useGetConversationsQuery();
	const [search, setSearch] = useState('');

	const filtered = contacts.filter((c) =>
		c.name.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className="w-full md:w-[280px] xl:w-[350px] shrink-0 border-r border-border flex flex-col bg-background">
			{/* Header */}
			<div className="flex items-center justify-between px-4 pt-5 pb-3">
				<h2 className="text-lg font-semibold tracking-tight text-foreground">
					Chats
				</h2>
				<Button variant="outline" size="icon" className="h-7 w-7 rounded-md">
					<Plus className="h-3.5 w-3.5" />
				</Button>
			</div>

			{/* Search */}
			<div className="px-3 pb-3 relative">
				<Search className="absolute left-6 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Chats search..."
					className="pl-8 h-8 text-[13px] bg-muted/50 border-border rounded-lg focus-visible:ring-green-500"
				/>
			</div>

			<Separator />

			{/* Contacts list */}
			<ScrollArea className="flex-1 overflow-y-auto">
				<div className="py-1">
					{filtered.map((contact) => (
						<ContactItem
							key={contact.id}
							contact={contact}
							isActive={contact.id === activeContactId}
							onClick={() => onSelectContact(contact.id)}
						/>
					))}
					{filtered.map((contact) => (
						<ContactItem
							key={contact.id}
							contact={contact}
							isActive={contact.id === activeContactId}
							onClick={() => onSelectContact(contact.id)}
						/>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
