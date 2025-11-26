import { Banner04, Card09, Card10, Footer03, Header03 } from '@/components/web';
import { env } from '@/lib';
import Image from 'next/image';
import Link from 'next/link';

export default function ThemeThreeHomePage() {
	const categories = [
		{
			image: 'https://ui.shadcn.com/placeholder.svg',
			title: 'Kanjivaram Silk',
			description: 'Featuring luxurious fabrics and detailed craftsmanship.',
		},
		{
			image: 'https://ui.shadcn.com/placeholder.svg',
			title: 'Ari Lehenga',
			description: 'Featuring luxurious fabrics and detailed craftsmanship.',
		},
		{
			image: 'https://ui.shadcn.com/placeholder.svg',
			title: 'Wedding Saree',
			description: 'Featuring luxurious fabrics and detailed craftsmanship.',
		},
		{
			image: 'https://ui.shadcn.com/placeholder.svg',
			title: 'Silk Saree',
			description: 'Featuring luxurious fabrics and detailed craftsmanship.',
		},
	];
	return (
		<>
			<Header03 />
			<Banner04 />
			<main className="bg-[#F6F3E9]">
				<div className="max-w-[1720px] mx-auto py-24">
					<h2 className="fs-50 font-semibold text-center font-kalnia text-primary3 mb-14">
						Categories
					</h2>
					<div className="grid grid-cols-4 gap-6">
						{categories.map((category) => (
							<Card09 key={category.title} {...category} />
						))}
					</div>
				</div>

				<div className="max-w-[1720px] mx-auto pb-24">
					<div className="sp-60 mb-sp">
						<h2 className="fs-50 font-semibold  font-kalnia text-primary3">
							Our Trendy Sarees
						</h2>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						<Card10 />
						<Card10 />
						<Card10 />
						<Card10 />
						<Card10 />
						<Card10 />
						<Card10 />
						<Card10 />
					</div>
				</div>

				<div className="max-w-[1720px] mx-auto pb-24">
					<div className="sp-60 mb-sp">
						<h2 className="fs-50 font-semibold  font-kalnia text-primary3 text-center">
							Western Wedding Attire
						</h2>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						<Card10 />
						<Card10 />
						<Card10 />
						<Card10 />
						<Card10 />
						<Card10 />
						<Card10 />
						<Card10 />
					</div>
				</div>

				<div className="max-w-[1500px] mx-auto pb-24">
					<Image
						src={env.placeholderImage}
						alt="image"
						width={1000}
						height={1000}
						className="w-full h-full object-cover block max-h-[550px]"
					/>
				</div>

				<div className="max-w-[1720px] mx-auto">
					<div className="sp-60 mb-sp flex items-center gap-2 justify-center">
						{['Women Blazer', 'Classy', 'Mad Saree', 'Kanjivaram Silk'].map(
							(item) => (
								<Link
									key={item}
									href="/shop"
									className="flex items-center gap-2 border border-primary3 rounded-full p-2 pe-4 group hover:bg-primary3 hover:text-white transition-all duration-300"
								>
									<Image
										src={env.placeholderImage}
										alt="image"
										width={50}
										height={50}
										className="w-12  rounded-full h-12 object-cover block"
									/>
									<span className="fs-22 font-medium font-kalnia text-primary3 group-hover:text-white transition-all duration-300">
										{item}
									</span>
								</Link>
							)
						)}
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						<Card10 />
						<Card10 />
						<Card10 />
						<Card10 />
						<Card10 />
						<Card10 />
						<Card10 />
						<Card10 />
					</div>
				</div>
			</main>
			<Footer03 />
		</>
	);
}
