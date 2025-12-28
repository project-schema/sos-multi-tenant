export const sellingTypeCalculate = ({
	selling_type,
	discount_rate,
	discount_type,
	cart_qty,
}: {
	selling_type: string;
	discount_rate: string;
	discount_type: string;
	cart_qty: number;
}) => {
	if (selling_type === 'single') {
		if (discount_type === 'flat') {
			return Number(discount_rate) * Number(cart_qty);
		}
		if (discount_type === 'percent') {
			return (Number(discount_rate) / 100) * Number(cart_qty);
		}
	}
};
