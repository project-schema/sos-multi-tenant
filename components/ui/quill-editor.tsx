'use client';

import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), {
	ssr: false,
});

interface EditorProps {
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
}

export function Editor({
	value,
	onChange,
	placeholder = 'Type description...',
}: EditorProps) {
	return (
		<div>
			<ReactQuill
				theme="snow"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</div>
	);
}
