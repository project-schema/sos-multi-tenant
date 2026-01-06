'use client';

import { Phone } from 'lucide-react';

export function ContactInfo() {
	return (
		<div className="hidden lg:flex items-center gap-2.5">
			<div className="w-10 h-10 bg-white border border-[#DBDFE9] rounded-full flex items-center justify-center flex-shrink-0">
				<Phone className="w-5 h-5 text-orange-500" />
			</div>
			<div className="flex flex-col gap-0.5">
				<span className="text-xs text-orange-600 leading-tight">
					Contact
				</span>
				<span className="text-sm font-bold text-black/70 leading-tight">
					+880 124 36626
				</span>
			</div>
		</div>
	);
}
