import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib';
import { Action, PermissionGroup } from './role-permission-type';

interface RoleCardProps {
	data: PermissionGroup;
	dispatch: React.Dispatch<Action>;
}

const RoleCard: React.FC<RoleCardProps> = ({ data, dispatch }) => {
	return (
		<Card className={cn('pt-0 gap-0')}>
			<CardHeader className="bg-teal-600 rounded-t-md text-white py-2 px-4 flex items-center">
				<Checkbox
					id={`parent-${data.id}`}
					checked={data.checked}
					onCheckedChange={(checked) =>
						dispatch({
							type: 'CHECKED_PARENT',
							payload: {
								parentId: data.id,
								value: Boolean(checked),
							},
						})
					}
					className="scale-125"
				/>
				<label
					htmlFor={`parent-${data.id}`}
					className="ml-3 text-lg font-medium cursor-pointer"
				>
					{data.title}
				</label>
			</CardHeader>

			<CardContent className="space-y-2 py-3 px-4">
				<ul className="space-y-1">
					{data.routes.map((route) => (
						<li key={route.id} className="flex items-center gap-3">
							<Checkbox
								id={`route-${route.id}`}
								checked={route.checked}
								onCheckedChange={(checked) =>
									dispatch({
										type: 'CHECKED',
										payload: {
											id: route.id,
											value: Boolean(checked),
										},
									})
								}
								className="scale-110"
							/>
							<label
								htmlFor={`route-${route.id}`}
								className="text-sm cursor-pointer"
							>
								{route.name}
							</label>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
};

export default RoleCard;
