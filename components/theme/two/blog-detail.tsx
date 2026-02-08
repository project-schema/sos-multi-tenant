import Footer02 from '@/components/web/footer/02';
import Header02 from '@/components/web/header/02';
import CommonBlogDetail from '../common/blog-detail';

export default function ThemeTwoBlogDetailPage({
	params,
}: {
	params: { slug: string };
}) {
	return (
		<>
			<Header02 />
			<CommonBlogDetail slug={params.slug} />
			<Footer02 />
		</>
	);
}
