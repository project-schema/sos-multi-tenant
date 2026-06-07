/* eslint-disable no-restricted-globals */

const CACHE_PREFIX = 'sos-pwa-';
const CACHE_VERSION = 'v1';
const STATIC_CACHE = `${CACHE_PREFIX}${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_PREFIX}${CACHE_VERSION}-runtime`;
const OFFLINE_URL = '/offline';

const PRECACHE_ASSETS = [
	OFFLINE_URL,
	'/manifest.webmanifest',
	'/icons/icon-192.png',
	'/icons/icon-512.png',
	'/icons/icon-maskable-512.png',
];

const isSameOrigin = (url) => url.origin === self.location.origin;

const isStaticAssetRequest = (request, url) => {
	if (request.destination === 'style') return true;
	if (request.destination === 'script') return true;
	if (request.destination === 'font') return true;
	if (request.destination === 'image') return true;
	if (url.pathname.startsWith('/_next/static/')) return true;
	if (url.pathname.startsWith('/icons/')) return true;
	return false;
};

const cacheFirst = async (request, cacheName) => {
	const cache = await caches.open(cacheName);
	const cached = await cache.match(request);
	if (cached) return cached;

	try {
		const response = await fetch(request);
		if (response.ok) {
			await cache.put(request, response.clone());
		}
		return response;
	} catch {
		return cached || Response.error();
	}
};

const staleWhileRevalidate = async (request, cacheName) => {
	const cache = await caches.open(cacheName);
	const cached = await cache.match(request);

	const networkPromise = fetch(request)
		.then((response) => {
			if (response.ok) {
				void cache.put(request, response.clone());
			}
			return response;
		})
		.catch(() => null);

	return (
		cached ||
		(await networkPromise) ||
		new Response('Offline', {
			status: 503,
			statusText: 'Service Unavailable',
		})
	);
};

const networkFirstNavigation = async (request) => {
	try {
		const response = await fetch(request);
		if (response.ok) {
			const cache = await caches.open(RUNTIME_CACHE);
			void cache.put(request, response.clone());
		}
		return response;
	} catch {
		const cached = await caches.match(request);
		if (cached) return cached;

		const offlinePage = await caches.match(OFFLINE_URL);
		if (offlinePage) return offlinePage;

		return new Response('You are offline.', {
			status: 503,
			headers: { 'Content-Type': 'text/plain; charset=utf-8' },
		});
	}
};

self.addEventListener('message', (event) => {
	if (event.data?.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(STATIC_CACHE)
			.then((cache) => cache.addAll(PRECACHE_ASSETS))
			.then(() => self.skipWaiting()),
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys
						.filter(
							(key) =>
								key.startsWith(CACHE_PREFIX) && !key.includes(CACHE_VERSION),
						)
						.map((key) => caches.delete(key)),
				),
			)
			.then(() => self.clients.claim()),
	);
});

self.addEventListener('fetch', (event) => {
	const { request } = event;

	if (request.method !== 'GET') return;

	const url = new URL(request.url);

	if (request.mode === 'navigate') {
		event.respondWith(networkFirstNavigation(request));
		return;
	}

	if (url.pathname === '/manifest.webmanifest') {
		event.respondWith(cacheFirst(request, STATIC_CACHE));
		return;
	}

	if (isSameOrigin(url) && isStaticAssetRequest(request, url)) {
		event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
		return;
	}

	if (!isSameOrigin(url)) {
		if (request.destination === 'font' || request.destination === 'image') {
			event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
		}
	}
});
