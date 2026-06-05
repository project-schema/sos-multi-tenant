'use client';

import { Loader2 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ErrorAlert } from '@/lib';
import type { ReactNode } from 'react';

export function AdminSectionLoader({ title }: { title?: string }) {
	return (
		<Card className="shadow-none">
			<CardContent className="flex min-h-[200px] flex-col items-center justify-center gap-3 py-12">
				{title && (
					<p className="text-sm font-medium text-muted-foreground">{title}</p>
				)}
				<Loader2 />
			</CardContent>
		</Card>
	);
}

export function AdminSectionError({
	title,
	onRetry,
}: {
	title: string;
	onRetry: () => void;
}) {
	return (
		<Card className="shadow-none">
			<CardContent className="py-6">
				<ErrorAlert title={`Failed to load ${title}`}>
					<p>Could not load {title.toLowerCase()} statistics.</p>
					<Button
						variant="outline"
						size="sm"
						className="mt-3"
						onClick={onRetry}
					>
						Try again
					</Button>
				</ErrorAlert>
			</CardContent>
		</Card>
	);
}

export function getSectionUiState({
	canFetch,
	inView = true,
	isLoading,
	isFetching,
	isError,
	hasData,
}: {
	canFetch: boolean;
	inView?: boolean;
	isLoading: boolean;
	isFetching: boolean;
	isError: boolean;
	hasData: boolean;
}) {
	const isBusy = !inView || !canFetch || isLoading || isFetching;
	const isFetchDone = inView && canFetch && !isLoading && !isFetching;
	const showError = isFetchDone && (isError || !hasData);

	return { isBusy, showError, isFetchDone };
}

export function AdminSectionState({
	title,
	canFetch,
	inView = true,
	isLoading,
	isFetching = false,
	isError,
	hasData,
	refetch,
	children,
}: {
	title: string;
	canFetch: boolean;
	inView?: boolean;
	isLoading: boolean;
	isFetching?: boolean;
	isError: boolean;
	hasData: boolean;
	refetch: () => void;
	children: ReactNode;
}) {
	const { isBusy, showError } = getSectionUiState({
		canFetch,
		inView,
		isLoading,
		isFetching,
		isError,
		hasData,
	});

	if (isBusy) return <AdminSectionLoader title={title} />;
	if (showError) return <AdminSectionError title={title} onRetry={refetch} />;
	return children;
}
