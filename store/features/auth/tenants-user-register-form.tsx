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
import { alertConfirm } from '@/lib';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAuthRegisterMutation } from './auth-api-slice';

// --- Zod Schema ---
export const schema = z
	.object({
		name: z.string().min(1, 'Name is required'),
		email: z.email('Invalid email address'),
		password: z.string().min(1, 'Password is required'),
		password_confirmation: z
			.string()
			.min(1, 'Password confirmation is required'),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: 'Passwords do not match',
		path: ['password_confirmation'],
	});

export type ZodType = z.infer<typeof schema>;

export const TenantsUserRegisterForm = () => {
	const router = useRouter();
	const [register, { isLoading }] = useAuthRegisterMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
		},
	});

	useEffect(() => {
		const tenantData = localStorage.getItem('tenant_data');

		if (tenantData) {
			const tenantDataParsed = JSON.parse(tenantData);
			form.setValue('email', tenantDataParsed?.email || '');
		}
	}, []);

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await register({
						...data,
					}).unwrap();

					if (response.success) {
						toast.success(response.message || 'Tenant registered successfully');

						console.log(response);
					} else {
						toast.error(response.message || 'Failed to create tenant');
					}
				} catch (err) {
					toast.error('Failed to create tenant');
				}
			},
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Company Name */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Enter name..." />
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
								<Input
									{...field}
									type="email"
									placeholder="Enter email address..."
								/>
							</FormControl>
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
									{...field}
									type="password"
									placeholder="Enter password..."
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Password Confirmation */}
				<FormField
					control={form.control}
					name="password_confirmation"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password Confirmation</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Enter password confirmation..."
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
						{isLoading ? 'Registering...' : 'Register Tenant'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
