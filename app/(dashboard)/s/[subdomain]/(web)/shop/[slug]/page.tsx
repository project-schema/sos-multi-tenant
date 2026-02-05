import ThemeOneProductDetailsPage from '@/components/theme/one/product-details';
import ThemeThreeProductDetailsPage from '@/components/theme/three/product-details';
import ThemeTwoProductDetailsPage from '@/components/theme/two/product-details';
import { env, getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';

export default async function ProductDetailsPage({
	params,
}: {
	params: { slug: string };
}) {
	const { slug } = await params;
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		`/tenant-frontend/cms`
	);
	switch (settings?.cms?.theme || env.theme) {
		case 'one':
			return <ThemeOneProductDetailsPage params={{ slug }} />;
		case 'two':
			return <ThemeTwoProductDetailsPage params={{ slug }} />;
		case 'three':
			return <ThemeThreeProductDetailsPage params={{ slug }} />;
		default:
			return <ThemeOneProductDetailsPage params={{ slug }} />;
	}
}
