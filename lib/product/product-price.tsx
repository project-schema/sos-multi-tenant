export const productPrice = ({
	selling_price,
	discount_price,
}: {
	selling_price: number | string;
	discount_price: number | string;
}) => {
	if (discount_price) {
		return Number(discount_price);
	}
	return Number(selling_price);
};
