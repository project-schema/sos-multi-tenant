import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PerformanceGoalCreate } from './performance-goal.create';
import { PerformanceGoalTable } from './performance-goal.table';

export function PerformanceGoalIndex() {
	return (
		<>
			<Card className="col-span-1">
				<CardHeader>
					<CardTitle className="text-lg font-bold">Performance Goal</CardTitle>
				</CardHeader>
				<CardContent>
					<PerformanceGoalCreate />
				</CardContent>
			</Card>
			<Card className="col-span-2">
				<CardContent>
					<PerformanceGoalTable />
				</CardContent>
			</Card>
		</>
	);
}
