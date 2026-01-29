'use client';

import { DialogFooter } from '@/components/ui/dialog';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';

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
import { alertConfirm, env } from '@/lib';
import { iSettingsType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import {
	useAuthRegisterMutation,
	useTenantRegisterMutation,
} from './auth-api-slice';
import MotionFadeIn from './MotionFadeIn';
import style from './sign-in.module.css';
// --- Zod Schema ---
export const schema = z
	.object({
		company_name: z.string(),
		domain: z.string(),
		email: z.email('Invalid email address'),
		owner_name: z.string().min(1, 'Owner name is required'),
		number: z
			.string()
			.min(1, 'Number is required')
			.max(11, 'Number is invalid'),
		type: z.enum(['user', 'merchant', 'dropshipper']),
		password: z.string().min(1, 'Password is required'),
		password_confirmation: z
			.string()
			.min(1, 'Password confirmation is required'),
		accept_terms: z.boolean(),
	})
	.superRefine((data, ctx) => {
		if (data.type !== 'user') {
			if (!data.company_name || data.company_name.trim() === '') {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Company name is required',
					path: ['company_name'],
				});
			}

			if (!data.domain || data.domain.trim() === '') {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Domain is required',
					path: ['domain'],
				});
			}
		}

		if (data.password !== data.password_confirmation) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match',
				path: ['password_confirmation'],
			});
		}

		if (!data.accept_terms) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'You must accept the terms and conditions',
				path: ['accept_terms'],
			});
		}
	});

export type ZodType = z.infer<typeof schema>;

