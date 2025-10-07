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
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAdminLoginMutation } from './auth-api-slice';

// --- Zod Schema ---
export const schema = z.object({
	email: z.email('Invalid email address'),
	password: z.string().min(1, 'Password is required'),
});

export type ZodType = z.infer<typeof schema>;

export const AuthLogin = () => {
	const router = useRouter();
	// const [login, { isLoading }] = useAuthLoginMutation();
	const [login, { isLoading }] = useAdminLoginMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: ZodType) => {
		try {
			const response: any = await login({
				login: data.email,
				password: data.password,
			}).unwrap();

			if (response.status === 200) {
				// Sign in with NextAuth using the token
				const signInResult = await signIn('credentials', {
					token: JSON.stringify({
						user: {
							role: response.role,
							email: 'test@test.com',
							name: 'test',
							id: 1,
							tenant_type: 'admin',
							last_seen: new Date().toISOString(),
						},
						token: response.token,
						tenant_id: '1',
					}),
					redirect: false,
				});

				console.log(signInResult);
				if (signInResult?.ok) {
					toast.success('Login successful!');
				} else {
					toast.error('Authentication failed. Please try again.');
				}
			} else {
				toast.error('Failed to login');
			}
		} catch (err) {
			toast.error('Failed to login');
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Company Name */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Enter email..." />
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

				<DialogFooter>
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Logging in...' : 'Login'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
