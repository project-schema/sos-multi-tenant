'use client';

import { DialogFooter } from '@/components/ui/dialog';
import { Check, Eye, EyeOff, Loader, LoaderCircle } from 'lucide-react';

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
import { CircularProgress } from '@/components/ui/progress-09';
import { Slider } from '@/components/ui/slider';
import { env } from '@/lib';
import { iSettingsType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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

		//   Domain already exists check
		if (data.domain === 'main') {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Domain name already exists',
				path: ['domain'],
			});
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

	const typeIsUser = form.watch('type') === 'user';

	const LOADER_DELAY = 4000;
	const MAX_LOADING_TIME = 60000;

	const router = useRouter();

	const [register, { isLoading: isLoadingTenantRegister }] =
		useTenantRegisterMutation();

	const [authRegister, { isLoading: isLoadingAuthRegister }] =
		useAuthRegisterMutation();

	const isLoading = isLoadingAuthRegister || isLoadingTenantRegister;

	const [showDelayedLoader, setShowDelayedLoader] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isFinalizing, setIsFinalizing] = useState(false);
	const [tenantURL, setTenantURL] = useState(''); // ✅ NEW: Store tenant URL

	// ✅ NORMAL STEPS
	const [steps, setSteps] = useState([
		{ label: 'Initializing setup...', done: false },
		{ label: 'Creating tenant...', done: false },
		{ label: 'Setting up database...', done: false },
		{ label: 'Preparing website...', done: false },
		{ label: 'Finalizing configuration...', done: false },
	]);

	// ✅ FINAL STEPS (2-STEP)
	const finalSteps = [
		{ label: '🔧 Provisioning server & configuring database...', done: false },
		{ label: '🚀 Deploying your workspace...', done: false },
	];

	const currentSteps = isFinalizing ? finalSteps : steps;

	// ✅ STEP UPDATE LOGIC
	useEffect(() => {
		const thresholds = isFinalizing ? [50, 100] : [10, 30, 55, 75, 90];

		if (isFinalizing) {
			setSteps(
				finalSteps.map((step, index) => ({
					...step,
					done: progress >= thresholds[index],
				})),
			);
		} else {
			setSteps((prev) =>
				prev.map((step, index) => ({
					...step,
					done: progress >= thresholds[index],
				})),
			);
		}
	}, [progress, isFinalizing]);

	// ✅ LOADER LOGIC (SIMPLIFIED)
	useEffect(() => {
		let timer: NodeJS.Timeout;
		let progressInterval: NodeJS.Timeout;
		let maxTimer: NodeJS.Timeout;

		if ((isSubmitting && isLoading) || isFinalizing) {
			timer = setTimeout(
				() => {
					setShowDelayedLoader(true);
					setProgress(0);

					progressInterval = setInterval(
						() => {
							setProgress((prev) => {
								if (isFinalizing) {
									if (prev < 50) return prev + 0.5;
									if (prev < 100) return prev + 1.5;
									return 100;
								}

								if (prev < 95) {
									const inc = prev < 30 ? 5 : prev < 60 ? 3 : prev < 80 ? 2 : 1;
									return Math.min(prev + inc, 95);
								}
								return prev;
							});
						},
						isFinalizing ? 450 : 500,
					);
				},
				isFinalizing ? 0 : LOADER_DELAY,
			);

			if (!isFinalizing) {
				maxTimer = setTimeout(() => {
					setIsSubmitting(false);
					setShowDelayedLoader(false);
					toast.error('Request is taking too long. Please try again.');
				}, MAX_LOADING_TIME);
			}
		} else if (!isLoading && !isFinalizing) {
			if (showDelayedLoader) {
				setProgress(100);
				const hideTimer = setTimeout(() => {
					setShowDelayedLoader(false);
					setIsSubmitting(false);
				}, 800);
				return () => clearTimeout(hideTimer);
			} else {
				setIsSubmitting(false);
			}
		}

		return () => {
			if (timer) clearTimeout(timer);
			if (progressInterval) clearInterval(progressInterval);
			if (maxTimer) clearTimeout(maxTimer);
		};
	}, [isSubmitting, isLoading, isFinalizing, showDelayedLoader]);

	// ✅ AUTO-REDIRECT WHEN FINAL PHASE COMPLETES (100%)
	useEffect(() => {
		if (isFinalizing && progress >= 100 && tenantURL && showDelayedLoader) {
			const redirectTimer = setTimeout(() => {
				window.location.href = tenantURL;
			}, 1500); // 1.5s "Redirecting..." pause

			return () => clearTimeout(redirectTimer);
		}
	}, [isFinalizing, progress, tenantURL, showDelayedLoader]);

	// ✅ BUILD URL
	const buildTenantURL = (subdomain: string) => {
		const { protocol, host } = window.location;
		const currentDomain = host.replace(/^.*?\./, '');

		if (env.rootDomain.includes('localhost')) {
			return `${protocol}//${subdomain}.${currentDomain}/auth?tab=login`;
		}
		return `${protocol}//${subdomain}.${env.rootDomain}/auth?tab=login`;
	};

	// ✅ SUBMIT HANDLER (STORES TENANT URL)
	const onSubmit = async (data: ZodType) => {
		try {
			setIsSubmitting(true);

			const response: any = await register({ ...data }).unwrap();

			if (response.success) {
				toast.success(response.message || 'Tenant created');

				// ✅ STORE TENANT URL FOR AUTO-REDIRECT
				const url = buildTenantURL(response.data.domain);
				setTenantURL(url);

				// ✅ START FINAL PHASE
				setIsFinalizing(true);
				return;
			}

			toast.error(response.message || 'Failed to create tenant');
			setIsSubmitting(false);
		} catch (err: any) {
			const validationErrors =
				err?.data?.validation_errors || err?.data?.errors;

			if (validationErrors && typeof validationErrors === 'object') {
				const values = form.getValues();
				Object.entries(validationErrors).forEach(([field, messages]) => {
					const message = Array.isArray(messages) ? messages[0] : messages;
					if (message && Object.prototype.hasOwnProperty.call(values, field)) {
						form.setError(field as keyof ZodType, {
							type: 'server',
							message: String(message),
						});
					}
				});

				const firstMessage = Object.values(validationErrors)?.[0];
				toast.error(
					String(Array.isArray(firstMessage) ? firstMessage[0] : firstMessage),
				);
				setIsSubmitting(false);
				return;
			}

			toast.error(err?.data?.message || 'Failed to create tenant');
			setIsSubmitting(false);
		}
	};

	// ✅ UI
	if (showDelayedLoader) {
		return (
			<div className="flex justify-center items-center py-10 bg-white rounded-lg">
				<div className="mx-auto flex w-full max-w-xs flex-col items-center">
					<CircularProgress
						labelClassName="text-xl font-bold"
						renderLabel={(p) => `${Math.round(p)}%`}
						showLabel
						size={120}
						strokeWidth={10}
						value={progress}
					/>

					<div className="w-full mt-6">
						<Slider value={[progress]} max={100} step={1} />
					</div>

					{/* ✅ STEPS */}
					<div className="mt-6 w-full">
						{currentSteps.map((step, index) => {
							const thresholds = isFinalizing
								? [50, 100]
								: [10, 30, 55, 75, 90];
							const done = progress >= thresholds[index];

							return (
								<div key={index} className="flex items-center gap-2 mb-3 py-2">
									<div
										className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
											done
												? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
												: 'bg-gray-200 text-gray-400 border border-gray-300'
										}`}
									>
										{done ? (
											<Check className="w-4 h-4" />
										) : (
											<span>{index + 1}</span>
										)}
									</div>
									<span
										className={`text-sm font-medium transition-colors duration-300 ${
											done
												? 'text-green-700 font-semibold'
												: isFinalizing
													? 'text-blue-600'
													: 'text-gray-600'
										}`}
									>
										{step.label}
									</span>
								</div>
							);
						})}
					</div>

					{/* ✅ MESSAGE */}
					<div className="mt-10 text-center space-y-2">
						{isFinalizing && progress >= 100 ? (
							<div className="flex items-center justify-center space-x-2 text-green-600 font-semibold">
								<Check className="w-5 h-5 animate-pulse" />
								<span>✅ Setup complete! Redirecting to your workspace...</span>
							</div>
						) : isFinalizing ? (
							<div className="space-y-1">
								<span className="flex items-center justify-center space-x-2 text-sm">
									<Loader className="w-5 h-5 animate-spin text-blue-500" />
									<span className="font-medium text-blue-700">
										Activating your workspace on server...
									</span>
								</span>
								<p className="text-xs text-blue-500">
									This may take up to 1.30 min
								</p>
							</div>
						) : progress < 95 ? (
							<span className="flex items-center justify-center space-x-2">
								<Loader className="w-4 h-4 animate-spin" />
								<span className="text-sm">
									Setting up your workspace... This may take up to{' '}
									<span className="font-medium">
										{MAX_LOADING_TIME / 1000}s
									</span>
								</span>
							</span>
						) : (
							<span className="flex items-center justify-center space-x-2 text-green-600 font-semibold">
								<Check className="w-5 h-5" />
								<span>Setup complete! Preparing final activation...</span>
							</span>
						)}
					</div>

					{progress < 100 && (
						<p className="mt-4 text-xs text-gray-500 font-medium text-center px-4">
							Please don't close or refresh this window
						</p>
					)}
				</div>
			</div>
		);
	}
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
