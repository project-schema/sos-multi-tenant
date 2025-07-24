'use client';

import { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

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

export function UserHistory() {
	const [data, setData] = useState(initialData);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [roleFilter, setRoleFilter] = useState('all');
	const [departmentFilter, setDepartmentFilter] = useState('all');

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
					<CardTitle className="text-2xl font-bold">History</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					{/* Table */}
					<div className="border rounded-lg">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="bg-stone-100">SL. </TableHead>
									<TableHead className="bg-stone-100">Amount </TableHead>
									<TableHead className="bg-stone-100">
										Transition Type
									</TableHead>
									<TableHead className="bg-stone-100">Payment Method</TableHead>
									<TableHead className="bg-stone-100">Coupon </TableHead>
									<TableHead className="bg-stone-100">Transition ID </TableHead>
									<TableHead className="bg-stone-100">Balance </TableHead>
									<TableHead className="bg-stone-100">Statement</TableHead>
									<TableHead className="bg-stone-100">Date</TableHead>
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
