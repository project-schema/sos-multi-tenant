'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import Footer01 from '@/components/web/footer/01';
import Header01 from '@/components/web/header/01';
import { TenantUserLogin } from '@/store/features/auth';
import { useState } from 'react';

export default function ThemeOneAuthPage() {
	const [mode, setMode] = useState<'login' | 'register'>('login');

	return (
		<>
			<Header01 />
			<TenantUserLogin />;
			<section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<h1 className="text-3xl font-bold mb-6 capitalize">{mode}</h1>
				<div className="border rounded-xl p-6 md:p-8 bg-white">
					<h2 className="text-2xl font-semibold mb-6">
						{mode === 'login' ? 'Welcome' : 'Account Register'}
					</h2>

					{/* Google */}
					<button className="w-full border rounded-md h-11 flex items-center justify-center gap-2 bg-gray-50">
						<GoogleIcon />
						<span>Google</span>
					</button>
					<div className="flex items-center gap-3 my-6">
						<div className="h-px bg-gray-200 flex-1" />
						<span className="text-sm text-gray-500">or</span>
						<div className="h-px bg-gray-200 flex-1" />
					</div>

					{mode === 'login' ? <LoginForm /> : <RegisterForm />}

					<div className="mt-6 text-sm text-gray-600">
						{mode === 'login' ? (
							<p>
								Don't have an account?{' '}
								<button
									className="text-black font-semibold"
									onClick={() => setMode('register')}
								>
									Register Now
								</button>
							</p>
						) : (
							<p>
								Already Have an Account?{' '}
								<button
									className="text-black font-semibold"
									onClick={() => setMode('login')}
								>
									Login
								</button>
							</p>
						)}
					</div>
				</div>
			</section>
			<Footer01 />
		</>
	);
}

function LoginForm() {
	return (
		<form className="space-y-4">
			<div>
				<label className="block text-sm font-medium mb-1">
					Email Address/Phone Number *
				</label>
				<Input placeholder="+880 6146 11616" />
			</div>
			<div>
				<label className="block text-sm font-medium mb-1">Password *</label>
				<Input type="password" placeholder="Enter Password" />
			</div>
			<div className="flex items-center justify-between">
				<label className="flex items-center gap-2 text-sm">
					<Checkbox />
					<span>Keep me logged in</span>
				</label>
				<button type="button" className="text-sm">
					Forgot Password?
				</button>
			</div>
			<Button className="w-full h-11 bg-black text-white">Login</Button>
		</form>
	);
}

function RegisterForm() {
	return (
		<form className="space-y-4">
			<div>
				<label className="block text-sm font-medium mb-1">Name</label>
				<Input placeholder="+880 6146 11616" />
			</div>
			<div>
				<label className="block text-sm font-medium mb-1">Email Address</label>
				<Input placeholder="your email" />
			</div>
			<div>
				<label className="block text-sm font-medium mb-1">Phone Number *</label>
				<Input placeholder="+880 6146 11616" />
			</div>
			<div>
				<label className="block text-sm font-medium mb-1">Password *</label>
				<Input type="password" placeholder="Enter Password" />
			</div>
			<Button className="w-full h-11 bg-black text-white">Register</Button>
		</form>
	);
}

function GoogleIcon({ size = 20 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
			<circle cx="12" cy="12" r="10" fill="#fff" />
			<path
				fill="#4285F4"
				d="M12 4a8 8 0 100 16 8 8 0 006.9-4.1h-3.2a4.9 4.9 0 11-1.8-7.5l2.3-2.3A8 8 0 0012 4z"
			/>
			<path
				fill="#34A853"
				d="M20.9 12.3a8 8 0 01-2.1 4.6l-2.3-2.3a4.9 4.9 0 001.1-2.3H21z"
			/>
			<path
				fill="#FBBC05"
				d="M7.2 13.4a4.9 4.9 0 010-2.8L4.9 8.3a8 8 0 000 7.4l2.3-2.3z"
			/>
			<path
				fill="#EA4335"
				d="M12 7.1a4.9 4.9 0 013.1 1.1l2.4-2.4A8 8 0 0012 4v3.1z"
			/>
		</svg>
	);
}
