'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Loader2, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ContactItem } from './ContactItem';
import { iChat } from './type';

interface SidebarProps {
	conversations: iChat[];
	isLoading: boolean;
	isError: boolean;
	activePartnerId: number | null;
	onSelectContact: (partnerId: number) => void;
}

export function Sidebar({
	conversations,
	isLoading,
	isError,
	activePartnerId,
	onSelectContact,
}: SidebarProps) {
	const [search, setSearch] = useState('');

	const filtered = useMemo(() => {
		const q = search.toLowerCase().trim();
		if (!q) return conversations;
		return conversations.filter((c) => {
			const name = c.user.name.toLowerCase();
			const preview = (c.last_message?.message ?? '').toLowerCase();
			return name.includes(q) || preview.includes(q);
		});
	}, [conversations, search]);

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
					{isLoading && (
						<div className="flex justify-center py-8 text-muted-foreground">
							<Loader2 className="h-6 w-6 animate-spin" />
						</div>
					)}
					{isError && !isLoading && (
						<p className="px-3 py-6 text-sm text-destructive text-center">
							Could not load conversations.
						</p>
					)}
					{!isLoading &&
						!isError &&
						filtered.map((contact) => (
							<ContactItem
								key={contact.partner_id}
								contact={contact}
								isActive={contact.partner_id === activePartnerId}
								onClick={() => onSelectContact(contact.partner_id)}
							/>
						))}
					{!isLoading && !isError && filtered.length === 0 && (
						<p className="px-3 py-6 text-sm text-muted-foreground text-center">
							No chats match your search.
						</p>
					)}
				</div>
			</ScrollArea>
		</div>
	);
}
