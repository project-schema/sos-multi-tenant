'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { LoaderCircle, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { alertConfirm, handleValidationError } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useVendorEmployeeAllRoleQuery } from './role-permission/role-permissions-api-slice';
import { useVendorEmployeeCreateMutation } from './vendor-employee-api-slice';

const schema = z
	.object({
		name: z.string().trim().min(1, 'Name is required'),
		email: z.string().email('Invalid email address').trim(),
		number: z.string().optional(),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		password_confirmation: z
			.string()
			.min(6, 'Password must be at least 6 characters'),
		vendor_role_id: z.string().min(1, 'Role is required'),
		status: z.enum(['active', 'pending', 'blocked']),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: 'Passwords do not match',
		path: ['password_confirmation'],
	});

type ZodType = z.infer<typeof schema>;

export function VendorEmployeeCreateModal() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<Plus className="h-4 w-4" />
					<span>Employee</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[700px]">
				<DialogHeader>
					<DialogTitle>Create Employee</DialogTitle>
					<DialogDescription>Create a new employee user.</DialogDescription>
				</DialogHeader>

				<FORM setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
}

function FORM({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
	const [create, { isLoading }] = useVendorEmployeeCreateMutation();
	const { data: roles, isLoading: rolesLoading } =
		useVendorEmployeeAllRoleQuery(undefined);

	const roleOptions = useMemo(() => roles?.roles ?? [], [roles?.roles]);

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			email: '',
			number: '',
			password: '',
			vendor_role_id: '',
			status: 'active',
			password_confirmation: '',
		},
	});

	const onSubmit = (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const res: any = await create(data).unwrap();
					if (res.status === 200) {
						toast.success(res.message || 'Employee created');
						form.reset();
						setOpen(false);
					}
					if (res?.status === 400) {
						let errorResponse: any = {};
						errorResponse.errors = res.validation_errors;

						handleValidationError(errorResponse as any, form.setError);

						toast.error(res.message || 'Failed to create employee');
					}
				} catch (err: any) {
					handleValidationError(err as any, form.setError);
					toast.error('Failed to create employee');
				}
			},
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Employee name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="employee@mail.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="number"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone</FormLabel>
								<FormControl>
									<Input placeholder="Phone number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="vendor_role_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Role</FormLabel>
								<Select
									disabled={rolesLoading}
									onValueChange={field.onChange}
									value={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select role" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{roleOptions?.map((r) => (
											<SelectItem key={r.id} value={String(r.id)}>
												{r.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="******" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password_confirmation"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="******" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="active">Active</SelectItem>
										<SelectItem value="pending">Pending</SelectItem>
										<SelectItem value="blocked">Blocked</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<DialogFooter>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? (
							<LoaderCircle className="size-4 animate-spin" />
						) : null}
						Create
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
