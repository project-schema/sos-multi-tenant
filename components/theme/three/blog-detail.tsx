import Footer03 from '@/components/web/footer/03';
import Header03 from '@/components/web/header/03';
import CommonBlogDetail from '../common/blog-detail';

export default function ThemeThreeBlogDetailPage({
	params,
}: {
	params: { slug: string };
}) {
	return (
		<>
			<Header03 />
			<CommonBlogDetail slug={params.slug} />
			<Footer03 />
		</>
	);
}
