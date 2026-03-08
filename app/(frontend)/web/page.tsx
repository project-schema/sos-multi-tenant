import { MainWebCTA } from '@/components/main-web/cta';
import { MainWebPricing } from '@/components/main-web/pricing';
import { MainWebSupport } from '@/components/main-web/support';
import { MainWebTestimonial } from '@/components/main-web/testimonial';

export default function page() {
	return (
		<>
			{/* <!-- support section --> */}
			<MainWebSupport />
			{/* <!-- /support section --> */}

			{/* <!-- testimonial section --> */}
			<MainWebTestimonial />
			{/* <!-- /testimonial section --> */}

			{/* <!-- pricing section --> */}
			<MainWebPricing />
			{/* <!-- /pricing section --> */}

			{/* <!-- cta section --> */}
			<MainWebCTA />
			{/* <!-- /callout section --> */}
		</>
	);
}
