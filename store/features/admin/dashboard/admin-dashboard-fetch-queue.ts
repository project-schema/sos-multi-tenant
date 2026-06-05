const SECTION_ORDER = [
	'overview',
	'users',
	'products',
	'requests',
	'orders',
	'services',
	'advertise',
	'coupons',
	'membership',
	'subscription',
	'support',
	'withdraw',
] as const;

export type AdminDashboardSectionId = (typeof SECTION_ORDER)[number];

const GAP_MS = 450;

class AdminDashboardFetchQueue {
	private allowedUpTo = 0;
	private waiters = new Map<AdminDashboardSectionId, () => void>();
	private gapTimer: ReturnType<typeof setTimeout> | null = null;

	reset() {
		if (this.gapTimer) clearTimeout(this.gapTimer);
		this.gapTimer = null;
		this.allowedUpTo = 0;
	}

	subscribe(id: AdminDashboardSectionId, onUnlock: () => void) {
		this.waiters.set(id, onUnlock);
		if (this.canFetch(id)) onUnlock();
	}

	unsubscribe(id: AdminDashboardSectionId) {
		this.waiters.delete(id);
	}

	complete(id: AdminDashboardSectionId) {
		const index = SECTION_ORDER.indexOf(id);
		if (index === -1 || index !== this.allowedUpTo) return;

		this.allowedUpTo = index + 1;

		if (this.gapTimer) clearTimeout(this.gapTimer);
		this.gapTimer = setTimeout(() => {
			this.gapTimer = null;
			const nextId = SECTION_ORDER[this.allowedUpTo];
			if (nextId) this.waiters.get(nextId)?.();
		}, GAP_MS);
	}

	canFetch(id: AdminDashboardSectionId): boolean {
		const index = SECTION_ORDER.indexOf(id);
		return index !== -1 && index <= this.allowedUpTo;
	}
}

export const adminDashboardFetchQueue = new AdminDashboardFetchQueue();
