'use client';

import Input from '@/components/frontend/Input/Input';
import { iSettingsType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAuthLoginMutation } from './auth-api-slice';
import MotionFadeIn from './MotionFadeIn';
import style from './sign-in.module.css';

// Zod validation schema for login
const loginSchema = z.object({
	email: z.email('Please enter a valid email address'),
	password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function TenantUserLogin({ settings }: { settings?: iSettingsType }) {
	const [login, { isLoading }] = useAuthLoginMutation();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
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
					reset();
					router.push('/');
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
		<>
			<section className={style.loginBg}>
				<div className="layout">
					<div className={style.layoutBgImg}>
						<div className={`${style.loginFormBox} max-w-2xl`}>
							{/*<MotionFadeIn className={style.LoginImg}>

								 <Image
									className={style.singleChooseImg}
									width={333}
									height={60}
									src={
										settings?.message?.footer_image
											? `${env.baseAPI}/${settings?.message?.footer_image}`
											: '/placeholder.svg'
									}
									alt="logo"
								/> 
							</MotionFadeIn>*/}

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
									/>
								</MotionFadeIn>

								<MotionFadeIn delay={0.15}>
									<Input
										label="Password"
										placeholder="Your Password"
										type="password"
										error={errors.password?.message || ''}
										{...register('password')}
									/>
								</MotionFadeIn>

								<div>
									<p>
										<Link
											className={style.loginGoRLink}
											href="/forget-password"
										>
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
										<Link className={style.loginGoRLink} href="/register">
											Register now
										</Link>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
