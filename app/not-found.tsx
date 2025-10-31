'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ghost } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
	const router = useRouter();
	return (
		<div className="min-h-screen flex items-center justify-center bg-background px-4">
			<Card className="w-full max-w-md text-center shadow-lg">
				<CardHeader>
					<div className="flex flex-col items-center justify-center gap-2">
						<Ghost className="h-12 w-12 text-muted-foreground" />
						<CardTitle className="text-2xl font-bold">Page Not Found</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-muted-foreground">
						Sorry, the page you're looking for doesn't exist or has been moved.
					</p>
					<div className="flex justify-center gap-2">
						<Button onClick={() => router.back()} variant="outline">
							Back
						</Button>
						<Link href="/">
							<Button variant="default">Go Home</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
