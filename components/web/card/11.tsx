import { ArrowRight } from 'lucide-react';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { env } from '@/lib';
import { iCmsBlog } from '@/store/features/vendor/cms/blog/type';
import Link from 'next/link';

interface BlogCard1Props {
	heading: string;
	description: string;
	posts: iCmsBlog[];
}

const BlogCard1 = ({
	heading = 'Blog Posts',
	description = 'Latest news and updates',
	posts = [],
}: BlogCard1Props) => {
	return (
		<section>
			<div className="text-center mx-auto">
				<h2 className="mb-3 text-3xl mx-auto  font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
					{heading}
				</h2>
				<p className="mb-8 text-muted-foreground mx-auto md:text-base lg:max-w-2xl lg:text-lg">
					{description}
				</p>
			</div>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
				{posts.map((post) => (
					<Card
						key={post.id}
						className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0"
					>
						<div className="aspect-16/9 w-full">
							<Link
								href={`/blog/${post.slug}`}
								className="transition-opacity duration-200 fade-in hover:opacity-70"
							>
								<img
									src={post.image ? `${env.baseAPI}/${post.image}` : ''}
									alt={post.title}
									className="h-full w-full object-cover object-center"
								/>
							</Link>
						</div>
						<CardHeader>
							<h3 className="text-lg font-semibold hover:underline md:text-xl">
								<Link href={`/blog/${post.slug}`}>{post.title}</Link>
							</h3>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">{post.short_description}</p>
						</CardContent>
						<CardFooter>
							<Link
								href={`/blog/${post.slug}`}
								className="flex items-center text-foreground hover:underline"
							>
								Read more
								<ArrowRight className="ml-2 size-4" />
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
		</section>
	);
};

export { BlogCard1 };
