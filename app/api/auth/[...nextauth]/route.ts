import NextAuth, { User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type UserType = {
	email: string;
	name: string;
	phone: string;
	status: any;
};
// Define the extended user type
interface CustomUser extends NextAuthUser {
	accessToken?: string;
	refreshToken?: string;
	user: UserType;
}

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				token: {},
			},
			async authorize(credentials) {
				if (credentials?.token) {
					const parsedToken = JSON.parse(credentials.token);

					console.log(parsedToken, 'credentials');
					return {
						id: parsedToken.data.user.email,
						accessToken: parsedToken.data.accessToken,
						refreshToken: '', // Set this if you have a refresh token
						user: parsedToken.data.user,
					};
				}
				return null;
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				// Set the initial token properties on login
				return {
					...token,
					accessToken: (user as CustomUser).accessToken,
					refreshToken: (user as CustomUser).refreshToken,
					user: (user as CustomUser).user,
				};
			}

			// Return the token if it already exists
			return {
				...token,
				accessToken: token.accessToken,
				refreshToken: token.refreshToken,
				user: token.user,
			};
		},
		async session({ session, token }) {
			// Map token properties to session
			session.accessToken = token.accessToken as string;
			session.refreshToken = token.refreshToken as string;
			session.user = token.user as UserType;

			return session;
		},
	},
});

export { handler as GET, handler as POST };
