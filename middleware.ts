import { type NextRequest, NextResponse } from 'next/server';
import { rootDomain } from '@/lib/utils';

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
