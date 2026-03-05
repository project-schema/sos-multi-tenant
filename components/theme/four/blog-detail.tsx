import Footer04 from '@/components/web/footer/04';
import Header04 from '@/components/web/header/04';
import CommonBlogDetail from '../common/blog-detail';
import ExtraNav from './_ctx/header-extra-nav';

export default function ThemeFourBlogDetailPage({
	params,
}: {
	params: { slug: string };
}) {
	return (
		<>
			<Header04 />
			<ExtraNav />
			<CommonBlogDetail slug={params.slug} />
			<Footer04 />
		</>
	);
}
