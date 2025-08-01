'use client';
import { Copy, CopyCheck } from 'lucide-react';
// copy to clip board

import { useState } from 'react';

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

export const ClickToCopy = ({ text }: { text: string }) => {
	const { click_button_handler, copied } = CopyClipboardHandler();
	return (
		<button onClick={() => click_button_handler(text)}>
			{!copied ? <Copy /> : <CopyCheck />}
		</button>
	);
};
