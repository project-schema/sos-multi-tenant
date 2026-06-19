'use client';

import { isStandaloneMode, openPwaInstallPrompt } from '@/lib/pwa-install';
import { cn } from '@/lib/utils';
import { selectIsInstalled } from '@/store/features/pwa/pwaSlice';
import { useAppSelector } from '@/store/hooks';
import { Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';

type PwaFooterInstallProps = {
	className?: string;
};

export function PwaFooterInstall({ className }: PwaFooterInstallProps) {
	const isInstalled = useAppSelector(selectIsInstalled);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(!isStandaloneMode());
	}, []);

	if (!visible || isInstalled) return null;

	return (
		<button
			type="button"
			onClick={openPwaInstallPrompt}
			aria-label="Install our app"
			className={cn(
				'inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80',
				className,
			)}
		>
			<Smartphone className="size-4 shrink-0" aria-hidden="true" />
			<span>Install our app</span>
		</button>
	);
}
