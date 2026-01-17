'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { iSettingsType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAuthLoginMutation } from './auth-api-slice';

// Zod validation schema for login
const loginSchema = z.object({
	email: z
		.string()
		.min(1, 'Email or phone number is required')
		.email('Please enter a valid email address'),
	password: z.string().min(1, 'Password is required'),
	rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function TenantAndUserLogin({ settings }: { settings?: iSettingsType }) {
	const [login, { isLoading }] = useAuthLoginMutation();
	const router = useRouter();

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			const result = await login({ ...data, login: data.email }).unwrap();

			if (result.success) {
				// Sign in with NextAuth using the token
				const signInResult = await signIn('credentials', {
					token: JSON.stringify(result.data),
					redirect: false,
				});

				if (signInResult?.ok) {
					toast.success('Login successful!');
					form.reset();
					if (result.data.user?.usersubscription) {
						router.push('/dashboard');
						return;
					}

					if (!result.data.user?.usersubscription) {
						router.push('/dashboard/membership');
					} else {
						router.push('/account');
					}
				} else {
					toast.error('Authentication failed. Please try again.');
				}
			}
		} catch (error: any) {
			toast.error(
				error?.data?.message || 'Login failed. Please check your credentials.'
			);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email Address *</FormLabel>
							<FormControl>
								<Input placeholder="Enter your email" type="email" {...field} />
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
							<FormLabel>Password *</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter your password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex items-center justify-between">
					<FormField
						control={form.control}
						name="rememberMe"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center space-x-2 space-y-0">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<FormLabel className="text-sm font-normal cursor-pointer">
									Keep me logged in
								</FormLabel>
							</FormItem>
						)}
					/>
					<button
						type="button"
						className="text-sm hover:underline"
						onClick={() => {
							// Handle forgot password
							toast.info('Forgot password functionality coming soon!');
						}}
					>
						Forgot Password?
					</button>
				</div>

				<Button
					type="submit"
					className="w-full h-11 bg-black text-white hover:bg-black/90"
					disabled={isLoading}
				>
					{isLoading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Logging in...
						</>
					) : (
						'Login'
					)}
				</Button>
			</form>
		</Form>
	);
}
