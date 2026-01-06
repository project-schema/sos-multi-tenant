'use client';

import { Card07 } from '@/components/web';
import Image from 'next/image';
import Link from 'next/link';

const categoryLinks = [
	{ label: 'All', href: '/products' },
	{ label: 'Phones', href: '/product/2' },
	{ label: 'Cameras', href: '/product/3' },
	{ label: 'Lights', href: '/product/4' },
];

export function TrendingProducts() {
	return (
		<div className="max-w-[1720px] mx-auto grid grid-cols-12 gap-6 px-4 lg:px-8">
			<div className="hidden xl:block xl:col-span-3">
				<Image
					src="https://i.ibb.co.com/271yF5QF/Rectangle-14.png"
					alt="Trending products banner"
					width={1000}
					height={1000}
					className="w-full h-full object-cover rounded-[12px]"
				/>
			</div>
			<div className="col-span-12 xl:col-span-9">
				<div className="flex items-center justify-between mb-4 flex-wrap gap-4">
					<h2 className="text-2xl font-semibold">Trending Products</h2>
					<ul className="flex gap-2">
						{categoryLinks.map((link) => (
							<li key={link.href}>
								<Link
									className="text-xs text-black bg-stone-100 rounded-sm px-4 py-1.5 hover:bg-orange-500 hover:text-white transition-all inline-flex"
									href={link.href}
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="grid  grid-cols-1 sm:grid-cols-2  md:grid-cols-3 2xl:grid-cols-4  gap-3 md:gap-6">
					{Array.from({ length: 8 }).map((_, index) => (
						<Card07 key={index} />
					))}
				</div>
			</div>
		</div>
	);
}
