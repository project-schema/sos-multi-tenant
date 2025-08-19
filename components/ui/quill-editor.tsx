'use client';

import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), {
	ssr: false,
});

interface EditorProps {
	value?: string;
	onChange?: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
	return (
		<div>
			<ReactQuill theme="snow" value={value} onChange={onChange} />
		</div>
	);
}
