'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn, ErrorAlert, Motion } from '@/lib';
import { AnimatePresence, motion } from 'motion/react';
import {
	Loader1,
	Loader2,
	Loader3,
	Loader4,
	Loader5,
	Loader6,
	Loader7,
	Loader8,
} from '../loader';

const loaderMap: Record<string, React.ComponentType> = {
	'1': Loader1,
	'2': Loader2,
	'3': Loader3,
	'4': Loader4,
	'5': Loader5,
	'6': Loader6,
	'7': Loader7,
	'8': Loader8,
};

export function Container1({
	children,
	header,
	isError,
	isLoading,
	loadingCount = 4,
	loaderName,
}: {
	children: React.ReactNode;
	header?: React.ReactNode;
	isError?: boolean;
	isLoading?: boolean;
	loadingCount?: number;
	loaderName?: string;
}) {
	const LoaderComponent =
		loaderMap[loaderName?.replace('loader-', '') ?? '5'] || Loader5;

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key="page"
				className="w-full px-2 xl:px-4"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
				transition={{
					duration: 0.8,
					delay: 0.5,
					ease: [0, 0.71, 0.2, 1.01],
				}}
			>
				<Card className={cn('gap-0 py-3 lg:py-6')}>
					{header && (
						<CardHeader className={cn('pb-0')}>
							<Motion>{header}</Motion>
						</CardHeader>
					)}
					<CardContent>
						{isError && <ErrorAlert />}
						{!isError &&
							isLoading &&
							Array.from({ length: loadingCount }).map((_, i) => (
								<LoaderComponent key={i} />
							))}

						{!isError && !isLoading && <Motion>{children}</Motion>}
					</CardContent>
				</Card>
			</motion.div>
		</AnimatePresence>
	);
}

/*
	<Container1
		isError={isError}
		isLoading={isLoading}
		header={<></>}
	>
			
	</Container1>

*/
