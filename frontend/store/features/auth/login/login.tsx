'use client';
import { Input1, Loader1 } from '@/components';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useAuthInfoQuery, useLoginMutation } from '../sign-up';
import { handleError, handleResponse, toast } from '@/helper';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { invalidateAllTags } from '@/helper/invalidateAllTags';

export function Login() {
	// State to hold the generated security code
	const [securityCode, setSecurityCode] = useState('');
	const session = useSession();
	const dispatch = useAppDispatch();

	const handleInvalidateTags = () => {
		dispatch(invalidateAllTags());
	};

	const { data: authInfo, isLoading: authInfoLoading } = useAuthInfoQuery(
		undefined,
		{
			skip: !(session.status === 'authenticated') || !session,
		}
	);

	useEffect(() => {
		if (authInfo && authInfo.data.role.type === 'admin') {
			router.push('/admin');
		} else if (authInfo && authInfo.data.role.type === 'user') {
			router.push('/user'); // Redirect to home page for non-admin users
		}
	}, [authInfo, dispatch]);

	// State to hold the form data
	const [login, { isLoading }] = useLoginMutation();

	// Next.js router for navigation
	const router = useRouter();

	//   Generate random 4-digit code on load
	useEffect(() => {
		const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
		setSecurityCode(randomCode);
	}, []);

	//   Define the schema for form validation using Zod
	const schema = z.object({
		email: z.string().min(1, 'Email is required').email('Invalid email'),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		securityCodeInput: z.string().refine((val) => val === securityCode, {
			message: 'Invalid security code',
		}),
		remember: z.boolean().optional(),
	});

	//   Define the TypeScript type for the form input based on the schema
	type LoginInput = z.infer<typeof schema>;

	//   Use react-hook-form with Zod resolver for form handling
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LoginInput>({
		resolver: zodResolver(schema),
	});

	//   Define the onSubmit function to handle form submission
	const onSubmit = async (data: LoginInput) => {
		// Invalidate all tags to ensure fresh data
		handleInvalidateTags();
		try {
			// Call the login mutation with the form data
			const response = await login({
				email: data.email,
				password: data.password,
			}).unwrap();

			// Show success toast and handle optional actions
			await handleResponse(response, {
				onSuccess: async () => {
					// Set NextAuth session via credentials provider
					const authResponse = await signIn('credentials', {
						redirect: false,
						token: JSON.stringify(response), // send the token as a stringified object
					});

					// Check if the authentication was successful
					if (authResponse && authResponse.ok) {
						// Generate a new security code after successful login
						const newCode = Math.floor(1000 + Math.random() * 9000).toString();
						setSecurityCode(newCode);
						// reset the form after successful login
						reset();
						console.log({ authInfo });

						if (authInfo?.data.role.type === 'admin') {
							router.push('/admin');
						} else if (authInfo?.data.role.type === 'user') {
							router.push('/user'); // Redirect to home page for non-admin users
						}

						// Redirect to home page after successful login
					} else {
						// Handle error if signIn fails
						toast({
							message: 'Error',
							description: 'Something went wrong. Please try again.',
							type: 'error',
						});
					}
				},
			});
		} catch (error) {
			// Handle any errors that occur during the login process
			handleError(error);
		}
	};

	if (session.status === 'loading' || authInfoLoading) {
		return (
			<div className="page-content pt-150 pb-150 text-center">
				<div className="spinner-border  " role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	return (
		<section className="page-content pt-150 pb-150">
			<div className="container">
				<div className="row">
					<div className="col-xl-8 col-lg-10 col-md-12 m-auto">
						<div className="row">
							<div className="col-lg-6 pr-30 d-none d-lg-block">
								<img
									className="border-radius-15"
									src="assets/imgs/page/login-1.png"
									alt=""
								/>
							</div>
							<div className="col-lg-6 col-md-8">
								<div className="login_wrap widget-taber-content background-white">
									<div className="padding_eight_all bg-white">
										<div className="heading_s1">
											<h1 className="mb-5">Login</h1>
											<p className="mb-30">
												Don&apos;t have an account?{' '}
												<a href="page-register.html">Create here</a>
											</p>
										</div>

										{/* Form for login */}
										{/* Using react-hook-form for form handling */}
										<form onSubmit={handleSubmit(onSubmit)} noValidate>
											{/* Username or email */}
											<Input1
												label="Username or Email"
												type="email"
												placeholder="Username or Email *"
												registration={register('email')}
												error={errors.email?.message}
											/>

											{/* Password input */}
											<Input1
												label="Password"
												type="password"
												placeholder="Your password *"
												registration={register('password')}
												error={errors.password?.message}
											/>

											{/* Security code input */}
											<div className="login_footer form-group">
												<div className="chek-form">
													<Input1
														placeholder="Security code *"
														registration={register('securityCodeInput')}
														error={errors.securityCodeInput?.message}
													/>
												</div>
												<span className="security-code">
													{/* Display the generated security code */}
													{securityCode.split('').map((digit, index) => (
														<b
															key={index}
															className={
																[
																	'text-new',
																	'text-hot',
																	'text-sale',
																	'text-best',
																][index]
															}
														>
															{digit}
														</b>
													))}
												</span>
											</div>

											<div className="login_footer form-group mb-50 d-flex justify-content-between align-items-center">
												<div className="chek-form">
													<div className="custome-checkbox">
														<input
															className="form-check-input"
															type="checkbox"
															id="exampleCheckbox1"
															{...register('remember')}
														/>
														<label
															className="form-check-label"
															htmlFor="exampleCheckbox1"
														>
															<span>Remember me</span>
														</label>
													</div>
												</div>
												<Link
													className="text-muted"
													href="/auth?tab=forget-password"
												>
													Forgot password?
												</Link>
											</div>

											<div className="form-group">
												<button
													type="submit"
													className="btn btn-heading btn-block hover-up"
													name="login"
												>
													Log in{isLoading && '...'}
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
