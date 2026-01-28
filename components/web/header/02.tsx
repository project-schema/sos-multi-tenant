import { getApiDataWithSubdomain } from '@/lib';
import { iCategory } from '@/store/features/admin/category';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { MainHeader } from './_ctx/main-header';
import { MainNavigation } from './_ctx/main-navigation';
import { TopPromotionalBar } from './_ctx/top-promotional-bar';

export default async function Header02() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms'
	);
	const categories = await getApiDataWithSubdomain<iCategory[]>(
		'/tenant-frontend/categories'
	);
	return (
		<header className="w-full bg-white">
			{/* Top Promotional Bar */}
			{settings?.offers && settings?.offers?.length > 0 && (
				<TopPromotionalBar offers={settings?.offers ?? []} />
			)}

			{/* Main Header Section */}
			<MainHeader cms={settings?.cms ?? null} categories={categories} />

			{/* Main Navigation Bar */}
			<MainNavigation categories={categories} />
		</header>
	);
}
