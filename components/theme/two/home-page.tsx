'use client';

import { Banner03, Card06, Footer02, Header02 } from '@/components/web';
import { useFrontendHomePageDataQuery } from '@/store/features/frontend/frontend-api-slice';
import { BestSellingGrid } from './_ctx/best-selling-grid';
import { BrandLogos } from './_ctx/brand-logos';
import { ImageGrid } from './_ctx/image-grid';
import { ProductSection } from './_ctx/product-section';
import { PromoBanner } from './_ctx/promo-banner';
import { TrendingProducts } from './_ctx/trending-products';

export default function ThemeTwoHomePage() {
	const { data: homePageData } = useFrontendHomePageDataQuery();
	const brandImages = [
		'https://i.ibb.co.com/yBVfbRmv/Rectangle-20.png',
		'https://i.ibb.co.com/Ldpz4nbW/Rectangle-21.png',
		'https://i.ibb.co.com/d44bJc54/Rectangle-22.png',
		'https://i.ibb.co.com/Jw45chsf/Rectangle-23.png',
		'https://i.ibb.co.com/FLprrpYy/Rectangle-18.png',
		'https://i.ibb.co.com/d07h0BJY/Rectangle-19.png',
	];

	const promoImages = [
		'https://i.ibb.co.com/LXx3nKLZ/Rectangle-15.jpg',
		'https://i.ibb.co.com/fVnBqM2D/Rectangle-16.jpg',
		'https://i.ibb.co.com/n8fjJWCs/Rectangle-17.jpg',
	];

	const bannerImages = [
		{
			src: 'https://i.ibb.co.com/r1gtwG2/Group-1000003063-2.png',
			alt: 'Promotional banner 1',
		},
		{
			src: 'https://i.ibb.co.com/h1JxDBcf/Rectangle-24.png',
			alt: 'Promotional banner 2',
		},
	];

	return (
		<>
			<Header02 />
			<div className="space-y-10 ">
				<Banner03 />
				<Card06 />
				<TrendingProducts />
				<ImageGrid images={promoImages} columns={3} />
				<BestSellingGrid columns={4} />
				<BrandLogos images={brandImages} />
				<ProductSection
					title="Best Selling Product"
					buttons={[
						{ label: 'Trending' },
						{ label: 'Phones' },
						{ label: 'Cameras' },
						{ label: 'Lights' },
					]}
					productCount={10}
				/>
				<PromoBanner images={bannerImages} />
				<ProductSection
					title="Best Headphones"
					buttons={[{ label: 'Check All' }]}
					productCount={10}
				/>
			</div>

			<Footer02 />
		</>
	);
}
