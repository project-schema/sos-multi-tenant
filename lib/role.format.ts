export const roleFormat = (role: string | number) => {
	if (!role) return '';

	if (role === '1' || role === '2' || role === '3' || role === '4') {
		role = Number(role);
	}

	switch (role) {
		case 1:
			return 'Admin';
		case 2:
			return 'Merchant';
		case 3:
			return 'Drop Shipper';
		default:
			return 'User';
	}
};
