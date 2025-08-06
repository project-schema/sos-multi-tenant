import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn, ErrorAlert } from '@/lib';
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
		<div className="w-full px-2 xl:px-4">
			<Card className={cn('gap-0 py-3 lg:py-6 rounded-md lg:rounded-xl')}>
				{header && <CardHeader className={cn('pb-4')}>{header}</CardHeader>}
				<CardContent>
					{isError && <ErrorAlert />}
					{!isError &&
						isLoading &&
						Array.from({ length: loadingCount }).map((_, i) => (
							<LoaderComponent key={i} />
						))}
					{!isError && !isLoading && children}
				</CardContent>
			</Card>
		</div>
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
