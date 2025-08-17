export interface iTenantRegister {
	company_name: string;
	domain: string;
	email: string;
	owner_name: string;
}

export interface iTenantRegisterResponse {
	success: boolean;
	message: string;
	data: iTenantRegister & {
		tenant_id: string;
		domain_url: string;
	};
}

export interface iAuthRegister {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

export interface iAuthLogin {
	email: string;
	password: string;
}

export interface iAuthRegisterResponse {
	success: boolean;
	message: string;
	data: iAuthRegister;
}

export interface iAuthLoginResponse {
	success: boolean;
	message: string;
	data: {
		user: {
			id: number;
			name: string;
			email: string;
			last_seen: string;
		};
		token: string;
		tenant_id: string;
	};
}
