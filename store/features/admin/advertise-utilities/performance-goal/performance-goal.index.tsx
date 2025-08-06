import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib';
import { PerformanceGoalCreate } from './performance-goal.create';
import { PerformanceGoalTable } from './performance-goal.table';

export function PerformanceGoalIndex() {
	return (
		<>
			<Card className="lg:col-span-1">
				<CardHeader>
					<CardTitle className={cn('text-lg xl:text-xl')}>
						Performance Goal
					</CardTitle>
				</CardHeader>
				<CardContent>
					<PerformanceGoalCreate />
				</CardContent>
			</Card>
			<Card className="lg:col-span-2">
				<CardContent>
					<PerformanceGoalTable />
				</CardContent>
			</Card>
		</>
	);
}
