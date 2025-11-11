'use client';

import { DialogFooter } from '@/components/ui/dialog';
import { LoaderCircle } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
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
import { useTenantRegisterMutation } from '@/store/features/auth/auth-api-slice';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

// --- Zod Schema ---
export const schema = z
	.object({
		company_name: z.string().min(1, 'Company name is required'),
		domain: z.string().min(1, 'Domain is required'),
		email: z.email('Invalid email address'),
		owner_name: z.string().min(1, 'Owner name is required'),
		type: z.enum(['merchant', 'dropshipper']),
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

export const SwitchPage = () => {
	const router = useRouter();
	const [register, { isLoading }] = useTenantRegisterMutation();
	const searchParams = useSearchParams().get('from');
	const { data: session } = useSession();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			company_name: '',
			domain: '',
			email: '',
			owner_name: '',
			type: searchParams === 'vendor' ? 'merchant' : 'dropshipper',
			password: '',
			password_confirmation: '',
		},
	});

	useEffect(() => {
		if (searchParams) {
			form.setValue(
				'type',
				searchParams === 'vendor' ? 'merchant' : 'dropshipper'
			);
		}
	}, [searchParams]);

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await register({
						...data,
					}).unwrap();

					if (response.success) {
						toast.success(response.message || 'Tenant registered successfully');
						localStorage.setItem('tenant_data', JSON.stringify(data));

						const tenantSubdomain = response.data.domain;

						// Get current domain info
						const { protocol, host } = window.location;
						const currentDomain = host.replace(/^.*?\./, '');

						// Construct tenant URL based on current host
						const tenantURL = `${protocol}//${tenantSubdomain}.${currentDomain}`;

						// Redirect to tenant's subdomain
						window.location.href = tenantURL;
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
		<Card className="max-w-lg mx-auto">
			<CardHeader>
				<CardTitle>Switch User </CardTitle>
				<CardDescription>
					Switch user to Merchant or Dropshipper
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* Type */}
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>User Type</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="merchant">Merchant</SelectItem>
												<SelectItem value="dropshipper">Dropshipper</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Company Name */}
						<FormField
							control={form.control}
							name="company_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Company Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter company name..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Domain */}
						<FormField
							control={form.control}
							name="domain"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Domain</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter domain (e.g., mycompany)"
										/>
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

						{/* Owner Name */}
						<FormField
							control={form.control}
							name="owner_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Owner Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter owner name..." />
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
										<Input {...field} placeholder="Enter password..." />
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
			</CardContent>
		</Card>
	);
};
