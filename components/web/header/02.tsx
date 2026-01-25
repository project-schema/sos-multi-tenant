import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { MainHeader } from './_ctx/main-header';
import { MainNavigation } from './_ctx/main-navigation';
import { TopPromotionalBar } from './_ctx/top-promotional-bar';

export default async function Header02() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms'
	);
	console.log({ settings });
	return (
		<header className="w-full bg-white">
			{/* Top Promotional Bar */}
			{settings?.offers?.length && settings?.offers?.length > 0 && (
				<TopPromotionalBar offers={settings?.offers ?? []} />
			)}

			{/* Main Header Section */}
			<MainHeader cms={settings?.cms ?? null} />

			{/* Main Navigation Bar */}
			<MainNavigation />
		</header>
	);
}
