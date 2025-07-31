import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib';

interface Card1Props {
	title: string | number;
	count: string | number;
	className?: string;
}

export const Card2 = ({ ...props }: Card1Props) => {
	return (
		<Card className={cn(`p-4 ${props.className || ''}`)}>
			<CardHeader className="pl-0">
				<CardDescription>{props.title}</CardDescription>
				<CardTitle className="text-2xl font-semibold">
					{props.count || '00'}
				</CardTitle>
			</CardHeader>
		</Card>
	);
};
