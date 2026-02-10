import { BlogCard1 } from '@/components/web';
import { getApiDataWithSubdomain } from '@/lib';
import { iCmsBlog } from '@/store/features/vendor/cms/blog/type';

export default async function CommonBlog() {
	const news = await getApiDataWithSubdomain<{ news: iCmsBlog[] }>(
		`/tenant-frontend/news`
	);

	// Parse tags helper
	const parseTags = (tags: string | string[] | null | undefined): string[] => {
		if (!tags) return [];
		if (Array.isArray(tags)) return tags;
		try {
			const parsed = JSON.parse(tags);
			return Array.isArray(parsed) ? parsed : [tags];
		} catch {
			return tags
				.split(',')
				.map((t) => t.trim())
				.filter(Boolean);
		}
	};

	return (
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
			{news?.news && news.news.length > 0 ? (
				<BlogCard1
					heading="Blog"
					description="Latest news and updates"
					posts={news?.news || []}
				/>
			) : (
				<div className="text-center py-12">
					<p className="text-gray-500 text-lg">No blog posts available</p>
				</div>
			)}
		</main>
	);
}
