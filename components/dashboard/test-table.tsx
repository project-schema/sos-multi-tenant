'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Plus, Search, Filter } from 'lucide-react';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
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

export default function DbTable() {
	const [data, setData] = useState(initialData);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [roleFilter, setRoleFilter] = useState('all');
	const [departmentFilter, setDepartmentFilter] = useState('all');
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
		role: '',
		status: 'Active',
		department: '',
	});

	// Filter data based on search and filters
	const filteredData = data.filter((item) => {
		const matchesSearch =
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.email.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesStatus =
			statusFilter === 'all' || item.status === statusFilter;
		const matchesRole = roleFilter === 'all' || item.role === roleFilter;
		const matchesDepartment =
			departmentFilter === 'all' || item.department === departmentFilter;

		return matchesSearch && matchesStatus && matchesRole && matchesDepartment;
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

	const getStatusBadgeVariant = (status: string) => {
		switch (status) {
			case 'Active':
				return 'default';
			case 'Inactive':
				return 'secondary';
			case 'Pending':
				return 'outline';
			default:
				return 'default';
		}
	};

	return (
		<div className="w-full  p-6 space-y-6">
			<Card className="gap-0">
				<CardHeader className="pb-3">
					<CardTitle className="text-2xl font-bold">User Management</CardTitle>
				</CardHeader>
				<div className="grid grid-cols-6 gap-4 pb-4 ml-6">
					<Card className="p-4">
						<CardHeader className="pl-0">
							<CardDescription>All</CardDescription>
							<CardTitle className="text-2xl font-semibold">00</CardTitle>
						</CardHeader>
					</Card>
					<Card className="p-4">
						<CardHeader className="pl-0">
							<CardDescription>All</CardDescription>
							<CardTitle className="text-2xl font-semibold">00</CardTitle>
						</CardHeader>
					</Card>
					<Card className="p-4">
						<CardHeader className="pl-0">
							<CardDescription>All</CardDescription>
							<CardTitle className="text-2xl font-semibold">00</CardTitle>
						</CardHeader>
					</Card>
					<Card className="p-4">
						<CardHeader className="pl-0">
							<CardDescription>All</CardDescription>
							<CardTitle className="text-2xl font-semibold">00</CardTitle>
						</CardHeader>
					</Card>
					<Card className="p-4">
						<CardHeader className="pl-0">
							<CardDescription>All</CardDescription>
							<CardTitle className="text-2xl font-semibold">00</CardTitle>
						</CardHeader>
					</Card>
				</div>
				<CardContent className="space-y-4">
					{/* Search and Filters */}
					<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
						<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
							{/* Search */}
							<div className="relative w-full sm:w-80">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
								<Input
									placeholder="Search users..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10"
								/>
							</div>

							{/* Filters */}
							<div className="flex gap-2 items-center">
								<Filter className="h-4 w-4 text-muted-foreground" />
								<Select value={statusFilter} onValueChange={setStatusFilter}>
									<SelectTrigger className="w-32">
										<SelectValue placeholder="Status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Status</SelectItem>
										<SelectItem value="Active">Active</SelectItem>
										<SelectItem value="Inactive">Inactive</SelectItem>
										<SelectItem value="Pending">Pending</SelectItem>
									</SelectContent>
								</Select>

								<Select value={roleFilter} onValueChange={setRoleFilter}>
									<SelectTrigger className="w-32">
										<SelectValue placeholder="Role" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Roles</SelectItem>
										<SelectItem value="Admin">Admin</SelectItem>
										<SelectItem value="Manager">Manager</SelectItem>
										<SelectItem value="User">User</SelectItem>
									</SelectContent>
								</Select>

								<Select
									value={departmentFilter}
									onValueChange={setDepartmentFilter}
								>
									<SelectTrigger className="w-36">
										<SelectValue placeholder="Department" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Departments</SelectItem>
										<SelectItem value="Engineering">Engineering</SelectItem>
										<SelectItem value="Marketing">Marketing</SelectItem>
										<SelectItem value="Sales">Sales</SelectItem>
										<SelectItem value="HR">HR</SelectItem>
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
										Add a new user to the system. Fill in all required fields.
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
												setNewUser({ ...newUser, email: e.target.value })
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
												<SelectItem value="Engineering">Engineering</SelectItem>
												<SelectItem value="Marketing">Marketing</SelectItem>
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

					{/* Table */}
					<div className="border rounded-lg">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="bg-stone-100">Name</TableHead>
									<TableHead className="bg-stone-100">Email</TableHead>
									<TableHead className="bg-stone-100">Role</TableHead>
									<TableHead className="bg-stone-100">Status</TableHead>
									<TableHead className="bg-stone-100">Department</TableHead>
									<TableHead className="bg-stone-100">Join Date</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredData.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={6}
											className="text-center py-8 text-muted-foreground"
										>
											No users found matching your criteria
										</TableCell>
									</TableRow>
								) : (
									filteredData.map((user) => (
										<TableRow key={user.id}>
											<TableCell className="font-medium py-4">
												{user.name}
											</TableCell>
											<TableCell className="py-4">{user.email}</TableCell>
											<TableCell className="py-4">{user.role}</TableCell>
											<TableCell className="py-4">
												<Badge variant={getStatusBadgeVariant(user.status)}>
													{user.status}
												</Badge>
											</TableCell>
											<TableCell className="py-4">{user.department}</TableCell>
											<TableCell className="py-4">{user.joinDate}</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>

					{/* Results count */}
					<div className="flex items-center justify-between mt-4">
						<p className="text-sm text-muted-foreground">
							Showing {filteredData.length} of {data.length} users
						</p>
						<Pagination className="justify-end w-auto ml-auto mx-0">
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious href="#" />
								</PaginationItem>
								<PaginationItem>
									<PaginationLink href="#">1</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
								<PaginationItem>
									<PaginationNext href="#" />
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
