import ThemeOneHomePage from '@/components/theme/one/home-page';
import ThemeThreeHomePage from '@/components/theme/three/home-page';
import ThemeTwoHomePage from '@/components/theme/two/home-page';
import { env, getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';

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

	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms'
	);
	switch (settings?.cms?.theme || env.theme) {
		case 'one':
			return (
				<ThemeOneHomePage searchParams={{ trend, search, feature, include }} />
			);
		case 'two':
			return (
				<ThemeTwoHomePage searchParams={{ trend, search, feature, include }} />
			);
		case 'three':
			return (
				<ThemeThreeHomePage
					searchParams={{ trend, search, feature, include }}
				/>
			);
		default:
			return (
				<ThemeOneHomePage searchParams={{ trend, search, feature, include }} />
			);
	}
}
