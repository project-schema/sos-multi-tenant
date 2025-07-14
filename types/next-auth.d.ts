import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		expires: Date;
		user: {
			/** The user's postal address. */
			username: string;
			user_status: string;
			token: string;
			role: string;
			message: string;
			is_subscription: string | null;
			is_employee: string | null;

			// address: string;
		} & DefaultSession['user'];
	}
}

import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		username: string;
		user_status: string;
		token: string;
		role: string;
		is_subscription: string | null;
		message: string;
		is_employee: string;
	}
}
