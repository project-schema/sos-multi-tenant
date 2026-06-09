import { env } from '@/lib/env';

export type PwaTenantBranding = {
	name: string;
	shortName: string;
	description: string;
	themeColor: string;
};

export async function fetchPwaTenantBranding(
	subdomain: string,
): Promise<PwaTenantBranding | null> {
	const apiDomain = env.baseAPI.replace(/^https?:\/\//, '');
	const isLocalhost = env.baseAPI.includes('localhost');
	const apiUrl = !isLocalhost
		? `https://${subdomain}.${apiDomain}/api/tenant-frontend/cms`
		: `http://${subdomain}.localhost:8000/api/tenant-frontend/cms`;

	try {
		const res = await fetch(apiUrl, { next: { revalidate: 3600 } });
		if (!res.ok) return null;

		const data = await res.json();
		if (!data?.cms) return null;

		const cms = data.cms;
		const appName = cms.app_name || 'SOS';

		return {
			name: appName,
			shortName: appName.slice(0, 12),
			description: cms.seo_meta_description || 'Shop on the go.',
			themeColor: cms.color_primary || '#0060eb',
		};
	} catch {
		return null;
	}
}
