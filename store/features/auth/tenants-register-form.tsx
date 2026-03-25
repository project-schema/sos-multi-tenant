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
	// const router = useRouter();
	// const [register, { isLoading: isLoadingTenantRegister }] =
	// 	useTenantRegisterMutation();
	// const [authRegister, { isLoading: isLoadingAuthRegister }] =
	// 	useAuthRegisterMutation();
	// const isLoading = isLoadingAuthRegister || isLoadingTenantRegister;
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirmation, setShowPasswordConfirmation] =
		useState(false);

	// const form = useForm<ZodType>({
	// 	resolver: zodResolver(schema),
	// 	defaultValues: {
	// 		company_name: '',
	// 		domain: '',
	// 		email: '',
	// 		owner_name: '',
	// 		type: 'user',
	// 		password: '',
	// 		password_confirmation: '',
	// 		number: '',
	// 		accept_terms: false,
	// 	},
	// });

	// const typeIsUser = form.watch('type') === 'user';

	// const onSubmit = async (data: ZodType) => {
	// 	alertConfirm({
	// 		onOk: async () => {
	// 			try {
	// 				const response: any = await register({
	// 					...data,
	// 				}).unwrap();

	// 				const validationErrors =
	// 					response?.validation_errors || response?.errors;

	// 				if (validationErrors && typeof validationErrors === 'object') {
	// 					const values = form.getValues();

	// 					Object.entries(validationErrors).forEach(([field, messages]) => {
	// 						const message = Array.isArray(messages) ? messages[0] : messages;

	// 						if (
	// 							message &&
	// 							Object.prototype.hasOwnProperty.call(values, field)
	// 						) {
	// 							form.setError(field as keyof ZodType, {
	// 								type: 'server',
	// 								message: String(message),
	// 							});
	// 						}
	// 					});

	// 					const firstMessage = Object.values(validationErrors)?.[0];
	// 					toast.error(
	// 						String(
	// 							Array.isArray(firstMessage) ? firstMessage[0] : firstMessage,
	// 						),
	// 					);
	// 					return;
	// 				}

	// 				if (response.message === 'Registration successfully!' && typeIsUser) {
	// 					toast.success(response.message || 'User registered successfully');
	// 					router.push('/auth?tab=login');
	// 				}

	// 				if (response.success) {
	// 					toast.success(response.message || 'Tenant registered successfully');
	// 					localStorage.setItem('tenant_data', JSON.stringify(data));

	// 					const tenantSubdomain = response.data.domain;

	// 					// Get current domain info
	// 					const { protocol, host } = window.location;
	// 					const currentDomain = host.replace(/^.*?\./, '');

	// 					let tenantURL = '';

	// 					// Construct tenant URL based on current host
	// 					if (env.rootDomain.includes('localhost')) {
	// 						tenantURL = `${protocol}//${tenantSubdomain}.${currentDomain}/auth?tab=login`;
	// 					} else {
	// 						tenantURL = `${protocol}//${tenantSubdomain}.${env.rootDomain}/auth?tab=login`;
	// 					}
	// 					// Redirect to tenant's subdomain
	// 					window.location.href = tenantURL;
	// 				} else {
	// 					if (!typeIsUser) {
	// 						toast.error(response.message || 'Failed to create tenant');
	// 					}
	// 				}
	// 			} catch (err: any) {
	// 				const validationErrors =
	// 					err?.data?.validation_errors || err?.data?.errors;

	// 				if (validationErrors && typeof validationErrors === 'object') {
	// 					const values = form.getValues();

	// 					Object.entries(validationErrors).forEach(([field, messages]) => {
	// 						const message = Array.isArray(messages) ? messages[0] : messages;

	// 						if (
	// 							message &&
	// 							Object.prototype.hasOwnProperty.call(values, field)
	// 						) {
	// 							form.setError(field as keyof ZodType, {
	// 								type: 'server',
	// 								message: String(message),
	// 							});
	// 						}
	// 					});

	// 					const firstMessage = Object.values(validationErrors)?.[0];
	// 					toast.error(
	// 						String(
	// 							Array.isArray(firstMessage) ? firstMessage[0] : firstMessage,
	// 						),
	// 					);
	// 					return;
	// 				}

	// 				toast.error(err?.data?.message || 'Failed to create tenant');
	// 			}
	// 		},
	// 	});
	// };

	// if (!isLoadingTenantRegister) {
	// 	return (
	// 		<div className="flex justify-center items-center h-screen">Loader</div>
	// 	);
	// }
	// const router = useRouter();
	// const [register, { isLoading: isLoadingTenantRegister }] =
	// 	useTenantRegisterMutation();
	// const [authRegister, { isLoading: isLoadingAuthRegister }] =
	// 	useAuthRegisterMutation();
	// const isLoading = isLoadingAuthRegister || isLoadingTenantRegister;
	// const [showPassword, setShowPassword] = useState(false);
	// const [showPasswordConfirmation, setShowPasswordConfirmation] =
	// 	useState(false);
	// const [showDelayedLoader, setShowDelayedLoader] = useState(false);
	// const [progress, setProgress] = useState(0);
	// const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

	// const form = useForm<ZodType>({
	// 	resolver: zodResolver(schema),
	// 	defaultValues: {
	// 		company_name: '',
	// 		domain: '',
	// 		email: '',
	// 		owner_name: '',
	// 		type: 'user',
	// 		password: '',
	// 		password_confirmation: '',
	// 		number: '',
	// 		accept_terms: false,
	// 	},
	// });

	// const typeIsUser = form.watch('type') === 'user';

	// // Effect to handle delayed loader display and progress animation
	// useEffect(() => {
	// 	let timer: NodeJS.Timeout;
	// 	let progressInterval: NodeJS.Timeout;

	// 	if (isSubmitting && isLoading) {
	// 		// Set timer to show loader after 3 seconds
	// 		timer = setTimeout(() => {
	// 			setShowDelayedLoader(true);

	// 			// Reset progress when loader appears
	// 			setProgress(0);

	// 			// Simulate progress increment
	// 			progressInterval = setInterval(() => {
	// 				setProgress((prev) => {
	// 					// Increase progress but cap at 95% until actual completion
	// 					if (prev < 95) {
	// 						// Gradually slow down as it approaches 95
	// 						const increment =
	// 							prev < 30 ? 5 : prev < 60 ? 3 : prev < 80 ? 2 : 1;
	// 						return Math.min(prev + increment, 95);
	// 					}
	// 					return prev;
	// 				});
	// 			}, 500);
	// 		}, 3000);
	// 	} else if (!isLoading) {
	// 		// When loading completes, if loader is showing, set progress to 100% and hide after delay
	// 		if (showDelayedLoader) {
	// 			setProgress(100);

	// 			// Hide loader after a brief delay to show 100%
	// 			const hideTimer = setTimeout(() => {
	// 				setShowDelayedLoader(false);
	// 				setIsSubmitting(false);
	// 			}, 500);

	// 			return () => clearTimeout(hideTimer);
	// 		} else {
	// 			setIsSubmitting(false);
	// 		}
	// 	}

	// 	return () => {
	// 		if (timer) clearTimeout(timer);
	// 		if (progressInterval) clearInterval(progressInterval);
	// 	};
	// }, [isSubmitting, isLoading, showDelayedLoader]);

	// const onSubmit = async (data: ZodType) => {
	// 	try {
	// 		setIsSubmitting(true); // Set submitting state when form submission starts

	// 		const response: any = await register({
	// 			...data,
	// 		}).unwrap();

	// 		const validationErrors = response?.validation_errors || response?.errors;

	// 		if (validationErrors && typeof validationErrors === 'object') {
	// 			const values = form.getValues();

	// 			Object.entries(validationErrors).forEach(([field, messages]) => {
	// 				const message = Array.isArray(messages) ? messages[0] : messages;

	// 				if (message && Object.prototype.hasOwnProperty.call(values, field)) {
	// 					form.setError(field as keyof ZodType, {
	// 						type: 'server',
	// 						message: String(message),
	// 					});
	// 				}
	// 			});

	// 			const firstMessage = Object.values(validationErrors)?.[0];
	// 			toast.error(
	// 				String(Array.isArray(firstMessage) ? firstMessage[0] : firstMessage),
	// 			);
	// 			setIsSubmitting(false);
	// 			return;
	// 		}

	// 		if (response.message === 'Registration successfully!' && typeIsUser) {
	// 			toast.success(response.message || 'User registered successfully');
	// 			router.push('/auth?tab=login');
	// 		}

	// 		if (response.success) {
	// 			toast.success(response.message || 'Tenant registered successfully');
	// 			localStorage.setItem('tenant_data', JSON.stringify(data));

	// 			const tenantSubdomain = response.data.domain;

	// 			// Get current domain info
	// 			const { protocol, host } = window.location;
	// 			const currentDomain = host.replace(/^.*?\./, '');

	// 			let tenantURL = '';

	// 			// Construct tenant URL based on current host
	// 			if (env.rootDomain.includes('localhost')) {
	// 				tenantURL = `${protocol}//${tenantSubdomain}.${currentDomain}/auth?tab=login`;
	// 			} else {
	// 				tenantURL = `${protocol}//${tenantSubdomain}.${env.rootDomain}/auth?tab=login`;
	// 			}
	// 			// Redirect to tenant's subdomain
	// 			window.location.href = tenantURL;
	// 		} else {
	// 			if (!typeIsUser) {
	// 				toast.error(response.message || 'Failed to create tenant');
	// 			}
	// 			setIsSubmitting(false);
	// 		}
	// 	} catch (err: any) {
	// 		const validationErrors =
	// 			err?.data?.validation_errors || err?.data?.errors;

	// 		if (validationErrors && typeof validationErrors === 'object') {
	// 			const values = form.getValues();

	// 			Object.entries(validationErrors).forEach(([field, messages]) => {
	// 				const message = Array.isArray(messages) ? messages[0] : messages;

	// 				if (message && Object.prototype.hasOwnProperty.call(values, field)) {
	// 					form.setError(field as keyof ZodType, {
	// 						type: 'server',
	// 						message: String(message),
	// 					});
	// 				}
	// 			});

	// 			const firstMessage = Object.values(validationErrors)?.[0];
	// 			toast.error(
	// 				String(Array.isArray(firstMessage) ? firstMessage[0] : firstMessage),
	// 			);
	// 			setIsSubmitting(false);
	// 			return;
	// 		}

	// 		toast.error(err?.data?.message || 'Failed to create tenant');
	// 		setIsSubmitting(false);
	// 	}
	// };

	// // Show loader ONLY when submission takes more than 5 seconds
	// if (showDelayedLoader) {
	// 	return (
	// 		<div className="flex justify-center items-center  py-10 bg-white rounded-lg">
	// 			<div className="mx-auto flex w-full max-w-xs flex-col items-center">
	// 				<CircularProgress
	// 					labelClassName="text-xl font-bold"
	// 					renderLabel={(progress) => `${Math.round(progress)}%`}
	// 					showLabel
	// 					size={120}
	// 					strokeWidth={10}
	// 					value={progress}
	// 				/>
	// 				<div className="w-full mt-8">
	// 					<Slider
	// 						value={[progress]}
	// 						defaultValue={[progress]}
	// 						// onValueChange={(value) => setProgress(value[0])}
	// 						max={100}
	// 						step={1}
	// 						className="cursor-pointer"
	// 						sliderTrackClassName="bg-primary/25"
	// 					/>
	// 				</div>
	// 				<p className="mt-4 text-sm text-gray-500">
	// 					{progress < 30 && 'Initializing setup...'}
	// 					{progress >= 30 && progress < 60 && 'Creating tenant resources...'}
	// 					{progress >= 60 && progress < 95 && 'Finalizing configuration...'}
	// 					{progress >= 95 && progress < 100 && 'Almost there...'}
	// 					{progress === 100 && 'Complete! Redirecting...'}
	// 				</p>
	// 				{/* Show additional message after 5 seconds */}
	// 				{progress > 0 && (
	// 					<p className="mt-2 text-xs text-gray-400">
	// 						{progress < 95 &&
	// 							"This may take a moment. Please don't close this window."}
	// 					</p>
	// 				)}
	// 			</div>
	// 		</div>
	// 	);
	// }

	// CONFIG (easy to tweak later)
	// const LOADER_DELAY = 3000; // show loader after 3s
	// const MAX_LOADING_TIME = 30000; // max wait = 30s

	// const router = useRouter();

	// const [register, { isLoading: isLoadingTenantRegister }] =
	// 	useTenantRegisterMutation();

	// const [authRegister, { isLoading: isLoadingAuthRegister }] =
	// 	useAuthRegisterMutation();

	// const isLoading = isLoadingAuthRegister || isLoadingTenantRegister;
	// const [showPassword, setShowPassword] = useState(false);
	// const [showPasswordConfirmation, setShowPasswordConfirmation] =
	// 	useState(false);
	// const [showDelayedLoader, setShowDelayedLoader] = useState(false);
	// const [progress, setProgress] = useState(0);
	// const [isSubmitting, setIsSubmitting] = useState(false);

	// // Steps
	// const [steps, setSteps] = useState([
	// 	{ label: 'Initializing setup...', done: false },
	// 	{ label: 'Creating tenant...', done: false },
	// 	{ label: 'Setting up database...', done: false },
	// 	{ label: 'Preparing website...', done: false },
	// 	{ label: 'Finalizing configuration...', done: false },
	// ]);

	// const form = useForm<ZodType>({
	// 	resolver: zodResolver(schema),
	// 	defaultValues: {
	// 		company_name: '',
	// 		domain: '',
	// 		email: '',
	// 		owner_name: '',
	// 		type: 'user',
	// 		password: '',
	// 		password_confirmation: '',
	// 		number: '',
	// 		accept_terms: false,
	// 	},
	// });

	// const typeIsUser = form.watch('type') === 'user';

	// // Update steps based on progress
	// useEffect(() => {
	// 	setSteps((prev) =>
	// 		prev.map((step, index) => {
	// 			const thresholds = [10, 30, 55, 75, 90];
	// 			return {
	// 				...step,
	// 				done: progress >= thresholds[index],
	// 			};
	// 		}),
	// 	);
	// }, [progress]);

	// // Loader + timeout logic
	// useEffect(() => {
	// 	let timer: NodeJS.Timeout;
	// 	let progressInterval: NodeJS.Timeout;
	// 	let maxTimer: NodeJS.Timeout;

	// 	if (isSubmitting && isLoading) {
	// 		timer = setTimeout(() => {
	// 			setShowDelayedLoader(true);
	// 			setProgress(0);

	// 			progressInterval = setInterval(() => {
	// 				setProgress((prev) => {
	// 					if (prev < 95) {
	// 						const increment =
	// 							prev < 30 ? 5 : prev < 60 ? 3 : prev < 80 ? 2 : 1;
	// 						return Math.min(prev + increment, 95);
	// 					}
	// 					return prev;
	// 				});
	// 			}, 500);
	// 		}, LOADER_DELAY);

	// 		// failsafe
	// 		maxTimer = setTimeout(() => {
	// 			setIsSubmitting(false);
	// 			setShowDelayedLoader(false);
	// 			toast.error('Request is taking too long. Please try again.');
	// 		}, MAX_LOADING_TIME);
	// 	} else if (!isLoading) {
	// 		if (showDelayedLoader) {
	// 			setProgress(100);

	// 			const hideTimer = setTimeout(() => {
	// 				setShowDelayedLoader(false);
	// 				setIsSubmitting(false);
	// 			}, 800);

	// 			return () => clearTimeout(hideTimer);
	// 		} else {
	// 			setIsSubmitting(false);
	// 		}
	// 	}

	// 	return () => {
	// 		if (timer) clearTimeout(timer);
	// 		if (progressInterval) clearInterval(progressInterval);
	// 		if (maxTimer) clearTimeout(maxTimer);
	// 	};
	// }, [isSubmitting, isLoading, showDelayedLoader]);

	// // Build tenant URL
	// const buildTenantURL = (subdomain: string) => {
	// 	// const tenantSubdomain = response.data.domain;

	// 	// 			// Get current domain info
	// 	const { protocol, host } = window.location;
	// 	const currentDomain = host.replace(/^.*?\./, '');

	// 	let tenantURL = '';

	// 	// Construct tenant URL based on current host
	// 	if (env.rootDomain.includes('localhost')) {
	// 		tenantURL = `${protocol}//${subdomain}.${currentDomain}/auth?tab=login`;
	// 	} else {
	// 		tenantURL = `${protocol}//${subdomain}.${env.rootDomain}/auth?tab=login`;
	// 	}
	// 	// Redirect to tenant's subdomain
	// 	window.location.href = tenantURL;
	// };

	// // Submit handler
	// const onSubmit = async (data: ZodType) => {
	// 	try {
	// 		setIsSubmitting(true);

	// 		const response: any = await register({ ...data }).unwrap();

	// 		const validationErrors = response?.validation_errors || response?.errors;

	// 		if (validationErrors && typeof validationErrors === 'object') {
	// 			const values = form.getValues();

	// 			Object.entries(validationErrors).forEach(([field, messages]) => {
	// 				const message = Array.isArray(messages) ? messages[0] : messages;

	// 				if (message && Object.prototype.hasOwnProperty.call(values, field)) {
	// 					form.setError(field as keyof ZodType, {
	// 						type: 'server',
	// 						message: String(message),
	// 					});
	// 				}
	// 			});

	// 			const firstMessage = Object.values(validationErrors)?.[0];
	// 			toast.error(
	// 				String(Array.isArray(firstMessage) ? firstMessage[0] : firstMessage),
	// 			);

	// 			setIsSubmitting(false);
	// 			return;
	// 		}

	// 		// USER FLOW
	// 		if (response.message === 'Registration successfully!' && typeIsUser) {
	// 			toast.success(response.message);
	// 			router.push('/auth?tab=login');
	// 			return;
	// 		}

	// 		// TENANT FLOW
	// 		if (response.success) {
	// 			toast.success(response.message || 'Tenant created');

	// 			localStorage.setItem('tenant_data', JSON.stringify(data));

	// 			const tenantURL = buildTenantURL(response.data.domain);

	// 			// show 100% before redirect
	// 			setTimeout(() => {
	// 				window.location.href = tenantURL;
	// 			}, 1000);
	// 		} else {
	// 			toast.error(response.message || 'Failed to create tenant');
	// 			setIsSubmitting(false);
	// 		}
	// 	} catch (err: any) {
	// 		const validationErrors =
	// 			err?.data?.validation_errors || err?.data?.errors;

	// 		if (validationErrors && typeof validationErrors === 'object') {
	// 			const values = form.getValues();

	// 			Object.entries(validationErrors).forEach(([field, messages]) => {
	// 				const message = Array.isArray(messages) ? messages[0] : messages;

	// 				if (message && Object.prototype.hasOwnProperty.call(values, field)) {
	// 					form.setError(field as keyof ZodType, {
	// 						type: 'server',
	// 						message: String(message),
	// 					});
	// 				}
	// 			});

	// 			const firstMessage = Object.values(validationErrors)?.[0];
	// 			toast.error(
	// 				String(Array.isArray(firstMessage) ? firstMessage[0] : firstMessage),
	// 			);
	// 			setIsSubmitting(false);
	// 			return;
	// 		}

	// 		toast.error(err?.data?.message || 'Failed to create tenant');
	// 		setIsSubmitting(false);
	// 	}
	// };

	// // LOADER UI
	// if (showDelayedLoader) {
	// 	return (
	// 		<div className="flex justify-center items-center py-10 bg-white rounded-lg">
	// 			<div className="mx-auto flex w-full max-w-xs flex-col items-center">
	// 				<CircularProgress
	// 					labelClassName="text-xl font-bold"
	// 					renderLabel={(progress) => `${Math.round(progress)}%`}
	// 					showLabel
	// 					size={120}
	// 					strokeWidth={10}
	// 					value={progress}
	// 				/>

	// 				<div className="w-full mt-6">
	// 					<Slider
	// 						value={[progress]}
	// 						max={100}
	// 						step={1}
	// 						className="cursor-pointer"
	// 						sliderTrackClassName="bg-primary/25"
	// 					/>
	// 				</div>

	// 				{/* Steps */}
	// 				<div className="mt-6 w-full">
	// 					{steps.map((step, index) => (
	// 						<div key={index} className="flex items-center gap-2 mb-2">
	// 							<div
	// 								className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
	// 									step.done ? 'bg-green-500 text-white' : 'bg-gray-300'
	// 								}`}
	// 							>
	// 								{step.done ? <Check className="w-3 h-3" /> : ''}
	// 							</div>
	// 							<span
	// 								className={`text-sm ${
	// 									step.done ? 'text-green-600' : 'text-gray-500'
	// 								}`}
	// 							>
	// 								{step.label}
	// 							</span>
	// 						</div>
	// 					))}
	// 				</div>

	// 				<p className="mt-10 text-sm text-gray-600 text-center">
	// 					{progress < 100 ? (
	// 						<span className="flex items-center space-x-2">
	// 							<Loader className="w-4 h-4 animate-spin" />
	// 							<span>
	// 								Setting up your workspace... This may take up to{' '}
	// 								{MAX_LOADING_TIME / 1000} seconds
	// 							</span>
	// 						</span>
	// 					) : (
	// 						<span className="text-green-600 font-medium">
	// 							Setup complete! Redirecting you to your workspace...
	// 						</span>
	// 					)}
	// 				</p>

	// 				{progress < 100 && (
	// 					<p className="mt-2 text-xs text-gray-400 text-center">
	// 						Please don't close this window. Your workspace is being prepared.
	// 					</p>
	// 				)}
	// 			</div>
	// 		</div>
	// 	);
	// }

	// const LOADER_DELAY = 4000; // show loader after 4s
	// const MAX_LOADING_TIME = 30000; // max wait = 30s

	// const router = useRouter();

	// const [register, { isLoading: isLoadingTenantRegister }] =
	// 	useTenantRegisterMutation();

	// const [authRegister, { isLoading: isLoadingAuthRegister }] =
	// 	useAuthRegisterMutation();

	// const isLoading = isLoadingAuthRegister || isLoadingTenantRegister;

	// const [showPassword, setShowPassword] = useState(false);
	// const [showPasswordConfirmation, setShowPasswordConfirmation] =
	// 	useState(false);

	// const [showDelayedLoader, setShowDelayedLoader] = useState(false);
	// const [progress, setProgress] = useState(0);
	// const [isSubmitting, setIsSubmitting] = useState(false);
	// const [isFinalizing, setIsFinalizing] = useState(false); // ✅ NEW

	// // Steps
	// const [steps, setSteps] = useState([
	// 	{ label: 'Initializing setup...', done: false },
	// 	{ label: 'Creating tenant...', done: false },
	// 	{ label: 'Setting up database...', done: false },
	// 	{ label: 'Preparing website...', done: false },
	// 	{ label: 'Finalizing configuration...', done: false },
	// ]);

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

	// // Update steps based on progress
	// useEffect(() => {
	// 	setSteps((prev) =>
	// 		prev.map((step, index) => {
	// 			const thresholds = [10, 30, 55, 75, 90];
	// 			return {
	// 				...step,
	// 				done: progress >= thresholds[index],
	// 			};
	// 		}),
	// 	);
	// }, [progress]);

	// // Loader + timeout logic
	// useEffect(() => {
	// 	let timer: NodeJS.Timeout;
	// 	let progressInterval: NodeJS.Timeout;
	// 	let maxTimer: NodeJS.Timeout;

	// 	if ((isSubmitting && isLoading) || isFinalizing) {
	// 		timer = setTimeout(() => {
	// 			setShowDelayedLoader(true);
	// 			setProgress(0);

	// 			progressInterval = setInterval(() => {
	// 				setProgress((prev) => {
	// 					// ✅ FINAL PHASE (after success)
	// 					if (isFinalizing) {
	// 						return prev < 100 ? prev + 1 : 100;
	// 					}

	// 					// ✅ NORMAL LOADING PHASE
	// 					if (prev < 95) {
	// 						const increment =
	// 							prev < 30 ? 5 : prev < 60 ? 3 : prev < 80 ? 2 : 1;
	// 						return Math.min(prev + increment, 95);
	// 					}
	// 					return prev;
	// 				});
	// 			}, 500);
	// 		}, LOADER_DELAY);

	// 		// failsafe (only for API phase)
	// 		if (!isFinalizing) {
	// 			maxTimer = setTimeout(() => {
	// 				setIsSubmitting(false);
	// 				setShowDelayedLoader(false);
	// 				toast.error('Request is taking too long. Please try again.');
	// 			}, MAX_LOADING_TIME);
	// 		}
	// 	} else if (!isLoading && !isFinalizing) {
	// 		if (showDelayedLoader) {
	// 			setProgress(100);

	// 			const hideTimer = setTimeout(() => {
	// 				setShowDelayedLoader(false);
	// 				setIsSubmitting(false);
	// 			}, 800);

	// 			return () => clearTimeout(hideTimer);
	// 		} else {
	// 			setIsSubmitting(false);
	// 		}
	// 	}

	// 	return () => {
	// 		if (timer) clearTimeout(timer);
	// 		if (progressInterval) clearInterval(progressInterval);
	// 		if (maxTimer) clearTimeout(maxTimer);
	// 	};
	// }, [isSubmitting, isLoading, showDelayedLoader, isFinalizing]);

	// // Build tenant URL
	// const buildTenantURL = (subdomain: string) => {
	// 	const { protocol, host } = window.location;
	// 	const currentDomain = host.replace(/^.*?\./, '');

	// 	let tenantURL = '';

	// 	if (env.rootDomain.includes('localhost')) {
	// 		tenantURL = `${protocol}//${subdomain}.${currentDomain}/auth?tab=login`;
	// 	} else {
	// 		tenantURL = `${protocol}//${subdomain}.${env.rootDomain}/auth?tab=login`;
	// 	}

	// 	return tenantURL;
	// };

	// // Submit handler
	// const onSubmit = async (data: ZodType) => {
	// 	try {
	// 		setIsSubmitting(true);

	// 		const response: any = await register({ ...data }).unwrap();

	// 		const validationErrors = response?.validation_errors || response?.errors;

	// 		if (validationErrors && typeof validationErrors === 'object') {
	// 			const values = form.getValues();

	// 			Object.entries(validationErrors).forEach(([field, messages]) => {
	// 				const message = Array.isArray(messages) ? messages[0] : messages;

	// 				if (message && Object.prototype.hasOwnProperty.call(values, field)) {
	// 					form.setError(field as keyof ZodType, {
	// 						type: 'server',
	// 						message: String(message),
	// 					});
	// 				}
	// 			});

	// 			const firstMessage = Object.values(validationErrors)?.[0];
	// 			toast.error(
	// 				String(Array.isArray(firstMessage) ? firstMessage[0] : firstMessage),
	// 			);

	// 			setIsSubmitting(false);
	// 			return;
	// 		}

	// 		// USER FLOW
	// 		if (response.message === 'Registration successfully!' && typeIsUser) {
	// 			toast.success(response.message);
	// 			router.push('/auth?tab=login');
	// 			return;
	// 		}

	// 		// TENANT FLOW
	// 		if (response.success) {
	// 			toast.success(response.message || 'Tenant created');

	// 			localStorage.setItem('tenant_data', JSON.stringify(data));

	// 			const tenantURL = buildTenantURL(response.data.domain);

	// 			// ✅ START FINAL PHASE (30s backend activation)
	// 			setIsFinalizing(true);

	// 			setTimeout(() => {
	// 				window.location.href = tenantURL;
	// 			}, 30000);

	// 			return;
	// 		} else {
	// 			toast.error(response.message || 'Failed to create tenant');
	// 			setIsSubmitting(false);
	// 		}
	// 	} catch (err: any) {
	// 		const validationErrors =
	// 			err?.data?.validation_errors || err?.data?.errors;

	// 		if (validationErrors && typeof validationErrors === 'object') {
	// 			const values = form.getValues();

	// 			Object.entries(validationErrors).forEach(([field, messages]) => {
	// 				const message = Array.isArray(messages) ? messages[0] : messages;

	// 				if (message && Object.prototype.hasOwnProperty.call(values, field)) {
	// 					form.setError(field as keyof ZodType, {
	// 						type: 'server',
	// 						message: String(message),
	// 					});
	// 				}
	// 			});

	// 			const firstMessage = Object.values(validationErrors)?.[0];
	// 			toast.error(
	// 				String(Array.isArray(firstMessage) ? firstMessage[0] : firstMessage),
	// 			);

	// 			setIsSubmitting(false);
	// 			return;
	// 		}

	// 		toast.error(err?.data?.message || 'Failed to create tenant');
	// 		setIsSubmitting(false);
	// 	}
	// };

	// // LOADER UI
	// if (showDelayedLoader) {
	// 	return (
	// 		<div className="flex justify-center items-center py-10 bg-white rounded-lg">
	// 			<div className="mx-auto flex w-full max-w-xs flex-col items-center">
	// 				<CircularProgress
	// 					labelClassName="text-xl font-bold"
	// 					renderLabel={(progress) => `${Math.round(progress)}%`}
	// 					showLabel
	// 					size={120}
	// 					strokeWidth={10}
	// 					value={progress}
	// 				/>

	// 				<div className="w-full mt-6">
	// 					<Slider
	// 						value={[progress]}
	// 						max={100}
	// 						step={1}
	// 						className="cursor-pointer"
	// 						sliderTrackClassName="bg-primary/25"
	// 					/>
	// 				</div>

	// 				{/* Steps */}
	// 				<div className="mt-6 w-full">
	// 					{steps.map((step, index) => (
	// 						<div key={index} className="flex items-center gap-2 mb-2">
	// 							<div
	// 								className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
	// 									step.done ? 'bg-green-500 text-white' : 'bg-gray-300'
	// 								}`}
	// 							>
	// 								{step.done ? <Check className="w-3 h-3" /> : ''}
	// 							</div>
	// 							<span
	// 								className={`text-sm ${
	// 									step.done ? 'text-green-600' : 'text-gray-500'
	// 								}`}
	// 							>
	// 								{step.label}
	// 							</span>
	// 						</div>
	// 					))}
	// 				</div>

	// 				<p className="mt-10 text-sm text-gray-600 text-center">
	// 					{isFinalizing ? (
	// 						<span className="flex items-center space-x-2">
	// 							<Loader className="w-4 h-4 animate-spin" />
	// 							<span>
	// 								Activating your workspace... This may take up to 30 seconds
	// 							</span>
	// 						</span>
	// 					) : progress < 100 ? (
	// 						<span className="flex items-center space-x-2">
	// 							<Loader className="w-4 h-4 animate-spin" />
	// 							<span>
	// 								Setting up your workspace... This may take up to{' '}
	// 								{MAX_LOADING_TIME / 1000} seconds
	// 							</span>
	// 						</span>
	// 					) : (
	// 						<span className="text-green-600 font-medium">
	// 							Setup complete! Redirecting...
	// 						</span>
	// 					)}
	// 				</p>

	// 				{progress < 100 && (
	// 					<p className="mt-2 text-xs text-gray-400 text-center">
	// 						Please don't close this window. Your workspace is being prepared.
	// 					</p>
	// 				)}
	// 			</div>
	// 		</div>
	// 	);
	// }

	// const LOADER_DELAY = 4000;
	// const MAX_LOADING_TIME = 60000;

	// const router = useRouter();

	// const [register, { isLoading: isLoadingTenantRegister }] =
	// 	useTenantRegisterMutation();

	// const [authRegister, { isLoading: isLoadingAuthRegister }] =
	// 	useAuthRegisterMutation();

	// const isLoading = isLoadingAuthRegister || isLoadingTenantRegister;

	// const [showDelayedLoader, setShowDelayedLoader] = useState(false);
	// const [progress, setProgress] = useState(0);
	// const [isSubmitting, setIsSubmitting] = useState(false);
	// const [isFinalizing, setIsFinalizing] = useState(false);

	// // ✅ NORMAL STEPS
	// const [steps, setSteps] = useState([
	// 	{ label: 'Initializing setup...', done: false },
	// 	{ label: 'Creating tenant...', done: false },
	// 	{ label: 'Setting up database...', done: false },
	// 	{ label: 'Preparing website...', done: false },
	// 	{ label: 'Finalizing configuration...', done: false },
	// ]);

	// // ✅ FINAL STEPS (NEW)
	// const finalSteps = [
	// 	{ label: 'Provisioning server...', done: false },
	// 	{ label: 'Configuring database...', done: false },
	// 	{ label: 'Deploying workspace...', done: false },
	// 	{ label: 'Almost ready...', done: false },
	// ];

	// const currentSteps = isFinalizing ? finalSteps : steps;

	// // ✅ STEP UPDATE LOGIC
	// useEffect(() => {
	// 	const thresholds = isFinalizing ? [25, 50, 75, 95] : [10, 30, 55, 75, 90];

	// 	setSteps((prev) =>
	// 		prev.map((step, index) => ({
	// 			...step,
	// 			done: progress >= thresholds[index],
	// 		})),
	// 	);
	// }, [progress, isFinalizing]);

	// // ✅ LOADER LOGIC (UPDATED)
	// useEffect(() => {
	// 	let timer: NodeJS.Timeout;
	// 	let progressInterval: NodeJS.Timeout;
	// 	let maxTimer: NodeJS.Timeout;

	// 	if ((isSubmitting && isLoading) || isFinalizing) {
	// 		timer = setTimeout(() => {
	// 			setShowDelayedLoader(true);
	// 			setProgress(0);

	// 			progressInterval = setInterval(() => {
	// 				setProgress((prev) => {
	// 					// ✅ FINAL PHASE
	// 					if (isFinalizing) {
	// 						return prev < 100 ? Math.min(prev + 2, 100) : 100;
	// 					}

	// 					// ✅ NORMAL PHASE
	// 					if (prev < 95) {
	// 						const inc = prev < 30 ? 5 : prev < 60 ? 3 : prev < 80 ? 2 : 1;
	// 						return Math.min(prev + inc, 95);
	// 					}
	// 					return prev;
	// 				});
	// 			}, 500);
	// 		}, LOADER_DELAY);

	// 		if (!isFinalizing) {
	// 			maxTimer = setTimeout(() => {
	// 				setIsSubmitting(false);
	// 				setShowDelayedLoader(false);
	// 				toast.error('Request is taking too long. Please try again.');
	// 			}, MAX_LOADING_TIME);
	// 		}
	// 	} else if (!isLoading && !isFinalizing) {
	// 		if (showDelayedLoader) {
	// 			setProgress(100);

	// 			const hideTimer = setTimeout(() => {
	// 				setShowDelayedLoader(false);
	// 				setIsSubmitting(false);
	// 			}, 800);

	// 			return () => clearTimeout(hideTimer);
	// 		} else {
	// 			setIsSubmitting(false);
	// 		}
	// 	}

	// 	return () => {
	// 		if (timer) clearTimeout(timer);
	// 		if (progressInterval) clearInterval(progressInterval);
	// 		if (maxTimer) clearTimeout(maxTimer);
	// 	};
	// }, [isSubmitting, isLoading, isFinalizing, showDelayedLoader]);

	// // ✅ BUILD URL
	// const buildTenantURL = (subdomain: string) => {
	// 	const { protocol, host } = window.location;
	// 	const currentDomain = host.replace(/^.*?\./, '');

	// 	if (env.rootDomain.includes('localhost')) {
	// 		return `${protocol}//${subdomain}.${currentDomain}/auth?tab=login`;
	// 	}

	// 	return `${protocol}//${subdomain}.${env.rootDomain}/auth?tab=login`;
	// };

	// // ✅ SUBMIT HANDLER
	// const onSubmit = async (data: ZodType) => {
	// 	try {
	// 		setIsSubmitting(true);

	// 		const response: any = await register({ ...data }).unwrap();

	// 		if (response.success) {
	// 			toast.success(response.message || 'Tenant created');

	// 			const tenantURL = buildTenantURL(response.data.domain);

	// 			// ✅ FINAL PHASE START
	// 			setIsFinalizing(true);

	// 			setTimeout(() => {
	// 				window.location.href = tenantURL;
	// 			}, 60000);

	// 			return;
	// 		}

	// 		toast.error(response.message || 'Failed to create tenant');
	// 		setIsSubmitting(false);
	// 	} catch (err: any) {
	// 		const validationErrors =
	// 			err?.data?.validation_errors || err?.data?.errors;

	// 		if (validationErrors && typeof validationErrors === 'object') {
	// 			const values = form.getValues();

	// 			Object.entries(validationErrors).forEach(([field, messages]) => {
	// 				const message = Array.isArray(messages) ? messages[0] : messages;

	// 				if (message && Object.prototype.hasOwnProperty.call(values, field)) {
	// 					form.setError(field as keyof ZodType, {
	// 						type: 'server',
	// 						message: String(message),
	// 					});
	// 				}
	// 			});

	// 			const firstMessage = Object.values(validationErrors)?.[0];
	// 			toast.error(
	// 				String(Array.isArray(firstMessage) ? firstMessage[0] : firstMessage),
	// 			);

	// 			setIsSubmitting(false);
	// 			return;
	// 		}

	// 		toast.error(err?.data?.message || 'Failed to create tenant');
	// 		setIsSubmitting(false);
	// 	}
	// };

	// // ✅ UI
	// if (showDelayedLoader) {
	// 	return (
	// 		<div className="flex justify-center items-center py-10 bg-white rounded-lg">
	// 			<div className="mx-auto flex w-full max-w-xs flex-col items-center">
	// 				<CircularProgress
	// 					labelClassName="text-xl font-bold"
	// 					renderLabel={(p) => `${Math.round(p)}%`}
	// 					showLabel
	// 					size={120}
	// 					strokeWidth={10}
	// 					value={progress}
	// 				/>

	// 				<div className="w-full mt-6">
	// 					<Slider value={[progress]} max={100} step={1} />
	// 				</div>

	// 				{/* ✅ STEPS */}
	// 				<div className="mt-6 w-full">
	// 					{currentSteps.map((step, index) => {
	// 						const thresholds = isFinalizing
	// 							? [25, 50, 75, 95]
	// 							: [10, 30, 55, 75, 90];

	// 						const done = progress >= thresholds[index];

	// 						return (
	// 							<div key={index} className="flex items-center gap-2 mb-2">
	// 								<div
	// 									className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
	// 										done ? 'bg-green-500 text-white' : 'bg-gray-300'
	// 									}`}
	// 								>
	// 									{done && <Check className="w-3 h-3" />}
	// 								</div>
	// 								<span
	// 									className={`text-sm ${
	// 										done ? 'text-green-600' : 'text-gray-500'
	// 									}`}
	// 								>
	// 									{step.label}
	// 								</span>
	// 							</div>
	// 						);
	// 					})}
	// 				</div>

	// 				{/* ✅ MESSAGE */}
	// 				<p className="mt-10 text-sm text-gray-600 text-center">
	// 					{isFinalizing ? (
	// 						<span className="flex items-center space-x-2">
	// 							<Loader className="w-4 h-4 animate-spin" />
	// 							<span>Activating your workspace... Setting up on server</span>
	// 						</span>
	// 					) : progress < 100 ? (
	// 						<span className="flex items-center space-x-2">
	// 							<Loader className="w-4 h-4 animate-spin" />
	// 							<span>
	// 								Setting up your workspace... This may take up to{' '}
	// 								{MAX_LOADING_TIME / 1000} seconds
	// 							</span>
	// 						</span>
	// 					) : (
	// 						<span className="text-green-600 font-medium">
	// 							Setup complete! Redirecting...
	// 						</span>
	// 					)}
	// 				</p>

	// 				{progress < 100 && (
	// 					<p className="mt-2 text-xs text-gray-400 text-center">
	// 						Please don't close this window.
	// 					</p>
	// 				)}
	// 			</div>
	// 		</div>
	// 	);
	// }

	// const LOADER_DELAY = 4000;
	// const MAX_LOADING_TIME = 60000;

	// const router = useRouter();

	// const [register, { isLoading: isLoadingTenantRegister }] =
	// 	useTenantRegisterMutation();

	// const [authRegister, { isLoading: isLoadingAuthRegister }] =
	// 	useAuthRegisterMutation();

	// const isLoading = isLoadingAuthRegister || isLoadingTenantRegister;

	// const [showDelayedLoader, setShowDelayedLoader] = useState(false);
	// const [progress, setProgress] = useState(0);
	// const [isSubmitting, setIsSubmitting] = useState(false);
	// const [isFinalizing, setIsFinalizing] = useState(false);

	// // ✅ NORMAL STEPS
	// const [steps, setSteps] = useState([
	// 	{ label: 'Initializing setup...', done: false },
	// 	{ label: 'Creating tenant...', done: false },
	// 	{ label: 'Setting up database...', done: false },
	// 	{ label: 'Preparing website...', done: false },
	// 	{ label: 'Finalizing configuration...', done: false },
	// ]);

	// // ✅ FINAL STEPS (IMPROVED - 2-STEP TITLE)
	// const finalSteps = [
	// 	{ label: '🔧 Provisioning server & configuring database...', done: false },
	// 	{ label: '🚀 Deploying your workspace...', done: false },
	// ];

	// const currentSteps = isFinalizing ? finalSteps : steps;

	// // ✅ STEP UPDATE LOGIC (FIXED)
	// useEffect(() => {
	// 	const thresholds = isFinalizing ? [50, 100] : [10, 30, 55, 75, 90];

	// 	if (isFinalizing) {
	// 		setSteps(
	// 			finalSteps.map((step, index) => ({
	// 				...step,
	// 				done: progress >= thresholds[index],
	// 			})),
	// 		);
	// 	} else {
	// 		setSteps((prev) =>
	// 			prev.map((step, index) => ({
	// 				...step,
	// 				done: progress >= thresholds[index],
	// 			})),
	// 		);
	// 	}
	// }, [progress, isFinalizing]);

	// // ✅ LOADER LOGIC (FIXED FOR FINAL PHASE)
	// useEffect(() => {
	// 	let timer: NodeJS.Timeout;
	// 	let progressInterval: NodeJS.Timeout;
	// 	let maxTimer: NodeJS.Timeout;

	// 	if ((isSubmitting && isLoading) || isFinalizing) {
	// 		timer = setTimeout(() => {
	// 			setShowDelayedLoader(true);
	// 			setProgress(0);

	// 			progressInterval = setInterval(
	// 				() => {
	// 					setProgress((prev) => {
	// 						// ✅ FIXED FINAL PHASE - SLOWER & MORE REALISTIC
	// 						if (isFinalizing) {
	// 							if (prev < 50) {
	// 								return prev + 0.5; // Very slow first step
	// 							} else if (prev < 100) {
	// 								return prev + 1.5; // Faster second step
	// 							}
	// 							return 100;
	// 						}

	// 						// ✅ NORMAL PHASE
	// 						if (prev < 95) {
	// 							const inc = prev < 30 ? 5 : prev < 60 ? 3 : prev < 80 ? 2 : 1;
	// 							return Math.min(prev + inc, 95);
	// 						}
	// 						return prev;
	// 					});
	// 				},
	// 				isFinalizing ? 1200 : 500,
	// 			); // SLOWER interval for final phase
	// 		}, LOADER_DELAY);

	// 		if (!isFinalizing) {
	// 			maxTimer = setTimeout(() => {
	// 				setIsSubmitting(false);
	// 				setShowDelayedLoader(false);
	// 				toast.error('Request is taking too long. Please try again.');
	// 			}, MAX_LOADING_TIME);
	// 		}
	// 	} else if (!isLoading && !isFinalizing) {
	// 		if (showDelayedLoader) {
	// 			setProgress(100);

	// 			const hideTimer = setTimeout(() => {
	// 				setShowDelayedLoader(false);
	// 				setIsSubmitting(false);
	// 			}, 800);

	// 			return () => clearTimeout(hideTimer);
	// 		} else {
	// 			setIsSubmitting(false);
	// 		}
	// 	}

	// 	return () => {
	// 		if (timer) clearTimeout(timer);
	// 		if (progressInterval) clearInterval(progressInterval);
	// 		if (maxTimer) clearTimeout(maxTimer);
	// 	};
	// }, [isSubmitting, isLoading, isFinalizing, showDelayedLoader]);

	// // ✅ BUILD URL
	// const buildTenantURL = (subdomain: string) => {
	// 	const { protocol, host } = window.location;
	// 	const currentDomain = host.replace(/^.*?\./, '');

	// 	if (env.rootDomain.includes('localhost')) {
	// 		return `${protocol}//${subdomain}.${currentDomain}/auth?tab=login`;
	// 	}

	// 	return `${protocol}//${subdomain}.${env.rootDomain}/auth?tab=login`;
	// };

	// // ✅ SUBMIT HANDLER (FIXED TIMEOUT)
	// const onSubmit = async (data: ZodType) => {
	// 	try {
	// 		setIsSubmitting(true);

	// 		const response: any = await register({ ...data }).unwrap();

	// 		if (response.success) {
	// 			toast.success(response.message || 'Tenant created');

	// 			const tenantURL = buildTenantURL(response.data.domain);

	// 			// ✅ FINAL PHASE START - FIXED TIMEOUT (60s total for final phase)
	// 			setIsFinalizing(true);

	// 			// Start redirect timer for final phase (about 40s after final phase starts)
	// 			setTimeout(() => {
	// 				window.location.href = tenantURL;
	// 			}, 40000); // Reduced from 60s since normal phase already took time

	// 			return;
	// 		}

	// 		toast.error(response.message || 'Failed to create tenant');
	// 		setIsSubmitting(false);
	// 	} catch (err: any) {
	// 		const validationErrors =
	// 			err?.data?.validation_errors || err?.data?.errors;

	// 		if (validationErrors && typeof validationErrors === 'object') {
	// 			const values = form.getValues();

	// 			Object.entries(validationErrors).forEach(([field, messages]) => {
	// 				const message = Array.isArray(messages) ? messages[0] : messages;

	// 				if (message && Object.prototype.hasOwnProperty.call(values, field)) {
	// 					form.setError(field as keyof ZodType, {
	// 						type: 'server',
	// 						message: String(message),
	// 					});
	// 				}
	// 			});

	// 			const firstMessage = Object.values(validationErrors)?.[0];
	// 			toast.error(
	// 				String(Array.isArray(firstMessage) ? firstMessage[0] : firstMessage),
	// 			);

	// 			setIsSubmitting(false);
	// 			return;
	// 		}

	// 		toast.error(err?.data?.message || 'Failed to create tenant');
	// 		setIsSubmitting(false);
	// 	}
	// };

	// // ✅ UI (IMPROVED)
	// if (showDelayedLoader) {
	// 	return (
	// 		<div className="flex justify-center items-center py-10 bg-white rounded-lg">
	// 			<div className="mx-auto flex w-full max-w-xs flex-col items-center">
	// 				<CircularProgress
	// 					labelClassName="text-xl font-bold"
	// 					renderLabel={(p) => `${Math.round(p)}%`}
	// 					showLabel
	// 					size={120}
	// 					strokeWidth={10}
	// 					value={progress}
	// 				/>

	// 				<div className="w-full mt-6">
	// 					<Slider value={[progress]} max={100} step={1} />
	// 				</div>

	// 				{/* ✅ STEPS (IMPROVED) */}
	// 				<div className="mt-6 w-full">
	// 					{currentSteps.map((step, index) => {
	// 						const thresholds = isFinalizing
	// 							? [50, 100]
	// 							: [10, 30, 55, 75, 90];
	// 						const done = progress >= thresholds[index];

	// 						return (
	// 							<div key={index} className="flex items-center gap-2 mb-3 py-2">
	// 								<div
	// 									className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
	// 										done
	// 											? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
	// 											: 'bg-gray-200 text-gray-400 border border-gray-300'
	// 									}`}
	// 								>
	// 									{done ? (
	// 										<Check className="w-4 h-4" />
	// 									) : (
	// 										<span>{index + 1}</span>
	// 									)}
	// 								</div>
	// 								<span
	// 									className={`text-sm font-medium transition-colors duration-300 ${
	// 										done
	// 											? 'text-green-700 font-semibold'
	// 											: isFinalizing
	// 												? 'text-blue-600'
	// 												: 'text-gray-600'
	// 									}`}
	// 								>
	// 									{step.label}
	// 								</span>
	// 							</div>
	// 						);
	// 					})}
	// 				</div>

	// 				{/* ✅ MESSAGE (IMPROVED) */}
	// 				<div className="mt-10 text-center space-y-2">
	// 					{isFinalizing ? (
	// 						<div className="space-y-1">
	// 							<span className="flex items-center justify-center space-x-2 text-sm">
	// 								<Loader className="w-5 h-5 animate-spin text-blue-500" />
	// 								<span className="font-medium text-blue-700">
	// 									Activating your workspace on server...
	// 								</span>
	// 							</span>
	// 							<p className="text-xs text-blue-500">
	// 								This final step may take up to 45 seconds
	// 							</p>
	// 						</div>
	// 					) : progress < 95 ? (
	// 						<span className="flex items-center justify-center space-x-2">
	// 							<Loader className="w-4 h-4 animate-spin" />
	// 							<span className="text-sm">
	// 								Setting up your workspace... This may take up to{' '}
	// 								<span className="font-medium">
	// 									{MAX_LOADING_TIME / 1000}s
	// 								</span>
	// 							</span>
	// 						</span>
	// 					) : (
	// 						<span className="flex items-center justify-center space-x-2 text-green-600 font-semibold">
	// 							<Check className="w-5 h-5" />
	// 							<span>Setup complete! Preparing final activation...</span>
	// 						</span>
	// 					)}
	// 				</div>

	// 				{progress < 100 && (
	// 					<p className="mt-4 text-xs text-gray-500 font-medium text-center px-4">
	// 						Please don't close or refresh this window
	// 					</p>
	// 				)}
	// 			</div>
	// 		</div>
	// 	);
	// }

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
			timer = setTimeout(() => {
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
					isFinalizing ? 1200 : 500,
				);
			}, LOADER_DELAY);

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
									This may take up to 45 seconds
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
