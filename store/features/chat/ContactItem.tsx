'use client';

import { cn } from '@/lib/utils';
import { ContactAvatar } from './ContactAvatar';
import { iChat } from './type';
import {
	formatChatListTime,
	getAvatarGradientClass,
	getChatInitials,
} from './utils';

interface ContactItemProps {
	contact: iChat;
	isActive: boolean;
	onClick: () => void;
}

export function ContactItem({ contact, isActive, onClick }: ContactItemProps) {
	const peer = contact.user;
	const last = contact.last_message;
	const preview = last?.message ?? '';

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				'w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted/60 rounded-none',
				isActive && 'bg-muted',
			)}
		>
			<ContactAvatar
				initials={getChatInitials(peer.name)}
				colorClass={getAvatarGradientClass(contact.partner_id)}
			/>

			<div className="flex-1 min-w-0">
				<div className="flex items-center justify-between mb-0.5">
					<span className="text-[13.5px] font-medium text-foreground truncate max-w-[140px]">
						{peer.name}
					</span>
					<span className="text-[11px] text-muted-foreground shrink-0 ml-1">
						{formatChatListTime(last?.created_at)}
					</span>
				</div>
				<div className="flex items-center gap-1">
					<span className="text-xs text-muted-foreground truncate">
						{preview}
					</span>
				</div>
			</div>
		</button>
	);
}
