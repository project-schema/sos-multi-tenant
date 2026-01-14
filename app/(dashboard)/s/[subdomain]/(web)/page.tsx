import ThemeOneHomePage from '@/components/theme/one/home-page';
import ThemeThreeHomePage from '@/components/theme/three/home-page';
import ThemeTwoHomePage from '@/components/theme/two/home-page';
import { env } from '@/lib';

export default async function MySite({
	searchParams,
}: {
	searchParams: Promise<{
		trend: string;
		search: string;
		feature: string;
		include: string;
	}>;
}) {
	const { trend, search, feature, include } = await searchParams;
	switch (env.theme) {
		case 'one':
			return <ThemeOneHomePage />;
		case 'two':
			return (
				<ThemeTwoHomePage searchParams={{ trend, search, feature, include }} />
			);
		case 'three':
			return <ThemeThreeHomePage />;
		default:
			return <ThemeOneHomePage />;
	}
}
