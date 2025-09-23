'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type ChatAuthor = 'me' | 'support';

type ChatMessage = {
	id: number;
	author: ChatAuthor;
	text: string;
	timestamp: string; // HH:MM
};

function formatNow() {
	const d = new Date();
	const hh = String(d.getHours()).padStart(2, '0');
	const mm = String(d.getMinutes()).padStart(2, '0');
	return `${hh}:${mm}`;
}

export function VendorSupportView() {
	const [messages, setMessages] = useState<ChatMessage[]>([
		{
			id: 1,
			author: 'support',
			text: 'Hi! 👋 How can we help you today?',
			timestamp: formatNow(),
		},
	]);
	const [input, setInput] = useState('');
	const [isSupportTyping, setIsSupportTyping] = useState(false);
	const nextId = useRef(2);
	const listRef = useRef<HTMLDivElement>(null);

	const cannedReplies = useMemo(
		() => [
			'Thanks for reaching out! Could you share more details?',
			"Got it. I'm checking this for you…",
			'I’ve noted this. Anything else you’d like to add?',
			'You can also find guidance in Settings → Help Center.',
			'Happy to help! If you need anything else, just message here.',
		],
		[]
	);
	const replyIndex = useRef(0);

	useEffect(() => {
		// Auto scroll to bottom when messages change
		if (!listRef.current) return;
		listRef.current.scrollTop = listRef.current.scrollHeight;
	}, [messages]);

	function pushMessage(author: ChatAuthor, text: string) {
		setMessages((prev) => [
			...prev,
			{ id: nextId.current++, author, text, timestamp: formatNow() },
		]);
	}

	function handleSend() {
		const text = input.trim();
		if (!text) return;
		setInput('');
		pushMessage('me', text);

		// Simulate support typing and replying
		setIsSupportTyping(true);
		const reply = cannedReplies[replyIndex.current % cannedReplies.length];
		replyIndex.current += 1;
		setTimeout(() => {
			pushMessage('support', reply);
			setIsSupportTyping(false);
		}, 900);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	}

	return (
		<div className="w-full h-full max-h-[700px] flex flex-col border rounded-lg bg-white">
			{/* Header */}
			<div className="px-4 py-3 border-b flex items-center gap-3">
				<div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
					S
				</div>
				<div className="flex-1">
					<div className="font-semibold">Support</div>
					<div className="text-xs text-gray-500">
						Typically replies within a few minutes
					</div>
				</div>
			</div>

			{/* Messages */}
			<div
				ref={listRef}
				className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50"
			>
				{messages.map((m) => (
					<div
						key={m.id}
						className={`flex ${
							m.author === 'me' ? 'justify-end' : 'justify-start'
						}`}
					>
						<div
							className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
								m.author === 'me'
									? 'bg-indigo-600 text-white rounded-br-md'
									: 'bg-white text-gray-800 border rounded-bl-md'
							}`}
						>
							<div>{m.text}</div>
							<div
								className={`mt-1 text-[10px] ${
									m.author === 'me' ? 'text-indigo-100' : 'text-gray-400'
								}`}
							>
								{m.timestamp}
							</div>
						</div>
					</div>
				))}

				{isSupportTyping && (
					<div className="flex justify-start">
						<div className="max-w-[78%] rounded-2xl px-3 py-2 text-sm bg-white border text-gray-600 rounded-bl-md shadow-sm">
							<span className="inline-flex gap-1 items-center">
								<span
									className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
									style={{ animationDelay: '0ms' }}
								/>
								<span
									className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
									style={{ animationDelay: '150ms' }}
								/>
								<span
									className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
									style={{ animationDelay: '300ms' }}
								/>
							</span>
						</div>
					</div>
				)}
			</div>

			{/* Composer */}
			<div className="p-3 border-t bg-white flex items-center gap-2">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Type your message…"
					className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
				/>
				<button
					onClick={handleSend}
					className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50"
					disabled={!input.trim()}
				>
					Send
				</button>
			</div>
		</div>
	);
}
