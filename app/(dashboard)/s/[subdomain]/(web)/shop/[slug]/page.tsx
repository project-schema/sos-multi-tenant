import ThemeOneProductDetailsPage from '@/components/theme/one/product-details';
import ThemeThreeProductDetailsPage from '@/components/theme/three/product-details';
import ThemeTwoProductDetailsPage from '@/components/theme/two/product-details';
import { getApiDataWithSubdomain } from '@/lib';
import { iVendorProductView } from '@/store/features/vendor/product/vendor-product-type';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export default async function ProductDetailsPage({
	params,
}: {
	params: { slug: string };
}) {
	const { slug } = await params;
	const settings =
		await getApiDataWithSubdomain<iTenantFrontend>(`/tenant-frontend/cms`);
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

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const { slug } = await params;

	// fetch product details
	const product = await getApiDataWithSubdomain<{
		product: iVendorProductView;
	}>(`/tenant-frontend/product/${slug}`);

	if (!product) {
		return {
			title: 'Product Not Found',
		};
	}

	return {
		title: product?.product?.name || 'Product Not Found',
		description: product?.product?.short_description || 'Product Not Found',
		openGraph: {
			title: product?.product?.name || 'Product Not Found',
			description: product?.product?.short_description || 'Product Not Found',
			images: product?.product?.image ? [product?.product?.image] : [],
		},
	};
}
