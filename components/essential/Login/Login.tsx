import Style from './Login.style.module.css';
import Logo from '../../../../public/images/LoginLogo.png';
import Image from 'next/image';
import Input from '@/components/ui/Input/Input';
import { useReducer } from 'react';
import { initialState, reducer } from './action';
import { useSession, signIn, signOut } from 'next-auth/react';

function LoginForm() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { data: session } = useSession();
	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await signIn('credentials', {
			username: 'admin@gmail.com',
			password: 'password',
			redirect: false,
			// Set to true to automatically redirect on success
			callbackUrl: '/login',
		});
	};
	return (
		<section className={Style.loginBg}>
			<div className="layout ">
				<div className={Style.layoutBgImg}>
					<div className={Style.loginFormBox}>
						<div className={Style.LoginImg}>
							<Image
								className={Style.singleChooseImg}
								src={Logo}
								alt="Choose Us Images"
							/>
						</div>
						<div className={Style.loginFromHeading}>
							<h3>Create an Account Create Own Startup</h3>
						</div>
						<div className={Style.loignTabBox}>
							<p className={Style.loginP}>Register as,</p>
						</div>
						<div className={Style.userItemsBox}>
							<button className={Style.userItems}>User</button>
							<button className={Style.userItems}>Drop Shipper</button>
							<button className={Style.userItems}>Merchant</button>
						</div>
						<form onSubmit={handleSignIn}>
							<Input
								dispatch={dispatch}
								label="Email"
								name="email"
								state={state}
								placeholder="Your Email"
								type="email"
							/>
							<Input
								dispatch={dispatch}
								label="Password"
								name="password"
								state={state}
								placeholder="Your Password"
								type="password"
							/>

							{/* <div className={Style.loginReFor}>
								<div className={Style.loginRadio}>
									<input type="radio" />
									<p>Remember me</p>
								</div>
								<div>
									<a className={Style.forgatPassword} href="#">
										Forgot password?
									</a>
								</div>
							</div> */}
							<div className={Style.loginButton}>
								<button type="submit" className={Style.loginBtn}>
									Login
								</button>
							</div>
							<div className={Style.goRegister}>
								<p>
									New here?
									<a
										className={Style.loginGoRLink}
										href="http://localhost:3000/register "
									>
										Register now
									</a>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default LoginForm;
