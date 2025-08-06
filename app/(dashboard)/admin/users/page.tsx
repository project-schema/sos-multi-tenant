'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';

import { DbHeader, Loader2, Loader5, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
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
import {
	useAdminAllUserQuery,
	useAdminUserStatisticsQuery,
} from '@/store/features/admin/user/admin.user.api.slice';
import { statusType, userType } from '@/store/features/admin/user/type';
import {
	ArrowDown,
	ArrowUp,
	Ellipsis,
	ExternalLink,
	Filter,
	Plus,
	Search,
} from 'lucide-react';
import Link from 'next/link';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/user' },
	{ name: 'User', path: '/user/profile' },
	{ name: 'Users' },
];
// Sample data
const initialData = [
	{
		id: 1,
		name: 'John Doe',
		email: 'john@example.com',
		role: 'Admin',
		status: 'Active',
		department: 'Engineering',
		joinDate: '2023-01-15',
	},
	{
		id: 2,
		name: 'Jane Smith',
		email: 'jane@example.com',
		role: 'User',
		status: 'Active',
		department: 'Marketing',
		joinDate: '2023-02-20',
	},
	{
		id: 3,
		name: 'Mike Johnson',
		email: 'mike@example.com',
		role: 'Manager',
		status: 'Inactive',
		department: 'Sales',
		joinDate: '2023-03-10',
	},
	{
		id: 4,
		name: 'Sarah Wilson',
		email: 'sarah@example.com',
		role: 'User',
		status: 'Active',
		department: 'Engineering',
		joinDate: '2023-04-05',
	},
	{
		id: 5,
		name: 'Tom Brown',
		email: 'tom@example.com',
		role: 'Admin',
		status: 'Pending',
		department: 'HR',
		joinDate: '2023-05-12',
	},
];

