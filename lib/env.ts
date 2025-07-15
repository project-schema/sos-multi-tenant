export const env = {
	production: process.env.NODE_ENV === 'production',
	development: process.env.NODE_ENV === 'development',
	baseAPI: process.env.NEXT_PUBLIC_BACKEND_API as string,
	next_auth_url: process.env.NEXTAUTH_URL,
};

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const DASHBOARD_URL =
	process.env.NODE_ENV === 'production'
		? process.env.NEXT_PUBLIC_DASHBOARD_URL
		: 'http://localhost:3001';

export const DOMAIN_URL =
	process.env.NODE_ENV === 'production'
		? process.env.NEXT_PUBLIC_DOMAIN_URL
		: 'localhost';

export const PROFILE_PAGE = (role: string, subscription: any, router: any) => {
	switch (role) {
		case '1':
			return (window.location.href = DASHBOARD_URL + `/admin/profile`);
		case '2':
			if (subscription) {
				return (window.location.href =
					DASHBOARD_URL + `/vendors-dashboard/profile`);
			}

			return;
		case '3':
			if (subscription) {
				return (window.location.href =
					DASHBOARD_URL + `/affiliates-dashboard/profile`);
			}

			return;
		case '4':
			return (window.location.href =
				DASHBOARD_URL + `/users-dashboard/profile`);

		default:
			return (window.location.href = DASHBOARD_URL as string);
	}
};

export const DASHBOARD_PAGE = (
	role: string,
	subscription?: any,
	router?: any,
	admin?: boolean
) => {
	switch (role) {
		case '1':
			if (admin) {
				return (window.location.href = DASHBOARD_URL + `/admin`);
			}
			return (window.location.href = DASHBOARD_URL as string);
		case '2':
			if (subscription) {
				return (window.location.href = DASHBOARD_URL + `/vendors-dashboard`);
			}

			return;
		case '3':
			if (subscription) {
				return (window.location.href = DASHBOARD_URL + `/affiliates-dashboard`);
			}

			return;

		case '4':
			return (window.location.href = DASHBOARD_URL + `/users-dashboard`);

		default:
			return (window.location.href = DASHBOARD_URL as string);
	}
};
