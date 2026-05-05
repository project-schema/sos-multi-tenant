'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Mic, Paperclip, Send, Smile } from 'lucide-react';
import { useState } from 'react';
import { useSendMessageMutation } from './api-slice';

export function ChatInput({ receiverId }: { receiverId: string }) {
	const [value, setValue] = useState('');
	const [sendMessage, { isLoading }] = useSendMessageMutation();

	const handleSend = async () => {
		if (!value.trim()) return;

		try {
			await sendMessage({
				message: value,
				receiver_id: receiverId,
			}).unwrap();

			setValue(''); // clear input after send
		} catch (error) {
			console.error('Send message failed:', error);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSend();
		}
	};

	return (
		<>
			<Separator />
			<div className="flex items-center gap-2 px-4 py-3">
				<Input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={handleKeyPress}
					placeholder="Type a message..."
					className="flex-1 h-9 text-[13.5px] bg-muted/50 border-border rounded-xl focus-visible:ring-green-500"
				/>

				<div className="flex items-center gap-0.5">
					<Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
						<Smile className="h-4 w-4" />
					</Button>
					<Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
						<Paperclip className="h-4 w-4" />
					</Button>
					<Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
						<Mic className="h-4 w-4" />
					</Button>
				</div>

				<Button
					size="sm"
					onClick={handleSend}
					disabled={isLoading}
					className="h-8 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg text-[13px] font-medium gap-1.5"
				>
					Send
					<Send className="h-3 w-3" />
				</Button>
			</div>
		</>
	);
}
