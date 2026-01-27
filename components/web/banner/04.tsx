import { Button } from '@/components/ui/button';
import { imageFormat } from '@/lib';
import { iBanner } from '@/store/features/vendor/cms/home-page/banner';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Banner04({ banners }: { banners?: iBanner[] }) {
	return (
		<div className="w-full py-[72px] bg-[#F2E4D8]">
			<div className="max-w-[1500px] mx-auto px-4 grid grid-cols-12 gap-24 items-center">
				<div className="space-y-7 col-span-7">
					<h1 className="text-[64px] font-bold text-primary3 capitalize font-kalnia">
						{banners?.[0]?.title}
					</h1>
					<p className="text-gray-700 text-lg font-montserrat">
						{banners?.[0]?.subtitle}
					</p>
					<Link href={banners?.[0]?.link || ''}>
						<Button variant="style3" size="style3">
							Shop Now
							<ArrowRight className="w-4 h-4" />
						</Button>
					</Link>
				</div>
				<div className="col-span-5">
					<div className="relative">
						<span className="absolute top-4 left-4 w-full h-full bg-transparent border border-gray-400 rounded-ss-[160px] rounded-br-[160px]"></span>
						<img
							src={imageFormat(banners?.[0]?.image || null)}
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
