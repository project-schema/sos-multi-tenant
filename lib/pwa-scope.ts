import { env } from '@/lib/env';

const TENANT_WEB_ROUTES = ['/shop', '/account', '/contact', '/auth', '/blog'];

export function getSubdomainFromHostname(hostname: string): string | null {
	const clean = hostname.split(':')[0].replace(/^www\./, '');

	if (clean.endsWith('.localhost')) {
		const sub = clean.replace('.localhost', '');
		return sub.length > 0 && sub !== 'www' ? sub : null;
	}

	const rootDomain = env.rootDomain?.split(':')[0] ?? 'localhost';

	if (
		clean !== rootDomain &&
		clean !== `www.${rootDomain}` &&
		clean.endsWith(`.${rootDomain}`)
	) {
		const sub = clean.replace(`.${rootDomain}`, '');
		return sub.length > 0 && sub !== 'www' ? sub : null;
	}

	return null;
}

export function isTenantSubdomainHostname(hostname: string): boolean {
	const clean = hostname.split(':')[0];

	if (clean === 'localhost') return false;

	if (clean.endsWith('.localhost')) {
		const sub = clean.replace('.localhost', '');
		return sub.length > 0 && sub !== 'www';
	}

	const rootDomain =
		env.rootDomain?.split(':')[0] ?? 'localhost';

	if (clean === rootDomain || clean === `www.${rootDomain}`) {
		return false;
	}

	if (clean.endsWith(`.${rootDomain}`)) {
		const sub = clean.replace(`.${rootDomain}`, '');
		return sub.length > 0 && sub !== 'www';
	}

	return false;
}

export function getTenantSlugFromPath(pathname: string): string | null {
	const match = pathname.match(/^\/s\/([^/]+)/);
	return match?.[1] ?? null;
}

/** Path-based tenant storefront: /s/shop3, /s/shop3/shop (not dashboard). */
export function isPathBasedTenantStorefront(pathname: string): boolean {
	const match = pathname.match(/^\/s\/([^/]+)(\/.*)?$/);
	if (!match) return false;

	const rest = match[2] ?? '';
	return !rest.startsWith('/dashboard');
}

/** Main marketing site: /, /pricing, etc. (not admin, user, or tenant paths). */
export function isMainFrontendPath(pathname: string): boolean {
	if (pathname.startsWith('/s/')) return false;
	if (pathname.startsWith('/admin')) return false;
	if (pathname.startsWith('/user')) return false;
	if (pathname.startsWith('/dashboard')) return false;

	return true;
}

/**
 * Tenant storefront on a subdomain hostname.
 * Browser URL may be /shop while Next internal route is /s/shop3/shop.
 */
export function isSubdomainHostnameStorefront(
	pathname: string,
	hostname: string,
): boolean {
	if (!isTenantSubdomainHostname(hostname)) return false;
	if (pathname.startsWith('/dashboard')) return false;
	if (pathname.startsWith('/admin')) return false;
	if (pathname.startsWith('/user')) return false;

	if (pathname.startsWith('/s/')) {
		const rest = pathname.replace(/^\/s\/[^/]+/, '') || '/';
		return !rest.startsWith('/dashboard');
	}

	if (pathname === '/') return true;

	return TENANT_WEB_ROUTES.some((route) => pathname.startsWith(route));
}

export function shouldShowPwaPrompt(pathname: string, hostname: string): boolean {
	return (
		isMainFrontendPath(pathname) ||
		isPathBasedTenantStorefront(pathname) ||
		isSubdomainHostnameStorefront(pathname, hostname)
	);
}

export function getPwaStorageKey(pathname?: string, hostname?: string): string {
	const base = 'pwaPromptState';
	const host =
		hostname ??
		(typeof window !== 'undefined' ? window.location.hostname : 'localhost');
	const path =
		pathname ??
		(typeof window !== 'undefined' ? window.location.pathname : '/');

	if (isTenantSubdomainHostname(host)) {
		return `${base}_${host}`;
	}

	const pathSlug = getTenantSlugFromPath(path);
	if (pathSlug) {
		return `${base}_${host}_${pathSlug}`;
	}

	return `${base}_${host}_main`;
}

export function getPwaStorageKeyFromWindow(): string {
	if (typeof window === 'undefined') {
		return 'pwaPromptState';
	}

	return getPwaStorageKey(
		window.location.pathname,
		window.location.hostname,
	);
}
