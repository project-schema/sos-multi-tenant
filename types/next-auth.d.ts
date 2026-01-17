import { iAuthUser } from '@/store/features/auth';
import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';
import { TenantType } from './auth-type';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		expires: Date;
		accessToken: string;
		tenant_id: string;
		tenant_type: TenantType;
		user: iAuthUser & DefaultSession['user'];
	}
}

declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		accessToken?: string;
		refreshToken?: string;
		tenant_id?: string;
		tenant_type?: TenantType;
		user?: iAuthUser & DefaultSession['user'];
		iat?: number;
		exp?: number;
		error?: string;
	}
}
