import NextAuth, { User as NextAuthUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

// Define the user type based on the API response
type UserType = {
	id: number;
	name: string;
	email: string;
	last_seen: string;
};

// Define the token response type matching iAuthLoginResponse
type TokenResponse = {
	user: UserType;
	token: string;
	tenant_id: string;
	tenant_type: 'admin' | 'merchant' | 'dropshipper';
};

// Define the extended user type
interface CustomUser extends NextAuthUser {
	accessToken?: string;
	refreshToken?: string;
	user: UserType;
	tenant_id: string;
	tenant_type: 'admin' | 'merchant' | 'dropshipper';
}

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				token: {},
			},
			async authorize(credentials) {
				if (!credentials?.token) {
					return null;
				}

				try {
					const parsedToken: TokenResponse = JSON.parse(credentials.token);

					console.log(parsedToken);
					// Validate the token structure
					if (
						!parsedToken.user ||
						!parsedToken.token ||
						!parsedToken.tenant_id
					) {
						console.error('Invalid token structure:', parsedToken);
						return null;
					}

					// Return the user object with all necessary data
					return {
						id: parsedToken.user.id.toString(),
						email: parsedToken.user.email,
						name: parsedToken.user.name,
						accessToken: parsedToken.token,
						refreshToken: '', // Set this if you have a refresh token
						user: parsedToken.user,
						tenant_id: parsedToken.tenant_id,
						tenant_type: parsedToken.tenant_type,
					};
				} catch (error) {
					console.error('Error parsing token:', error);
					return null;
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 24 * 60 * 60, // 24 hours
		updateAge: 60 * 60, // 1 hour
	},
	jwt: {
		maxAge: 24 * 60 * 60, // 24 hours
	},
	callbacks: {
		async jwt({ token, user, account }) {
			// Initial sign in
			if (account && user) {
				const customUser = user as CustomUser;
				return {
					...token,
					accessToken: customUser.accessToken,
					refreshToken: customUser.refreshToken,
					user: customUser.user,
					tenant_id: customUser.tenant_id,
					tenant_type: customUser.tenant_type,
					iat: Math.floor(Date.now() / 1000),
					exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
				};
			}

			// Return previous token if the access token has not expired
			if (Date.now() < (token.exp as number) * 1000) {
				return {
					...token,
					accessToken: token.accessToken,
					refreshToken: token.refreshToken,
					user: token.user,
					tenant_id: token.tenant_id,
					tenant_type: token.tenant_type,
					iat: Math.floor(Date.now() / 1000),
					exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
				};
			}

			// Access token has expired, try to update it
			return await refreshAccessToken(token);
		},
		async session({ session, token }) {
			// Send properties to the client
			session.accessToken = token.accessToken as string;
			session.user = {
				...session.user,
				...token.user,
			} as any;
			session.tenant_id = token.tenant_id as string;
			session.tenant_type = token.tenant_type as
				| 'admin'
				| 'merchant'
				| 'dropshipper';

			return session;
		},
	},
	pages: {
		signIn: '/auth',
		error: '/auth',
	},
	debug: process.env.NODE_ENV === 'development',
});

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
	try {
		// Here you would typically make a request to your refresh token endpoint
		// For now, we'll just return the existing token
		// You can implement refresh token logic here when needed

		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	} catch (error) {
		console.error('Error refreshing access token:', error);

		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	}
}

export { handler as GET, handler as POST };
