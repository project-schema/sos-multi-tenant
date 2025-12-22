'use client';

import Input from '@/components/frontend/Input/Input';
import { env } from '@/lib';
import { iSettingsType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAdminLoginMutation } from './auth-api-slice';
import MotionFadeIn from './MotionFadeIn';
import style from './sign-in.module.css';

// --- Zod Schema ---
export const schema = z.object({
	email: z.email('Invalid email address'),
	password: z.string().min(1, 'Password is required'),
});

export type ZodType = z.infer<typeof schema>;

export const AuthLogin = ({ settings }: { settings: iSettingsType }) => {
	const router = useRouter();
	// const [login, { isLoading }] = useAuthLoginMutation();
	const [login, { isLoading }] = useAdminLoginMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ZodType>({
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
							email: data.email,
							name: response.username,
							id: 1,
							tenant_type: response.role === '1' ? 'admin' : 'user',
							last_seen: new Date().toISOString(),
						},
						token: response.token,
						tenant_id: response?.token?.split('|')[0] || '1',
						tenant_type: response.role === '1' ? 'admin' : 'user',
					}),
					redirect: false,
				});

				console.log(signInResult);
				if (signInResult?.ok) {
					toast.success('Login successful!');
					reset();
					router.push(response.role === '1' ? '/admin' : '/user');
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
		<section className="shadow-lg rounded-lg">
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
							<h3>Login Your Account</h3>
						</MotionFadeIn>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<MotionFadeIn delay={0.15}>
								<Input
									label="Email"
									placeholder="Your Email"
									type="email"
									error={errors.email?.message || ''}
									{...register('email')}
									tabIndex={1}
								/>
							</MotionFadeIn>

							<MotionFadeIn delay={0.15}>
								<Input
									label="Password"
									placeholder="Your Password"
									type="password"
									error={errors.password?.message || ''}
									{...register('password')}
									tabIndex={2}
								/>
							</MotionFadeIn>

							<div>
								<p>
									<Link className={style.loginGoRLink} href="/forget-password">
										Forget Password?
									</Link>
								</p>
							</div>

							<MotionFadeIn className={style.loginButton} delay={0.15}>
								<button
									type="submit"
									className={style.loginBtn}
									disabled={isLoading}
								>
									{isLoading ? 'Logging in...' : 'Login'}
								</button>
							</MotionFadeIn>

							<div className={style.goRegister}>
								<p>
									New here?{' '}
									<Link
										className={style.loginGoRLink}
										href="/auth?tab=register"
									>
										Register now
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};
