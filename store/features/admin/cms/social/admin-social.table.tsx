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
import { cn, ErrorAlert, tableSrCount } from '@/lib';
import { DynamicIcon } from '@/lib/icon/dynamic-icon';
import { useAdminViewSocialQuery } from './admin-social.api.slice';
import { SocialDelete } from './admin-social.delete';
import { SocialEdit } from './admin-social.edit';

export function SocialTable() {
	const { data, isFetching, isLoading, isError } = useAdminViewSocialQuery({
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
								<TableHead className="bg-stone-100">Link </TableHead>
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
										No Social found matching your criteria
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

										<TableCell className={cn('py-2 whitespace-pre-wrap')}>
											{item.media_link}
										</TableCell>

										<TableCell className="py-2 space-x-2">
											<SocialEdit editData={item} />
											<SocialDelete data={item} />
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
