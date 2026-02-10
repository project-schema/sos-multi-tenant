import ThemeOneBlogPage from '@/components/theme/one/blog-page';
import ThemeThreeBlogPage from '@/components/theme/three/blog-page';
import ThemeTwoBlogPage from '@/components/theme/two/blog-page';
import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { redirect } from 'next/navigation';

export default async function BlogPage() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		`/tenant-frontend/cms`
	);
	if (!settings?.cms?.theme) {
		redirect('/auth?tab=login');
	}
	switch (settings?.cms?.theme) {
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
