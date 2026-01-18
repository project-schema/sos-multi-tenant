import ThemeOneProductDetailsPage from '@/components/theme/one/product-details';
import ThemeThreeProductDetailsPage from '@/components/theme/three/product-details';
import ThemeTwoProductDetailsPage from '@/components/theme/two/product-details';
import { env } from '@/lib';

export default async function ProductDetailsPage({
	params,
}: {
	params: { slug: string };
}) {
	const { slug } = await params;
	switch (env.theme) {
		case 'one':
			return <ThemeOneProductDetailsPage />;
		case 'two':
			return <ThemeTwoProductDetailsPage params={{ slug }} />;
		case 'three':
			return <ThemeThreeProductDetailsPage />;
		default:
			return <ThemeOneProductDetailsPage />;
	}
}
