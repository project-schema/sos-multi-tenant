'use client';

import { env } from '@/lib';
import Image from 'next/image';

interface Props {
	image?: string;
	title?: string;
	description?: string;
}
export default function Card09({ image, title, description }: Props) {
	return (
		<div className="flex items-center gap-6">
			<div className="max-w-[150px] w-full h-[150px] relative">
				<Image
					src={image || env.placeholderImage}
					alt="image"
					fill
					className="object-cover rounded-full object-center bg-gray-200"
				/>
			</div>
			<div>
				<h3 className="fs-28 text-primary3 mb-3 font-medium font-montserrat">
					{title}
				</h3>
				<p className="fs-14 text-gray-500  ">{description}</p>
			</div>
		</div>
	);
}
