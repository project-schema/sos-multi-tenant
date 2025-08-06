import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib';
import { LucideIcon } from 'lucide-react';

interface Card1Props {
	title: string | number;
	countTitle: string | number;
	icon?: LucideIcon;
	isLoading?: boolean;
	className?: string;
	iconClassName?: string;
}

export const Card1 = ({
	title,
	countTitle,
	icon: Icon,
	isLoading = false,
	className,
	iconClassName,
}: Card1Props) => {
	return (
		<Card
			className={cn(
				'flex items-center flex-row justify-between px-4 py-2 shadow-sm ' +
					className
			)}
		>
			<div className="flex-1 w-full">
				<CardHeader className={cn('p-0 lg:p-0 lg:gap-0')}>
					<CardTitle
						className={cn(
							'text-base xl:text-base font-medium text-gray-700 capitalize'
						)}
					>
						{title}
					</CardTitle>
				</CardHeader>
				<CardContent
					className={cn('p-0 lg:p-0 flex items-center justify-between')}
				>
					<h2 className="text-xl xl:text-2xl font-bold text-primary capitalize">
						{isLoading ? '...' : countTitle}
					</h2>
					{Icon && (
						<div className={iconClassName || ''}>
							<Icon className="w-8 xl:w-10 h-8 xl:h-10" />
						</div>
					)}
				</CardContent>
			</div>
		</Card>
	);
};
