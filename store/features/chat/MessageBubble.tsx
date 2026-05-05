import { cn } from '@/lib/utils';
import { Message } from './chat';

interface MessageBubbleProps {
	message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
	return (
		<div
			className={cn(
				'flex flex-col max-w-[72%]',
				message.isSent ? 'self-end items-end' : 'self-start items-start',
			)}
		>
			<div
				className={cn(
					'px-3.5 py-2.5 rounded-2xl text-[13.5px] leading-relaxed shadow-sm border',
					message.isSent
						? 'bg-green-50 border-green-100 text-foreground rounded-br-sm'
						: 'bg-white border-border text-foreground rounded-bl-sm',
				)}
			>
				{message.content}
			</div>
			<span className="text-[11px] text-muted-foreground mt-1 px-1">
				{message.time}
			</span>
		</div>
	);
}
