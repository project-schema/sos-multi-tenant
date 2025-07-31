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
				'flex items-center flex-row justify-between p-4 shadow-sm ' + className
			)}
		>
			<div className="flex-1 w-full">
				<CardHeader className="p-0">
					<CardTitle className="text-base font-medium text-gray-700 capitalize">
						{title}
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0 pt-2">
					<h2 className="text-2xl font-bold text-primary capitalize">
						{isLoading ? '...' : countTitle}
					</h2>
				</CardContent>
			</div>
			{Icon && (
				<div className={iconClassName || ''}>
					<Icon className="w-10 h-10" />
				</div>
			)}
		</Card>
	);
};
