import { dateFormat, env, getApiDataWithSubdomain } from '@/lib';
import { iCmsBlog } from '@/store/features/vendor/cms/blog/type';
import Link from 'next/link';

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
			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-2">Blog</h1>
				<p className="text-gray-600">Latest news and updates</p>
			</div>

			{news?.news && news.news.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{news.news.map((item) => {
						const imageUrl = item.image
							? item.image
								? `${env.baseAPI}/${item.image}`
								: null
							: null;

						const tags = parseTags(item.tags);

						return (
							<Link key={item.id} href={`/blog/${item.slug}`} className="group">
								<article className="h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
									{/* Image */}
									{imageUrl ? (
										<div className="relative w-full h-48 overflow-hidden">
											<img
												src={imageUrl}
												alt={item.title}
												className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
											/>
										</div>
									) : (
										<div className="w-full h-48 bg-gray-200 flex items-center justify-center">
											<span className="text-gray-400">No Image</span>
										</div>
									)}

									{/* Content */}
									<div className="p-6 flex-1 flex flex-col">
										{/* Tags */}
										{tags.length > 0 && (
											<div className="flex flex-wrap gap-2 mb-3">
												{tags.slice(0, 3).map((tag, idx) => (
													<span
														key={idx}
														className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
													>
														{tag}
													</span>
												))}
											</div>
										)}

										{/* Title */}
										<h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
											{item.title}
										</h2>

										{/* Short Description */}
										<p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
											{item.short_description}
										</p>

										{/* Date */}
										<div className="mt-auto pt-4 border-t border-gray-100">
											<p className="text-xs text-gray-500">
												{dateFormat(item.created_at)}
											</p>
										</div>
									</div>
								</article>
							</Link>
						);
					})}
				</div>
			) : (
				<div className="text-center py-12">
					<p className="text-gray-500 text-lg">No blog posts available</p>
				</div>
			)}
		</main>
	);
}
