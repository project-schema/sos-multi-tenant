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
import { LoaderCircle, Pen } from 'lucide-react';

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
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useVendorEmployeeAllRoleQuery } from './role-permission/role-permissions-api-slice';
import { useVendorEmployeeUpdateMutation } from './vendor-employee-api-slice';
import type { iVendorEmployee } from './vendor-employee-type';

const schema = z.object({
	name: z.string().trim().min(1, 'Name is required'),
	email: z.string().email('Invalid email address').trim(),
	number: z.string().optional(),
	password: z.string().optional(),
	vendor_role_id: z.string().min(1, 'Role is required'),
	status: z.enum(['active', 'pending', 'blocked']),
});

type ZodType = z.infer<typeof schema>;

export function VendorEmployeeEdit({
	editData,
}: {
	editData: iVendorEmployee;
}) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<Pen className="h-4 w-4" />
					<span className="sr-only">Edit</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Update Employee</DialogTitle>
					<DialogDescription>Update employee information.</DialogDescription>
				</DialogHeader>
				<FORM editData={editData} setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
}

function FORM({
	editData,
	setOpen,
}: {
	editData: iVendorEmployee;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const [update, { isLoading }] = useVendorEmployeeUpdateMutation();
	const { data: roles, isLoading: rolesLoading } =
		useVendorEmployeeAllRoleQuery(undefined);
	const roleOptions = useMemo(() => roles?.roles ?? [], [roles?.roles]);

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: editData.name || '',
			email: editData.email || '',
			number: editData.number || '',
			password: '',
			vendor_role_id: editData.vendor_role_id
				? String(editData.vendor_role_id)
				: '',
			status: editData.status || 'active',
		},
	});

	useEffect(() => {
		form.reset({
			name: editData.name || '',
			email: editData.email || '',
			number: editData.number || '',
			password: '',
			vendor_role_id: editData.vendor_role_id
				? String(editData.vendor_role_id)
				: '',
			status: editData.status || 'active',
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editData]);

	const onSubmit = (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const res = await update({ ...data, id: editData.id }).unwrap();
					if (res.status === 200) {
						toast.success(res.message || 'Employee updated');
						setOpen(false);
					}
				} catch (err: any) {
					handleValidationError(err as any, form.setError);
					toast.error('Failed to update employee');
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
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password (optional)</FormLabel>
								<FormControl>
									<Input type="password" placeholder="******" {...field} />
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
						Update
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