export const TenantsRegisterForm = ({
	settings,
}: {
	settings: iSettingsType;
}) => {
	const router = useRouter();
	const [register, { isLoading: isLoadingTenantRegister }] =
		useTenantRegisterMutation();
	const [authRegister, { isLoading: isLoadingAuthRegister }] =
		useAuthRegisterMutation();
	const isLoading = isLoadingAuthRegister || isLoadingTenantRegister;
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirmation, setShowPasswordConfirmation] =
		useState(false);

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			company_name: '',
			domain: '',
			email: '',
			owner_name: '',
			type: 'user',
			password: '',
			password_confirmation: '',
			number: '',
			accept_terms: false,
		},
	});

	console.log(form.formState.errors);
	const typeIsUser = form.watch('type') === 'user';

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response: any = await register({
						...data,
					}).unwrap();

					const validationErrors =
						response?.validation_errors || response?.errors;

					if (validationErrors && typeof validationErrors === 'object') {
						const values = form.getValues();

						Object.entries(validationErrors).forEach(([field, messages]) => {
							const message = Array.isArray(messages) ? messages[0] : messages;

							if (
								message &&
								Object.prototype.hasOwnProperty.call(values, field)
							) {
								form.setError(field as keyof ZodType, {
									type: 'server',
									message: String(message),
								});
							}
						});

						const firstMessage = Object.values(validationErrors)?.[0];
						toast.error(
							String(
								Array.isArray(firstMessage) ? firstMessage[0] : firstMessage
							)
						);
						return;
					}

					if (response.message === 'Registration successfully!' && typeIsUser) {
						toast.success(response.message || 'User registered successfully');
						router.push('/auth?tab=login');
					}

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
						if (!typeIsUser) {
							toast.error(response.message || 'Failed to create tenant');
						}
					}
				} catch (err: any) {
					const validationErrors =
						err?.data?.validation_errors || err?.data?.errors;

					if (validationErrors && typeof validationErrors === 'object') {
						const values = form.getValues();

						Object.entries(validationErrors).forEach(([field, messages]) => {
							const message = Array.isArray(messages) ? messages[0] : messages;

							if (
								message &&
								Object.prototype.hasOwnProperty.call(values, field)
							) {
								form.setError(field as keyof ZodType, {
									type: 'server',
									message: String(message),
								});
							}
						});

						const firstMessage = Object.values(validationErrors)?.[0];
						toast.error(
							String(
								Array.isArray(firstMessage) ? firstMessage[0] : firstMessage
							)
						);
						return;
					}

					toast.error(err?.data?.message || 'Failed to create tenant');
				}
			},
		});
	};

	return (
		<section className="shadow-lg rounded-lg mb-10">
			<div className="layout">
				<div className={style.layoutBgImg}>
					<div className={`${style.loginFormBox} max-w-2xl`}>
						<div className="flex justify-center items-center mb-2">
							<Image
								unoptimized
								src={`${env.baseAPI}/${settings?.message?.logo}`}
								alt="logo"
								width={100}
								height={100}
							/>
						</div>
						<MotionFadeIn className={style.loginFromHeading} delay={0.18}>
							<h3>Register Your Account</h3>
						</MotionFadeIn>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								{/* Type */}

								<FormField
									control={form.control}
									name="type"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Register as</FormLabel>
											<FormControl>
												<div className={style.userItemsBox}>
													{[
														{ value: 'merchant', label: 'Merchant' },
														// { value: 'dropshipper', label: 'Drop Shipper' },
														{ value: 'user', label: 'User' },
													].map((option) => (
														<button
															key={option.value}
															type="button"
															className={`${style.userItems} ${
																field.value === option.value ? style.active : ''
															}`}
															onClick={() => field.onChange(option.value)}
														>
															{option.label}
														</button>
													))}
												</div>
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
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Enter owner name..." />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
									{/* Number */}
									<FormField
										control={form.control}
										name="number"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Number</FormLabel>
												<FormControl>
													<Input
														{...field}
														type="text"
														placeholder="Enter number..."
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								{!typeIsUser && (
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{/* Company Name */}
										<FormField
											control={form.control}
											name="company_name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Company Name</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="Enter company name..."
														/>
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
									</div>
								)}

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{/* Password */}
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<div className="relative">
														<Input
															{...field}
															type={showPassword ? 'text' : 'password'}
															placeholder="Enter password..."
															className="pr-10"
														/>
														<button
															type="button"
															aria-label={
																showPassword ? 'Hide password' : 'Show password'
															}
															className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
															onClick={() => setShowPassword((prev) => !prev)}
														>
															{showPassword ? (
																<EyeOff size={18} />
															) : (
																<Eye size={18} />
															)}
														</button>
													</div>
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
													<div className="relative">
														<Input
															{...field}
															type={
																showPasswordConfirmation ? 'text' : 'password'
															}
															placeholder="Enter password confirmation..."
															className="pr-10"
														/>
														<button
															type="button"
															aria-label={
																showPasswordConfirmation
																	? 'Hide password confirmation'
																	: 'Show password confirmation'
															}
															className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
															onClick={() =>
																setShowPasswordConfirmation((prev) => !prev)
															}
														>
															{showPasswordConfirmation ? (
																<EyeOff size={18} />
															) : (
																<Eye size={18} />
															)}
														</button>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								{/* Accept Terms */}
								<FormField
									control={form.control}
									name="accept_terms"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<label className="flex items-center gap-2 text-sm text-gray-700">
													<input
														type="checkbox"
														className="h-4 w-4"
														checked={field.value}
														onChange={(e) => field.onChange(e.target.checked)}
													/>
													<span>
														I agree to the{' '}
														<Link
															className="text-blue-600 underline"
															href="/terms"
															target="_blank"
														>
															Terms & Conditions
														</Link>
													</span>
												</label>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<DialogFooter className="flex sm:flex-col gap-4">
									<div className="w-full">
										<Button
											type="submit"
											className={`${style.loginBtn} capitalize `}
											disabled={isLoading}
										>
											{isLoading && (
												<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
											)}
											{isLoading
												? 'Registering...'
												: `Register as ${form.watch('type')}`}
										</Button>
									</div>

									<div className={style.goRegister}>
										<p>
											Already have an account?{' '}
											<Link
												className={style.loginGoRLink}
												href="/auth?tab=login"
											>
												Login now
											</Link>
										</p>
									</div>
								</DialogFooter>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</section>
	);
};
