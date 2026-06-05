'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { AdminDashboardSectionId } from './admin-dashboard-fetch-queue';
import { adminDashboardFetchQueue } from './admin-dashboard-fetch-queue';

export function useInView({ immediate = false }: { immediate?: boolean } = {}) {
	const ref = useRef<HTMLDivElement>(null);
	const [inView, setInView] = useState(immediate);

	useEffect(() => {
		if (immediate || inView) return;

		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					observer.disconnect();
				}
			},
			{ rootMargin: '0px', threshold: 0.1 },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [immediate, inView]);

	return { ref, inView };
}

/** Gate API calls: one admin dashboard section fetches at a time. */
export function useAdminSectionFetch(
	sectionId: AdminDashboardSectionId,
	inView: boolean,
) {
	const [canFetch, setCanFetch] = useState(
		() => inView && adminDashboardFetchQueue.canFetch(sectionId),
	);

	useEffect(() => {
		if (!inView) {
			setCanFetch(false);
			return;
		}

		const unlock = () => setCanFetch(true);
		adminDashboardFetchQueue.subscribe(sectionId, unlock);
		return () => adminDashboardFetchQueue.unsubscribe(sectionId);
	}, [sectionId, inView]);

	return canFetch;
}

/** Mark section done so the next queued section can fetch. */
export function useAdminSectionComplete(
	sectionId: AdminDashboardSectionId,
	canFetch: boolean,
	isLoading: boolean,
	isSettled: boolean,
) {
	useEffect(() => {
		if (!canFetch || isLoading || !isSettled) return;
		adminDashboardFetchQueue.complete(sectionId);
	}, [sectionId, canFetch, isLoading, isSettled]);
}

export function useAdminDashboardQueueReset() {
	const didReset = useRef(false);

	if (!didReset.current) {
		adminDashboardFetchQueue.reset();
		didReset.current = true;
	}

	useLayoutEffect(() => {
		adminDashboardFetchQueue.reset();
		return () => adminDashboardFetchQueue.reset();
	}, []);
}
