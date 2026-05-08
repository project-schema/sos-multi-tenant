import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { dateFormat, timeFormat } from '@/lib';
import { Star } from 'lucide-react';
import { iAdminServiceOrder } from '../../admin/service';

export function ServiceRatingCard({ data }: { data: iAdminServiceOrder }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
					Rating & Review
				</CardTitle>
				<CardDescription>
					Rated on {dateFormat(data.servicerating.created_at)} at{' '}
					{timeFormat(data.servicerating.created_at)}
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Star Rating Display */}
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-1">
						{[1, 2, 3, 4, 5].map((starValue) => (
							<Star
								key={starValue}
								className={`h-5 w-5 ${
									starValue <= data.servicerating.rating
										? 'text-yellow-500 fill-yellow-500'
										: 'text-gray-300'
								}`}
							/>
						))}
					</div>
					<span className="text-sm font-medium text-muted-foreground ml-2">
						{data.servicerating.rating} / 5
					</span>
				</div>

				{/* Comment Display */}
				{data.servicerating.comment && (
					<div className="space-y-2">
						<p className="text-sm font-medium text-muted-foreground">
							Comment:
						</p>
						<div className="rounded-lg border bg-muted/40 p-4">
							<p className="text-sm whitespace-pre-wrap">
								{data.servicerating.comment}
							</p>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
