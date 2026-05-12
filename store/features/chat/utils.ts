const AVATAR_GRADIENTS = [
	'from-pink-300 to-purple-400',
	'from-blue-300 to-indigo-400',
	'from-yellow-300 to-orange-400',
	'from-green-300 to-teal-400',
	'from-red-300 to-rose-400',
	'from-violet-300 to-purple-400',
	'from-emerald-300 to-blue-400',
	'from-amber-200 to-amber-400',
	'from-green-100 to-emerald-400',
	'from-pink-200 to-fuchsia-400',
	'from-sky-200 to-cyan-400',
] as const;

export function getChatInitials(name: string) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length >= 2) {
		return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
	}
	const single = parts[0] ?? '?';
	return single.slice(0, 2).toUpperCase();
}

export function getAvatarGradientClass(seed: number) {
	const idx = Math.abs(seed) % AVATAR_GRADIENTS.length;
	return AVATAR_GRADIENTS[idx];
}

export function formatChatListTime(iso: string | undefined) {
	if (!iso) return '';
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return '';

	const now = new Date();
	const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const startOfMsg = new Date(d.getFullYear(), d.getMonth(), d.getDate());
	const diffDays = Math.floor(
		(startOfToday.getTime() - startOfMsg.getTime()) / (24 * 60 * 60 * 1000),
	);

	if (diffDays === 0) {
		return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
	}
	if (diffDays === 1) return 'Yesterday';
	if (diffDays < 7) return `${diffDays} days ago`;
	return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function formatMessageTime(iso: string) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return '';
	return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}
