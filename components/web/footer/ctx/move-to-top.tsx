'use client';

import { ArrowUp } from 'lucide-react';

export const MoveToTop = () => {
	return (
		<button
			className="flex text-white/85 items-center gap-1 py-3"
			onClick={() => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				});
			}}
		>
			<span>Scroll to Top</span>
			<ArrowUp className="size-5 inline-flex" />
		</button>
	);
};
