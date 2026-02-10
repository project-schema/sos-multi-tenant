import { dateFormat, env, getApiDataWithSubdomain } from '@/lib';
import { iCmsBlog } from '@/store/features/vendor/cms/blog/type';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function CommonBlogDetail({ slug }: { slug: string }) {
	const blog = await getApiDataWithSubdomain<{ news: iCmsBlog }>(
		`/tenant-frontend/news/${slug}`
	);

	if (!blog?.news) {
		return (
			<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<div className="text-center py-12">
					<h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
					<Link
						href="/blog"
						className="text-primary hover:underline inline-flex items-center gap-2"
					>
						<ArrowLeft className="w-4 h-4" />
						Back to Blog
					</Link>
				</div>
			</main>
		);
	}

	const item = blog.news;

	// Parse tags
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

	const tags = parseTags(item.tags);
	const imageUrl = item.image
		? item.image.startsWith('http')
			? item.image
			: `${env.baseAPI}/${item.image}`
		: null;

	return (
		<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
			{/* Article */}
			<article>
				{/* Header */}
				<header className="mb-8">
					{/* Title */}
					<h1 className="text-4xl md:text-5xl font-bold mb-4">{item.title}</h1>

					{/* Meta */}
					<div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
						<time dateTime={item.created_at}>
							{dateFormat(item.created_at)}
						</time>
					</div>
				</header>

				{/* Featured Image */}
				{imageUrl && (
					<div className="mb-8 rounded-lg overflow-hidden">
						<img
							src={imageUrl}
							alt={item.title}
							className="w-full h-auto object-cover"
						/>
					</div>
				)}

				{/* Short Description */}
				{item.short_description && (
					<p className="text-xl text-gray-700 mb-6 leading-relaxed">
						{item.short_description}
					</p>
				)}

				{/* Long Description */}
				<div
					className="prose prose-lg max-w-none mb-8"
					dangerouslySetInnerHTML={{
						__html: item.long_description || '',
					}}
				/>

				{/* Footer */}
				<footer className="mt-12 pt-8 border-t border-gray-200">
					{/* Tags */}
					{tags.length > 0 && (
						<div className="flex flex-wrap gap-2 mb-4 text-gray-600">
							Tags:{' '}
							{tags.map((tag, idx) => (
								<span
									key={idx}
									className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
								>
									{tag}
								</span>
							))}
						</div>
					)}

					<div className="flex items-center justify-between">
						<Link
							href="/blog"
							className="inline-flex items-center gap-2 text-primary hover:underline"
						>
							<ArrowLeft className="w-4 h-4" />
							Back to Blog
						</Link>
					</div>
				</footer>
			</article>
		</main>
	);
}
