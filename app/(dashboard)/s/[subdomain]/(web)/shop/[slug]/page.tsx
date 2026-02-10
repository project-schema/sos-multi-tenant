import ThemeOneProductDetailsPage from '@/components/theme/one/product-details';
import ThemeThreeProductDetailsPage from '@/components/theme/three/product-details';
import ThemeTwoProductDetailsPage from '@/components/theme/two/product-details';
import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { redirect } from 'next/navigation';

export default async function ProductDetailsPage({
	params,
}: {
	params: { slug: string };
}) {
	const { slug } = await params;
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		`/tenant-frontend/cms`
	);
	if (!settings?.cms?.theme) {
		redirect('/auth?tab=login');
	}
	switch (settings?.cms?.theme) {
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
