const freeCouponId = ['1', '5', '9', '13', '17', '21'];
export const checkCoupon = (id: string | number) => {
	if (id) {
		return freeCouponId?.includes(id?.toString());
	}
	return true;
};
