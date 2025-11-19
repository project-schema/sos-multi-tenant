import { Button } from '@/components/ui/button';
import {
	Banner03,
	Card06,
	Card07,
	Card08,
	Footer02,
	Header02,
} from '@/components/web';
import Image from 'next/image';

export default function ThemeTwoHomePage() {
	const images = [
		'https://i.ibb.co.com/yBVfbRmv/Rectangle-20.png',
		'https://i.ibb.co.com/Ldpz4nbW/Rectangle-21.png',
		'https://i.ibb.co.com/d44bJc54/Rectangle-22.png',
		'https://i.ibb.co.com/Jw45chsf/Rectangle-23.png',
		'https://i.ibb.co.com/FLprrpYy/Rectangle-18.png',
		'https://i.ibb.co.com/d07h0BJY/Rectangle-19.png',
	];
	return (
		<>
			<Header02 />
			<Banner03 />
			<div className="space-y-10">
				<Card06 />

				<div className="max-w-[1720px] mx-auto grid grid-cols-12 gap-6">
					<div className="col-span-3">
						<Image
							src="https://i.ibb.co.com/271yF5QF/Rectangle-14.png"
							alt="image"
							width={1000}
							height={1000}
						/>
					</div>
					<div className="col-span-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
					</div>
				</div>

				<div className="grid grid-cols-3 gap-6 max-w-[1720px] mx-auto ">
					<Image
						src="https://i.ibb.co.com/LXx3nKLZ/Rectangle-15.jpg"
						alt="image"
						width={1000}
						height={1000}
					/>
					<Image
						src="https://i.ibb.co.com/fVnBqM2D/Rectangle-16.jpg"
						alt="image"
						width={1000}
						height={1000}
					/>
					<Image
						src="https://i.ibb.co.com/n8fjJWCs/Rectangle-17.jpg"
						alt="image"
						width={1000}
						height={1000}
					/>
				</div>

				<div className="grid grid-cols-3 gap-6 max-w-[1720px] mx-auto ">
					<div>
						<h2>Best Selling Products</h2>
						<div className="space-y-6">
							<Card08 />
							<Card08 />
							<Card08 />
							<Card08 />
						</div>
					</div>
					<div>
						<h2>Best Selling Products</h2>
						<div className="space-y-6">
							<Card08 />
							<Card08 />
							<Card08 />
							<Card08 />
						</div>
					</div>
					<div>
						<h2>Best Selling Products</h2>
						<div className="space-y-6">
							<Card08 />
							<Card08 />
							<Card08 />
							<Card08 />
						</div>
					</div>
				</div>

				<div className="flex gap-10 justify-between max-w-[1720px] mx-auto">
					{images.map((image) => (
						<Image
							key={image}
							src={image}
							alt="image"
							width={1000}
							height={1000}
						/>
					))}
				</div>

				<div className="max-w-[1720px] mx-auto">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-semibold">Best Selling Product</h2>
						<div className="flex gap-2">
							<Button variant="outline">Trending</Button>
							<Button variant="outline">Phones</Button>
							<Button variant="outline">Cameras</Button>
							<Button variant="outline">Lights</Button>
						</div>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
					</div>
				</div>
				<div className="flex gap-10 justify-between max-w-[1720px] mx-auto">
					<Image
						src="https://i.ibb.co.com/r1gtwG2/Group-1000003063-2.png"
						alt="image"
						width={1000}
						height={1000}
					/>
					<Image
						src="https://i.ibb.co.com/h1JxDBcf/Rectangle-24.png"
						alt="image"
						width={1000}
						height={1000}
					/>
				</div>

				<div className="max-w-[1720px] mx-auto">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-semibold"> Best Headphones</h2>
						<div className="flex gap-2">
							<Button variant="outline">Check All</Button>
						</div>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
						<Card07 />
					</div>
				</div>
			</div>

			<Footer02 />
		</>
	);
}
