'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Contact } from './chat';
import { CheckIcon } from './CheckIcon';
import { ContactAvatar } from './ContactAvatar';

interface ContactItemProps {
	contact: Contact;
	isActive: boolean;
	onClick: () => void;
}

export function ContactItem({ contact, isActive, onClick }: ContactItemProps) {
	return (
		<button
			onClick={onClick}
			className={cn(
				'w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted/60 rounded-none',
				isActive && 'bg-muted',
			)}
		>
			<ContactAvatar
				initials={contact.initials}
				colorClass={contact.avatarColor}
				isOnline={contact.isOnline}
			/>

			<div className="flex-1 min-w-0">
				<div className="flex items-center justify-between mb-0.5">
					<span className="text-[13.5px] font-medium text-foreground truncate max-w-[140px]">
						{contact.name}
					</span>
					<span className="text-[11px] text-muted-foreground shrink-0 ml-1">
						{contact.time}
					</span>
				</div>
				<div className="flex items-center gap-1">
					{contact.checkType && <CheckIcon type={contact.checkType} />}
					<span className="text-xs text-muted-foreground truncate">
						{contact.lastMessage}
					</span>
				</div>
			</div>

			{contact.unreadCount && (
				<Badge className="h-[18px] min-w-[18px] px-1 text-[10px] bg-green-500 hover:bg-green-500 shrink-0">
					{contact.unreadCount}
				</Badge>
			)}
		</button>
	);
}
