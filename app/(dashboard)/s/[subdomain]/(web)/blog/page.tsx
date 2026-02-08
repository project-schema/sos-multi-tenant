import ThemeOneBlogPage from '@/components/theme/one/blog-page';
import ThemeThreeBlogPage from '@/components/theme/three/blog-page';
import ThemeTwoBlogPage from '@/components/theme/two/blog-page';
import { env, getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';

export default async function BlogPage() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		`/tenant-frontend/cms`
	);
	switch (settings?.cms?.theme || env.theme) {
		case 'one':
			return <ThemeOneBlogPage />;
		case 'two':
			return <ThemeTwoBlogPage />;
		case 'three':
			return <ThemeThreeBlogPage />;
		default:
			return <ThemeOneBlogPage />;
	}
}
