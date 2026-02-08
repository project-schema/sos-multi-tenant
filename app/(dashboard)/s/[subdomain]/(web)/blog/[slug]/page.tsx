import ThemeOneBlogDetailPage from '@/components/theme/one/blog-detail';
import ThemeThreeBlogDetailPage from '@/components/theme/three/blog-detail';
import ThemeTwoBlogDetailPage from '@/components/theme/two/blog-detail';
import { env, getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';

export default async function BlogDetailPage({
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
			return <ThemeOneBlogDetailPage params={{ slug }} />;
		case 'two':
			return <ThemeTwoBlogDetailPage params={{ slug }} />;
		case 'three':
			return <ThemeThreeBlogDetailPage params={{ slug }} />;
		default:
			return <ThemeOneBlogDetailPage params={{ slug }} />;
	}
}
