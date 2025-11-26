'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Banner04() {
	return (
		<div className="w-full py-[72px] bg-[#F2E4D8]">
			<div className="max-w-[1500px] mx-auto px-4 grid grid-cols-12 gap-24 items-center">
				<div className="space-y-7 col-span-7">
					<h1 className="text-[64px] font-bold text-primary3 capitalize font-kalnia">
						designs that express your stories
					</h1>
					<p className="text-gray-700 text-lg font-montserrat">
						We provide the largest clothing collection for any season. You can
						choose trendy or classy design according to your preferences. Our
						services are super fast and we update within 24 hours.
					</p>
					<Button variant="style3" size="style3">
						Shop Now
						<ArrowRight className="w-4 h-4" />
					</Button>
				</div>
				<div className="col-span-5">
					<div className="relative">
						<span className="absolute top-4 left-4 w-full h-full bg-transparent border border-gray-400 rounded-ss-[160px] rounded-br-[160px]"></span>
						<Image
							src="https://i.ibb.co.com/60F5KRSJ/Group-94.jpg"
							alt="Group-94"
							width={1000}
							height={1000}
							className=" relative z-10 rounded-ss-[160px] rounded-br-[160px] max-h-[585px] h-full w-full object-cover block"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