export default function Page() {
	const [data, setData] = useState(initialData);
	const [toggleFilter, setToggleFilter] = useState(true);

	// Fetch statistics from the API
	const {
		data: statistics,
		isLoading: isStatisticsLoading,
		isError: isStatisticsError,
	} = useAdminUserStatisticsQuery(undefined);

	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState<statusType>('all');
	const [roleFilter, setRoleFilter] = useState<userType>('all');
	const [page, setPage] = useState(1);

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const {
		data: allUsers,
		isLoading: isAllUsersLoading,
		isError: isAllUsersError,
		isFetching,
	} = useAdminAllUserQuery({
		status: statusFilter,
		userType: roleFilter, // assuming userType maps to role
		page: page,
		search: debouncedSearchTerm,
	});

	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
		role: '',
		status: 'Active',
		department: '',
	});

	const handleCreateUser = () => {
		if (newUser.name && newUser.email && newUser.role && newUser.department) {
			const newId = Math.max(...data.map((item) => item.id)) + 1;
			const userToAdd = {
				...newUser,
				id: newId,
				joinDate: new Date().toISOString().split('T')[0],
			};
			setData([...data, userToAdd]);
			setNewUser({
				name: '',
				email: '',
				role: '',
				status: 'Active',
				department: '',
			});
			setIsCreateDialogOpen(false);
		}
	};

	useEffect(() => {
		setPage(1);
	}, [statusFilter, roleFilter, debouncedSearchTerm]);

	const TableContent = () => (
		<>
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
		</>
	);

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="db-container space-y-6">
				<Card className="gap-0">
					<CardHeader className="pb-3 flex items-center justify-between">
						<CardTitle className="text-2xl font-bold">
							User Management
						</CardTitle>
						<Button
							className="ml-auto"
							variant="secondary"
							size="icon"
							onClick={() => setToggleFilter((e) => !e)}
						>
							{toggleFilter ? (
								<ArrowUp className="h-4 w-4" />
							) : (
								<ArrowDown className="h-4 w-4" />
							)}
						</Button>
					</CardHeader>
					{isStatisticsLoading ? (
						<div className="px-6 mb-6">
							<Loader2 />
						</div>
					) : (
						toggleFilter && (
							<div className="grid grid-cols-6 gap-4 pb-4 ml-6">
								<Card className="p-4">
									<CardHeader className="pl-0">
										<CardDescription>All Members</CardDescription>
										<CardTitle className="text-2xl font-semibold">
											{statistics?.message?.totalmember || '00'}
										</CardTitle>
									</CardHeader>
								</Card>
								<Card className="p-4">
									<CardHeader className="pl-0">
										<CardDescription>All Users</CardDescription>
										<CardTitle className="text-2xl font-semibold">
											{statistics?.message?.totaluser || '00'}
										</CardTitle>
									</CardHeader>
								</Card>
								<Card className="p-4">
									<CardHeader className="pl-0">
										<CardDescription>All Merchant</CardDescription>
										<CardTitle className="text-2xl font-semibold">
											{statistics?.message?.totalvendor || '00'}
										</CardTitle>
									</CardHeader>
								</Card>
								<Card className="p-4">
									<CardHeader className="pl-0">
										<CardDescription>All Drop Shipper</CardDescription>
										<CardTitle className="text-2xl font-semibold">
											{statistics?.message?.totalaffiliate || '00'}
										</CardTitle>
									</CardHeader>
								</Card>
							</div>
						)
					)}
					<CardContent className="space-y-4">
						{/* Search and Filters */}

						{/* Table */}
						{isAllUsersLoading ? (
							<>
								<Loader5 />
								<Loader5 />
								<Loader5 />
							</>
						) : (
							<>
								{toggleFilter && (
									<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
										<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
											{/* Search */}
											<div className="relative w-full sm:w-80">
												<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
												<Input
													placeholder="Search.."
													value={searchTerm}
													onChange={(e) => setSearchTerm(e.target.value)}
													className="pl-10"
												/>
											</div>

											{/* Filters */}
											<div className="flex gap-2 items-center">
												<Filter className="h-4 w-4 text-muted-foreground" />
												{/* Status Filter */}
												<Select
													value={statusFilter}
													onValueChange={setStatusFilter as any}
												>
													<SelectTrigger className="w-32">
														<SelectValue placeholder="Status" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="all">All Status</SelectItem>
														<SelectItem value="active">Active</SelectItem>
														<SelectItem value="pending">Pending</SelectItem>
													</SelectContent>
												</Select>

												{/* Role (userType) Filter */}
												<Select
													value={roleFilter}
													onValueChange={setRoleFilter as any}
												>
													<SelectTrigger className="w-36">
														<SelectValue placeholder="User Type" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="all">All</SelectItem>
														<SelectItem value="user">User</SelectItem>
														<SelectItem value="vendor">Merchant</SelectItem>
														<SelectItem value="affiliate">
															Drop Shipper
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>

										{/* Create Button */}
										<Dialog
											open={isCreateDialogOpen}
											onOpenChange={setIsCreateDialogOpen}
										>
											<DialogTrigger asChild>
												<Button>
													<Plus className="h-4 w-4 mr-2" />
													Create User
												</Button>
											</DialogTrigger>
											<DialogContent className="sm:max-w-[425px]">
												<DialogHeader>
													<DialogTitle>Create New User</DialogTitle>
													<DialogDescription>
														Add a new user to the system. Fill in all required
														fields.
													</DialogDescription>
												</DialogHeader>
												<div className="grid gap-4 py-4">
													<div className="grid grid-cols-4 items-center gap-4">
														<Label htmlFor="name" className="text-right">
															Name
														</Label>
														<Input
															id="name"
															value={newUser.name}
															onChange={(e) =>
																setNewUser({ ...newUser, name: e.target.value })
															}
															className="col-span-3"
														/>
													</div>
													<div className="grid grid-cols-4 items-center gap-4">
														<Label htmlFor="email" className="text-right">
															Email
														</Label>
														<Input
															id="email"
															type="email"
															value={newUser.email}
															onChange={(e) =>
																setNewUser({
																	...newUser,
																	email: e.target.value,
																})
															}
															className="col-span-3"
														/>
													</div>
													<div className="grid grid-cols-4 items-center gap-4">
														<Label htmlFor="role" className="text-right">
															Role
														</Label>
														<Select
															value={newUser.role}
															onValueChange={(value) =>
																setNewUser({ ...newUser, role: value })
															}
														>
															<SelectTrigger className="col-span-3">
																<SelectValue placeholder="Select role" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="Admin">Admin</SelectItem>
																<SelectItem value="Manager">Manager</SelectItem>
																<SelectItem value="User">User</SelectItem>
															</SelectContent>
														</Select>
													</div>
													<div className="grid grid-cols-4 items-center gap-4">
														<Label htmlFor="department" className="text-right">
															Department
														</Label>
														<Select
															value={newUser.department}
															onValueChange={(value) =>
																setNewUser({ ...newUser, department: value })
															}
														>
															<SelectTrigger className="col-span-3">
																<SelectValue placeholder="Select department" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="Engineering">
																	Engineering
																</SelectItem>
																<SelectItem value="Marketing">
																	Marketing
																</SelectItem>
																<SelectItem value="Sales">Sales</SelectItem>
																<SelectItem value="HR">HR</SelectItem>
															</SelectContent>
														</Select>
													</div>
												</div>
												<DialogFooter>
													<Button type="submit" onClick={handleCreateUser}>
														Create User
													</Button>
												</DialogFooter>
											</DialogContent>
										</Dialog>
									</div>
								)}
								<TableContent />
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</>
	);
}
