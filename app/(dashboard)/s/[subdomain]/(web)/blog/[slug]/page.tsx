import ThemeOneBlogDetailPage from '@/components/theme/one/blog-detail';
import ThemeThreeBlogDetailPage from '@/components/theme/three/blog-detail';
import ThemeTwoBlogDetailPage from '@/components/theme/two/blog-detail';
import { getApiDataWithSubdomain } from '@/lib';
import { iCmsBlog } from '@/store/features/vendor/cms/blog/type';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export default async function BlogDetailPage({
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
			return <ThemeOneBlogDetailPage params={{ slug }} />;
		case 'two':
			return <ThemeTwoBlogDetailPage params={{ slug }} />;
		case 'three':
			return <ThemeThreeBlogDetailPage params={{ slug }} />;
		default:
			return <ThemeOneBlogDetailPage params={{ slug }} />;
	}
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const { slug } = await params;

	// fetch product details
	const blog = await getApiDataWithSubdomain<{ news: iCmsBlog }>(
		`/tenant-frontend/news/${slug}`,
	);

	if (!blog) {
		return {
			title: 'Blog Not Found',
		};
	}

	return {
		title: blog?.news?.title || 'Blog Not Found',
		description: blog?.news?.short_description || 'Blog Not Found',
		openGraph: {
			title: blog?.news?.title || 'Blog Not Found',
			description: blog?.news?.short_description || 'Blog Not Found',
			images: blog?.news?.image ? [blog?.news?.image] : [],
		},
	};
}
