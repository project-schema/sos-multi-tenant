'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw, WifiOff } from 'lucide-react';

export default function OfflinePage() {
	return (
		<main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center">
			<div className="mx-auto flex max-w-md flex-col items-center gap-6">
				<div
					className="flex size-24 items-center justify-center rounded-full bg-muted"
					aria-hidden="true"
				>
					<WifiOff className="size-12 text-muted-foreground" />
				</div>

				<div className="space-y-2">
					<h1 className="text-2xl font-semibold tracking-tight text-foreground">
						You&apos;re offline
					</h1>
					<p className="text-sm leading-relaxed text-muted-foreground">
						It looks like you&apos;ve lost your internet connection. Check your
						network and try again.
					</p>
				</div>

				<Button
					type="button"
					size="lg"
					className="w-full sm:w-auto"
					onClick={() => window.location.reload()}
				>
					<RefreshCw className="size-4" aria-hidden="true" />
					Try Again
				</Button>
			</div>
		</main>
	);
}
