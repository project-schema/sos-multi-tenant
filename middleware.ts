import { getToken } from 'next-auth/jwt';
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

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const subdomain = extractSubdomain(request);

	if (subdomain) {
		// Block access to /admin or /user on subdomains
		if (pathname.startsWith('/admin') || pathname.startsWith('/user')) {
			return NextResponse.redirect(new URL('/', request.url));
		}

		// get access vendor and affiliate page
		const newPathname =
			pathname === '/' ? `/s/${subdomain}` : `/s/${subdomain}${pathname}`;

		return NextResponse.rewrite(new URL(newPathname, request.url));
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
