'use client';

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
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { Filter } from 'lucide-react';
import {
	useAllBanksQuery,
	useAllWithdrawHistoryQuery,
} from './user-profile-api-slice';
import { UserWithdrawModal } from './user-withdraw-modal';
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
];

export function UserWithdraw() {
	const { data: allBanks, isLoading } = useAllBanksQuery(undefined);
	const { data: withdrawHistory, isLoading: isLoadingWithdrawHistory } =
		useAllWithdrawHistoryQuery({ status: '', page: 1 });
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
		<div className="w-full  px-6 py-2.5 space-y-6">
			<Card className="gap-0">
				<CardHeader className="pb-3">
					<CardTitle className="text-2xl font-bold">Withdraw Balance</CardTitle>
					<p className="text-sm text-yellow-800">
						Minimum Withdraw Amount: {allBanks?.settings?.minimum_withdraw} Tk
					</p>
					{allBanks?.settings?.withdraw_charge_status === 'on' && (
						<p className="text-sm text-yellow-800">
							Withdraw Charge : {allBanks?.settings?.withdraw_charge}%
						</p>
					)}
				</CardHeader>

				<CardContent className="space-y-4">
					{/* Search and Filters */}
					<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
						<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
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
							</div>
						</div>

						{/* Create Button */}
						<UserWithdrawModal />
					</div>

					{/* Table */}
					<div className="border rounded-lg">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="bg-stone-100">Sr.</TableHead>
									<TableHead className="bg-stone-100">ID </TableHead>
									<TableHead className="bg-stone-100">Your Bank Nu. </TableHead>
									<TableHead className="bg-stone-100">Amount </TableHead>
									<TableHead className="bg-stone-100">
										Withdraw Charge
									</TableHead>
									<TableHead className="bg-stone-100">Bank Name </TableHead>
									<TableHead className="bg-stone-100">Branch Name </TableHead>
									<TableHead className="bg-stone-100">AC Holder Name</TableHead>
									<TableHead className="bg-stone-100"> Screenshot </TableHead>
									<TableHead className="bg-stone-100">Date </TableHead>
									<TableHead className="bg-stone-100">Admin T.ID </TableHead>
									<TableHead className="bg-stone-100">Status </TableHead>
									<TableHead className="bg-stone-100">Action </TableHead>
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
