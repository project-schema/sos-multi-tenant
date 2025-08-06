'use client';
import { Loader5, Loader8 } from '@/components/dashboard';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { ErrorAlert, tableSrCount } from '@/lib';
import { DynamicIcon } from '@/lib/icon/dynamic-icon';
import { useAdminViewMissionQuery } from './admin-mission.api.slice';
import { MissionDelete } from './admin-mission.delete';
import { MissionEdit } from './admin-mission.edit';

export function MissionTable() {
	const { data, isFetching, isLoading, isError } = useAdminViewMissionQuery({
		page: '',
	});

	if (isError) {
		return <ErrorAlert />;
	}

	if (isLoading) {
		return (
			<>
				<Loader5 />
				<Loader5 />
				<Loader5 />
				<Loader5 />
			</>
		);
	}
	return (
		<div>
			<>
				<div className="border rounded-lg relative">
					{isFetching && <Loader8 />}
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="bg-stone-100">#SL.</TableHead>
								<TableHead className="bg-stone-100">Icon </TableHead>
								<TableHead className="bg-stone-100">Title </TableHead>
								<TableHead className="bg-stone-100">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.data?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={4}
										className="text-center py-8 text-muted-foreground"
									>
										No Mission found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								data?.data?.map((item, i) => (
									<TableRow key={item.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(1, i)}
										</TableCell>

										<TableCell className="py-2">
											<DynamicIcon
												icon={item.icon_class}
												className="!w-8 !h-8"
											/>
										</TableCell>

										<TableCell className="py-2">{item.title}</TableCell>

										<TableCell className="py-2 space-x-2">
											<MissionEdit editData={item} />
											<MissionDelete data={item} />
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</>
		</div>
	);
}
