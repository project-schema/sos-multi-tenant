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
import { useEffect, useState } from 'react';

import { Container1, DbHeader, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CardTitle } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDebounce } from '@/hooks/use-debounce';
import {
	badgeFormat,
	dateFormat,
	env,
	roleFormat,
	tableSrCount,
	textCount,
} from '@/lib';
import {
	AdminUserFilter,
	UserAddBalance,
	UserAddNote,
	UserDelete,
	UserEditBalance,
	UserEditProfile,
	UserRemoveBalance,
	UserStatusActive,
	UserStatusBlocked,
	UserStatusPending,
} from '@/store/features/admin/user';
import { useAdminAllUserQuery } from '@/store/features/admin/user/admin.user.api.slice';
import { AdminUserStatistics } from '@/store/features/admin/user/admin.user.statistics';
import { statusType, userType } from '@/store/features/admin/user/type';
import { Ellipsis, ExternalLink, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/user' },
	{ name: 'User', path: '/user/profile' },
	{ name: 'Users' },
];

export default function Page() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState<statusType>('all');
	const [roleFilter, setRoleFilter] = useState<userType>('all');
	const [page, setPage] = useState(1);

	// Debounced
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const {
		data: allUsers,
		isLoading,
		isError,
		isFetching,
	} = useAdminAllUserQuery({
		status: statusFilter,
		userType: roleFilter, // assuming userType maps to role
		page: page,
		search: debouncedSearchTerm,
	});

	useEffect(() => {
		setPage(1);
	}, [statusFilter, roleFilter, debouncedSearchTerm]);

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={
					<>
						<div className="pb-2 lg:pb-3 flex items-center justify-between">
							<CardTitle>User Management</CardTitle>
							<Button
								className="ml-auto"
								variant="outline"
								size="icon"
								onClick={() => setToggleFilter((e) => !e)}
							>
								<SlidersHorizontal className="h-4 w-4" />
							</Button>
						</div>
						{toggleFilter && <AdminUserStatistics />}
					</>
				}
			>
				{toggleFilter && (
					<AdminUserFilter
						roleFilter={roleFilter}
						setRoleFilter={setRoleFilter}
						setSearchTerm={setSearchTerm}
						setStatusFilter={setStatusFilter}
						statusFilter={statusFilter}
						searchTerm={searchTerm}
					/>
				)}
				<div className="border rounded-lg relative">
					{isFetching && <Loader8 />}
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="bg-stone-100">SL. </TableHead>
								<TableHead className="bg-stone-100">ID </TableHead>
								<TableHead className="bg-stone-100">Profile </TableHead>
								<TableHead className="bg-stone-100">Name </TableHead>
								<TableHead className="bg-stone-100">Email </TableHead>
								<TableHead className="bg-stone-100">Role </TableHead>
								<TableHead className="bg-stone-100">Balance </TableHead>
								<TableHead className="bg-stone-100">Number </TableHead>
								<TableHead className="bg-stone-100">Date </TableHead>
								<TableHead className="bg-stone-100">Status </TableHead>
								<TableHead className="bg-stone-100">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{allUsers?.all.data.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={11}
										className="text-center py-8 text-muted-foreground"
									>
										No users found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								allUsers?.all.data?.map((user, i) => (
									<TableRow key={user.id}>
										<TableCell className="font-medium py-4">
											{tableSrCount(allUsers?.all?.current_page, i)}
										</TableCell>
										<TableCell className="font-medium py-4">
											#{user.uniqid}
										</TableCell>
										<TableCell className="py-2">
											<Link href={`/admin/users/${user.id}`}>
												<Avatar className="h-12 w-12 rounded-xl">
													<AvatarImage
														src={env.baseAPI + '/' + user.image}
														alt={user.name}
													/>
													<AvatarFallback className="rounded-xl bg-sky-100">
														{user.name.charAt(0).toUpperCase()}
													</AvatarFallback>
												</Avatar>
											</Link>
										</TableCell>
										<TableCell className="py-2">
											<Link
												className="hover:underline hover:text-blue-500 transition"
												href={`/admin/users/${user.id}`}
											>
												{textCount(user.name, 15)}
											</Link>
										</TableCell>
										<TableCell className="py-2">
											{textCount(user.email, 15)}
										</TableCell>
										<TableCell className="py-2">
											<Badge variant={badgeFormat(roleFormat(user.role_as))}>
												{roleFormat(user.role_as)}
											</Badge>
										</TableCell>
										<TableCell className="py-2">{user.balance}</TableCell>
										<TableCell className="py-2">
											{textCount(user.number, 15)}
										</TableCell>
										<TableCell className="py-2">
											{dateFormat(user.created_at)}
										</TableCell>
										<TableCell className="py-2">
											<Badge
												className="capitalize"
												variant={badgeFormat(user.status)}
											>
												{user.status}
											</Badge>
										</TableCell>
										<TableCell className="py-2">
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
															href={`/admin/users/${user.id}`}
														>
															<ExternalLink className="size-4" />
															<span>View Profile</span>
														</Link>
													</DropdownMenuItem>

													{/* Edit Profile  */}
													<UserEditProfile user={user} />

													{/* Add Balance  */}
													<UserAddBalance user={user} />

													{/* Edit Balance  */}
													<UserEditBalance user={user} />

													{/* Remove Balance  */}
													<UserRemoveBalance user={user} />

													{/* Status Active  */}
													{user.status !== 'active' && (
														<UserStatusActive user={user} />
													)}

													{/* Status Pending  */}
													{user.status !== 'pending' && (
														<UserStatusPending user={user} />
													)}

													{/* Status Blocked  */}
													{user.status !== 'blocked' && (
														<UserStatusBlocked user={user} />
													)}

													{/* Add Note  */}
													<UserAddNote user={user} />

													<DropdownMenuSeparator />

													{/* Delete User  */}
													<UserDelete user={user} />
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
				{allUsers?.all && (
					<Pagination1 pagination={allUsers?.all} setPage={setPage} />
				)}
			</Container1>
		</>
	);
}
