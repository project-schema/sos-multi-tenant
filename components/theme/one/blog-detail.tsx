import Footer01 from '@/components/web/footer/01';
import Header01 from '@/components/web/header/01';
import CommonBlogDetail from '../common/blog-detail';

export default function ThemeOneBlogDetailPage({
	params,
}: {
	params: { slug: string };
}) {
	return (
		<>
			<Header01 />
			<CommonBlogDetail slug={params.slug} />
			<Footer01 />
		</>
	);
}
