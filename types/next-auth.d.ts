import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		expires: Date;
		accessToken: string;
		tenant_id: string;
		tenant_type: 'admin' | 'merchant' | 'dropshipper';
		user: {
			id: number;
			name: string;
			email: string;
			last_seen: string;
		} & DefaultSession['user'];
	}
}

import 'next-auth/jwt';

declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		accessToken?: string;
		refreshToken?: string;
		tenant_id?: string;
		tenant_type?: 'admin' | 'merchant' | 'dropshipper';
		user?: {
			id: number;
			name: string;
			email: string;
			last_seen: string;
		};
		iat?: number;
		exp?: number;
		error?: string;
	}
}
