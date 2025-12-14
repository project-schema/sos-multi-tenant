'use client';

import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	badgeFormat,
	dateFormat,
	env,
	sign,
	tableSrCount,
	textCount,
	timeFormat,
} from '@/lib';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Ellipsis, ExternalLink, Pencil } from 'lucide-react';
import Link from 'next/link';
// import { VendorServicesDelete } from './vendor-services-delete';
// import { iVendorServices } from './vendor-services-type';
export function UserServiceTable({ data }: { data: any }) {
	const services = data.data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100 w-10">Service</TableHead>
					<TableHead className="bg-stone-100"> Seller Name </TableHead>
					<TableHead className="bg-stone-100">Amount </TableHead>
					<TableHead className="bg-stone-100">Details Date </TableHead>
					<TableHead className="bg-stone-100">Status </TableHead>
					<TableHead className="bg-stone-100">Action </TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{services.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={9}
							className="text-center py-8 text-muted-foreground"
						>
							No items found matching your criteria
						</TableCell>
					</TableRow>
				) : (
					services?.map((item: any, i: number) => (
						<TableRow key={item.id}>
							<TableCell className="py-2 pl-4">
								{tableSrCount(data.current_page, i)}
							</TableCell>
							<TableCell className="font-medium py-4">
								#{item.uniqueid}
							</TableCell>
							<TableCell className="py-2">
								<Link
									className="hover:underline hover:text-blue-500 transition"
									href={`/services/${item.id}`}
								>
									{textCount(item.title, 40)}
								</Link>
							</TableCell>
							<TableCell className="py-2">
								<Badge className="capitalize" variant="default">
									{sign.dollar}
									{item.commission}
								</Badge>
							</TableCell>
							<TableCell className="py-2">
								<Link href={`/services/${item.id}`}>
									<Avatar className="h-12 w-12 rounded-xl">
										<AvatarImage
											src={env.baseAPI + '/' + item.image}
											alt={item.title}
											className="object-cover"
										/>
										<AvatarFallback className="rounded-xl bg-sky-100">
											{item.title.charAt(0).toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</Link>
							</TableCell>
							<TableCell className="py-2">
								<Badge
									className="capitalize"
									variant={badgeFormat(item.status)}
								>
									{item.status}
								</Badge>
							</TableCell>
							<TableCell className="py-2">
								{dateFormat(item.created_at)}
								<br />
								{timeFormat(item.created_at)}
							</TableCell>
							<TableCell className="py-2">
								<DropdownAction item={item} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}

const DropdownAction = ({ item }: { item: any }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
					size="icon"
				>
					<Ellipsis />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuItem>
					<Link
						className="flex items-center gap-2 w-full"
						href={`/services/${item.id}`}
					>
						<ExternalLink className="size-4" />
						<span>View Service</span>
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem>
					<Link
						className="flex items-center gap-2 w-full"
						href={`/services/${item.id}/edit`}
					>
						<Pencil className="size-4" />
						<span>Edit Service</span>
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />
				{/* Delete Service  */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
