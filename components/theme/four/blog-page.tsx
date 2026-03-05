import Footer04 from '@/components/web/footer/04';
import Header04 from '@/components/web/header/04';
import CommonBlog from '../common/blog';
import ExtraNav from './_ctx/header-extra-nav';

export default function ThemeFourBlogPage() {
	return (
		<>
			<Header04 />
			<ExtraNav />
			<CommonBlog />
			<Footer04 />
		</>
	);
}
