'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Banner03() {
	return (
		<div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[400px] md:h-[500px] lg:h-[750px] select-none">
				{/* Main Image - Full width on mobile, 2/3 on desktop */}
				<div className="col-span-1 lg:col-span-2 relative">
					<Link href="/" className="block w-full h-full relative">
						<Image
							src="https://i.ibb.co.com/FqjpCvgP/Rectangle-11.png"
							alt="Banner"
							fill
							className="object-cover"
							priority
						/>
					</Link>
				</div>

				{/* Right Images - Hidden on mobile, visible on desktop */}
				<div className="hidden lg:grid col-span-1 grid-rows-2 gap-4">
					<Link href="/" className="block w-full h-full relative">
						<Image
							src="https://i.ibb.co.com/PZ2VtgCj/Rectangle-11-1.png"
							alt="Banner"
							fill
							className="object-cover"
						/>
					</Link>

					<Link href="/" className="block w-full h-full relative">
						<Image
							src="https://i.ibb.co.com/FqgFbYk2/Rectangle-12.png"
							alt="Banner"
							fill
							className="object-cover"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}
