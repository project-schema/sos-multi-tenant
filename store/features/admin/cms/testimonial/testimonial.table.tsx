'use client';
import { Loader5, Loader8 } from '@/components/dashboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn, env, ErrorAlert, tableSrCount } from '@/lib';
import { useAdminViewTestimonialQuery } from './testimonial.api.slice';
import { TestimonialDelete } from './testimonial.delete';
import { TestimonialEdit } from './testimonial.edit';

export function TestimonialTable() {
	const { data, isFetching, isLoading, isError } = useAdminViewTestimonialQuery(
		{
			page: '',
		}
	);

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
								<TableHead className="bg-stone-100">Profile </TableHead>
								<TableHead className="bg-stone-100">Name </TableHead>
								<TableHead className="bg-stone-100">Rating </TableHead>
								<TableHead className="bg-stone-100">Designation </TableHead>
								<TableHead className="bg-stone-100">Description </TableHead>
								<TableHead className="bg-stone-100">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.data?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={3}
										className="text-center py-8 text-muted-foreground"
									>
										No Testimonial found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								data?.data?.map((item, i) => (
									<TableRow key={item.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(1, i)}
										</TableCell>
										<TableCell className="py-2">
											<Avatar className="h-12 w-12 rounded-xl">
												<AvatarImage
													src={env.baseAPI + '/' + item.image}
													alt={'Image'}
												/>
												<AvatarFallback className="rounded-xl bg-sky-100">
													{'I'}
												</AvatarFallback>
											</Avatar>
										</TableCell>

										<TableCell className={cn('py-2 whitespace-pre-wrap')}>
											{item.name}
										</TableCell>

										<TableCell className={cn('py-2 whitespace-pre-wrap')}>
											{item.rating} Star
										</TableCell>

										<TableCell className={cn('py-2 whitespace-pre-wrap ')}>
											{item.designation}
										</TableCell>

										<TableCell
											className={cn('py-2 whitespace-pre-wrap min-w-xs')}
										>
											{item.description}
										</TableCell>

										<TableCell className="py-2 space-x-2">
											<TestimonialEdit editData={item} />
											<TestimonialDelete data={item} />
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
