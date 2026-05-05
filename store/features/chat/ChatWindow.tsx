import { ScrollArea } from '@/components/ui/scroll-area';
import { Contact, Message } from './chat';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { MessageBubble } from './MessageBubble';

interface ChatWindowProps {
	contact: Contact;
	messages: Message[];
}

export function ChatWindow({ contact, messages }: ChatWindowProps) {
	return (
		<div className="hidden md:flex flex-1 flex-col min-w-0 bg-background">
			<ChatHeader contact={contact} />

			<ScrollArea className="flex-1 px-5 py-4">
				<div className="flex flex-col gap-2">
					{messages.map((message) => (
						<MessageBubble key={message.id} message={message} />
					))}
				</div>
			</ScrollArea>

			<ChatInput receiverId="me5" />
		</div>
	);
}
