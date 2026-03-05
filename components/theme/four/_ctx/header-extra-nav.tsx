import { getApiDataWithSubdomain } from '@/lib/api';
import { iCategory } from '@/store/features/admin/category';
import { ExtraNavClient } from './extra-nav-client';

export default async function ExtraNav() {
	const categories = await getApiDataWithSubdomain<iCategory[] | null>(
		'/tenant-frontend/categories',
	);

	return <ExtraNavClient categories={categories || []} />;
}
