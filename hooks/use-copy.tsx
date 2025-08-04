'use client';
import { Copy, CopyCheck } from 'lucide-react';
// copy to clip board

import React, { useState } from 'react';

// const {copy_data, set_copy_data, copied, click_button_handler}=CopyClipboardHandler()
export function CopyClipboardHandler() {
	const [copied, setCopied] = useState(false);
	const [copy_data, set_copy_data] = useState('');

	const click_button_handler = (e: string) => {
		set_copy_data(e);
		navigator.clipboard.writeText(e);
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 3000);
	};

	return { copy_data, set_copy_data, copied, click_button_handler };
}

interface ClickToCopyProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	iconClassName?: string;
}

export const ClickToCopy = ({
	text,
	iconClassName,
	...props
}: ClickToCopyProps) => {
	const { click_button_handler, copied } = CopyClipboardHandler();

	return (
		<button onClick={() => click_button_handler(text)} {...props}>
			{!copied ? (
				<Copy className={iconClassName} />
			) : (
				<CopyCheck className={iconClassName} />
			)}
		</button>
	);
};
