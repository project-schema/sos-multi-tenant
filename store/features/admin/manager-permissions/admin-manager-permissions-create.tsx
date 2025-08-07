'use client';

import { DialogFooter } from '@/components/ui/dialog';
import { LoaderCircle } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { alertConfirm } from '@/lib';
import { toast } from 'sonner';
import { useAdminAllRoleQuery } from '../role-permission/role-permissions-api-slice';
import { useAdminManagerCreateMutation } from './admin-manager-permissions-api-slice';

// --- Zod Schema ---
const schema = z
	.object({
		name: z.string({ error: 'Name is required' }).min(1, 'Name is required'),
		email: z.string({ error: 'Email is required' }).email('Invalid email'),
		number: z
			.number({ error: 'Number is required' })
			.min(0, { message: 'Number must be at least 0' })
			.refine((val) => !isNaN(val), {
				message: 'Phone must be a number',
			}),
		password: z
			.string({ error: 'Password is required' })
			.min(8, 'Password must be at least 8 characters'),
		c_password: z
			.string({ error: 'Password is required' })
			.min(8, 'Password must be at least 8 characters'),

		role: z.string({ error: 'Role is required' }).min(1, 'Role is required'),
	})
	.refine((data) => data.password === data.c_password, {
		path: ['c_password'],
		message: 'Passwords do not match',
	});

type ZodType = z.infer<typeof schema>;

export function AdminManagerCreate() {
	const [store, { isLoading }] = useAdminManagerCreateMutation();
	const { data, isLoading: isLoadingRole } = useAdminAllRoleQuery(undefined);

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			email: '',
			number: 0,
			password: '',
			c_password: '',
			role: '',
		},
	});

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({
						...data,
					}).unwrap();
					if (response.success) {
						toast.success(response.message || 'Created successfully');
						form.reset();
					} else {
						const errorResponse = response as any;
						if (
							response.message === 'Validation errors' &&
							typeof errorResponse.data === 'object'
						) {
							Object.entries(errorResponse.data).forEach(([field, value]) => {
								form.setError(field as keyof ZodType, {
									type: 'server',
									message: (value as string[])[0],
								});
							});
						} else {
							toast.error(response.message || 'Something went wrong');
						}
					}
				} catch (error: any) {
					if (error?.status === 422 && typeof error.message === 'object') {
						Object.entries(error.message).forEach(([field, value]) => {
							form.setError(field as keyof ZodType, {
								type: 'server',
								message: (value as string[])[0],
							});
						});
					} else {
						toast.error('Something went wrong');
					}
				}
			},
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{/* Name */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Type name..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Email */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Type email..." type="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Number */}
				<FormField
					control={form.control}
					name="number"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<Input
									placeholder="Type phone number..."
									type="number"
									{...field}
									onChange={(e) => field.onChange(e.target.valueAsNumber || '')}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Role */}
				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Select Role</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue
											placeholder={isLoadingRole ? 'Loading...' : 'Select Role'}
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{data?.map((item) => (
										<SelectItem key={item.id} value={item.id?.toString()}>
											{item.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Password */}
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter password"
									type="password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Password */}
				<FormField
					control={form.control}
					name="c_password"
					render={({ field }) => (
						<FormItem>
							<FormLabel> Confirm Password</FormLabel>
							<FormControl>
								<Input
									placeholder="Confirm password"
									type="password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Creating...' : `Create Manager`}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
