'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Loader2, Paperclip, Send, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSendMessageMutation } from './api-slice';

export function ChatInput({
	receiverId,
	onMessageSent,
}: {
	receiverId: number | null;
	onMessageSent?: () => void;
}) {
	const [value, setValue] = useState('');
	const [pickedFile, setPickedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [sendMessage, { isLoading }] = useSendMessageMutation();

	useEffect(() => {
		if (!pickedFile) {
			setPreviewUrl(null);
			return;
		}
		const url = URL.createObjectURL(pickedFile);
		setPreviewUrl(url);
		return () => URL.revokeObjectURL(url);
	}, [pickedFile]);

	const clearImage = useCallback(() => {
		setPickedFile(null);
		setPreviewUrl(null);
		if (fileInputRef.current) fileInputRef.current.value = '';
	}, []);

	const openPicker = () => fileInputRef.current?.click();

	const handleSend = async () => {
		if (receiverId == null) return;
		const text = value.trim();
		if (!text && !pickedFile) return;

		try {
			await sendMessage({
				receiver_id: receiverId,
				message: text,
				...(pickedFile ? { image: pickedFile } : {}),
			}).unwrap();

			setValue('');
			clearImage();
			onMessageSent?.();
		} catch (error) {
			console.error('Send message failed:', error);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSend();
		}
	};

	const canSend =
		receiverId != null && (value.trim().length > 0 || pickedFile != null);

	return (
		<>
			<Separator />
			<div className="px-4 pt-3 pb-3 flex flex-col gap-3">
				{previewUrl && pickedFile && (
					<div
						className={cn(
							'relative inline-flex max-w-[min(100%,280px)] rounded-2xl border border-border bg-muted/40 p-1.5 shadow-sm'
						)}
					>
						<div className=" relative h-36 w-full min-w-[200px] max-w-[260px] overflow-hidden rounded-xl bg-black/5">
							{/* eslint-disable-next-line @next/next/no-img-element -- blob: object URLs */}
							<img
								src={previewUrl}
								alt={pickedFile.name || 'Selected image'}
								className="h-full w-full object-cover"
							/>
						</div>
						<Button
							type="button"
							variant="secondary"
							size="icon"
							className=" absolute -right-2 -top-2 h-7 w-7 rounded-full border border-border bg-background shadow-md hover:bg-muted"
							onClick={clearImage}
							aria-label="Remove image"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				)}

				<div className="flex items-center gap-2">
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						className="hidden"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (file) setPickedFile(file);
						}}
					/>

					<Input
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={handleKeyPress}
						placeholder="Type a message..."
						className="flex-1 h-9 text-[13.5px] bg-muted/50 border-border rounded-xl focus-visible:ring-green-500"
					/>

					<div className="flex items-center gap-0.5">
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="h-8 w-8 rounded-lg hidden"
							onClick={openPicker}
							disabled={receiverId == null}
							aria-label="Attach image"
						>
							<Paperclip className="h-4 w-4" />
						</Button>
					</div>

					<Button
						size="sm"
						onClick={handleSend}
						disabled={isLoading || !canSend}
						className="h-8 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg text-[13px] font-medium gap-1.5"
					>
						{isLoading ? (
							<Loader2 className="h-3 w-3 animate-spin" />
						) : (
							<>
								Send
								<Send className="h-3 w-3" />
							</>
						)}
					</Button>
				</div>
			</div>
		</>
	);
}
