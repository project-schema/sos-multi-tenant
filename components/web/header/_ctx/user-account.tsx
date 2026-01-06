'use client';

import { User } from 'lucide-react';
import Link from 'next/link';

export function UserAccount() {
	return (
		<div className="hidden lg:flex items-center gap-2.5">
			<div className="w-10 h-10 bg-white border border-[#DBDFE9] rounded-full flex items-center justify-center flex-shrink-0">
				<User className="w-5 h-5 text-orange-500" />
			</div>
			<div className="flex flex-col gap-0.5">
				<span className="text-xs text-orange-600 leading-tight">
					Welcome
				</span>
				<Link
					href="/auth"
					className="text-sm font-bold text-black/70 hover:text-orange-500 transition-colors leading-tight"
				>
					Log In / Register
				</Link>
			</div>
		</div>
	);
}
