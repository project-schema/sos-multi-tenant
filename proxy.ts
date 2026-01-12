import { getToken } from 'next-auth/jwt';
import { headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
// import { rootDomain } from '@/lib/utils';
const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
function extractSubdomain(request: NextRequest): string | null {
	const host = request.headers.get('host') || '';
	const hostname = host.split(':')[0];
	const cleanHostname = hostname.startsWith('www.')
		? hostname.slice(4)
		: hostname;

	// Local development
	const isLocalhost =
		cleanHostname === 'localhost' || cleanHostname.endsWith('.localhost');

	if (isLocalhost) {
		// Try to extract subdomain from full URL
		const url = request.url;
		const match = url.match(/:\/\/([^.]+)\.localhost/);
		if (match && match[1]) {
			return match[1];
		}

		// Fallback to splitting
		if (cleanHostname.includes('.localhost')) {
			return cleanHostname.split('.')[0];
		}

		return null;
	}

	const rootDomainFormatted = rootDomain.split(':')[0]; // remove port if any

	// Handle Vercel preview deployments (e.g., tenant---branch.vercel.app)
	if (cleanHostname.includes('---') && cleanHostname.endsWith('.vercel.app')) {
		const parts = cleanHostname.split('---');
		return parts.length > 0 ? parts[0] : null;
	}

	// Regular subdomain detection
	const isSubdomain =
		cleanHostname !== rootDomainFormatted &&
		cleanHostname !== `www.${rootDomainFormatted}` &&
		cleanHostname.endsWith(`.${rootDomainFormatted}`);

	return isSubdomain
		? cleanHostname.replace(`.${rootDomainFormatted}`, '')
		: null;
}

// List of web routes that should NOT have /dashboard prefix
const WEB_ROUTES = ['/shop', '/account', '/contact', '/auth'];

// Check if a pathname is a dashboard route
function isDashboardRoute(pathname: string): boolean {
	// If it already starts with /dashboard, it's a dashboard route
	if (pathname.startsWith('/dashboard')) {
		return true;
	}

	// If it's a web route, it's not a dashboard route
	if (WEB_ROUTES.some((route) => pathname.startsWith(route))) {
		return false;
	}

	// If it's root or empty, it's not a dashboard route
	if (pathname === '/' || pathname === '') {
		return false;
	}

	// Everything else is considered a dashboard route
	return true;
}

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const subdomain = extractSubdomain(request);

	console.log({ subdomain, pathname });

	if (subdomain) {
		// Block access to /admin or /user on subdomains
		if (pathname.startsWith('/admin') || pathname.startsWith('/user')) {
			return NextResponse.redirect(new URL('/', request.url));
		}

		// Determine the correct rewrite path
		let newPathname: string;

		if (pathname === '/') {
			newPathname = `/s/${subdomain}`;
		} else if (pathname.startsWith('/dashboard')) {
			// If pathname already has /dashboard, just prepend /s/${subdomain}
			newPathname = `/s/${subdomain}${pathname}`;
		} else if (isDashboardRoute(pathname)) {
			// Dashboard routes need /dashboard prefix
			newPathname = `/s/${subdomain}/dashboard${pathname}`;
		} else {
			// Web routes (shop, account, etc.) don't need /dashboard
			newPathname = `/s/${subdomain}${pathname}`;
		}

		// Create a new URL with the rewritten pathname, preserving query params and other URL parts
		const url = request.nextUrl.clone();
		url.pathname = newPathname;

		const requestHeaders = new Headers(request.headers);
		requestHeaders.set('x-tenant-subdomain', subdomain);

		return NextResponse.rewrite(url, {
			request: {
				headers: requestHeaders,
			},
		});
	}

	// Protect /admin and /user routes on root domain
	if (pathname.startsWith('/admin') || pathname.startsWith('/user')) {
		const token = await getToken({
			req: request,
			secret: process.env.NEXTAUTH_SECRET,
		});

		console.log({ token });

		// Check if user is authenticated
		if (!token || !token.accessToken) {
			const signInUrl = new URL('/auth', request.url);
			signInUrl.searchParams.set('callbackUrl', pathname);
			return NextResponse.redirect(signInUrl);
		}

		// Check tenant_type for route access
		const tenantType = token.tenant_type || token.user?.tenant_type;

		// Protect /admin routes - only allow 'admin' tenant_type
		if (pathname.startsWith('/admin')) {
			if (tenantType !== 'admin') {
				// Redirect unauthorized users to home or show error
				return NextResponse.redirect(new URL('/', request.url));
			}
		}

		// Protect /user routes - only allow 'user' tenant_type
		if (pathname.startsWith('/user')) {
			if (tenantType !== 'user') {
				// Redirect unauthorized users to home or show error
				return NextResponse.redirect(new URL('/', request.url));
			}
		}
	}

	// Proceed normally on root domain or other paths
	return NextResponse.next();
}

export async function getTenantSubdomain(): Promise<string | null> {
	const h = await headers();
	return h.get('x-tenant-subdomain');
}

export const config = {
	matcher: [
		/*
		 * Match all paths except:
		 * - API routes (/api)
		 * - Next.js internals (/_next)
		 * - Static files like /favicon.ico
		 */
		'/((?!api|_next|[\\w-]+\\.\\w+).*)',
	],
};
