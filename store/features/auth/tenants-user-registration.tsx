'use client';

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
import { iSettingsType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAuthRegisterMutation } from './auth-api-slice';

// Zod validation schema for registration
const registerSchema = z
	.object({
		name: z
			.string()
			.min(1, 'Name is required')
			.min(2, 'Name must be at least 2 characters'),
		email: z
			.string()
			.min(1, 'Email is required')
			.email('Please enter a valid email address'),
		number: z
			.string()
			.min(1, 'Phone number is required')
			.regex(
				/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
				'Please enter a valid phone number'
			),
		password: z
			.string()
			.min(1, 'Password is required')
			.min(6, 'Password must be at least 6 characters'),
		password_confirmation: z
			.string()
			.min(1, 'Password confirmation is required'),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: 'Passwords do not match',
		path: ['password_confirmation'],
	});

type RegisterFormData = z.infer<typeof registerSchema>;

export function TenantUserRegistration({
	settings,
}: {
	settings?: iSettingsType;
}) {
	const [authRegister, { isLoading }] = useAuthRegisterMutation();
	const router = useRouter();

	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			number: '',
			password: '',
			password_confirmation: '',
		},
	});

	const onSubmit = async (data: RegisterFormData) => {
		try {
			const result = await authRegister({
				name: data.name,
				email: data.email,
				password: data.password,
				password_confirmation: data.password_confirmation,
			}).unwrap();

			if (result.success) {
				// Sign in with NextAuth using the token
				const signInResult = await signIn('credentials', {
					token: JSON.stringify(result.data),
					redirect: false,
				});

				if (signInResult?.ok) {
					toast.success('Registration successful!');
					form.reset();
					router.push('/account');
				} else {
					toast.error('Authentication failed. Please try again.');
				}
			}
		} catch (error: any) {
			toast.error(
				error?.data?.message || 'Registration failed. Please try again.'
			);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name *</FormLabel>
							<FormControl>
								<Input placeholder="Enter your full name" {...field} />
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
							<FormLabel>Email Address *</FormLabel>
							<FormControl>
								<Input type="email" placeholder="Enter your email" {...field} />
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
							<FormLabel>Phone Number *</FormLabel>
							<FormControl>
								<Input type="tel" placeholder="+880 1234 567890" {...field} />
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

				<FormField
					control={form.control}
					name="password_confirmation"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password *</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Confirm your password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="w-full h-11 bg-black text-white hover:bg-black/90"
					disabled={isLoading}
				>
					{isLoading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Creating Account...
						</>
					) : (
						'Register'
					)}
				</Button>
			</form>
		</Form>
	);
}
