export type iVendorPurchase = {
	status: number;
	data: {
		supplier: {
			id: number;
			supplier_name: string;
			business_name: string;
		}[];
		unit: {
			id: number;
			unit_name: string;
		}[];
		color: {
			id: number;
			name: string;
		}[];
		variation: {
			id: number;
			name: string;
		}[];
		payment_method: {
			id: number;
			payment_method_name: string;
			acc_no: string;
		}[];
	};
	chalan_no: string;
};
export type iVendorPurchaseResponse = {
	status: 200;
	customers: iVendorPurchase[];
};
export type VendorPurchaseCreateData = {
	status: number;
	data: {
		supplier: {
			id: number;
			supplier_name: string;
			business_name: string;
		}[];
		unit: {
			id: number;
			unit_name: string;
		}[];
		color: {
			id: number;
			name: string;
		}[];
		variation: {
			id: number;
			name: string;
		}[];
		payment_method: {
			id: number;
			payment_method_name: string;
			acc_no: string;
		}[];
	};
	chalan_no: string;
};

const submitDataExample = {
	supplier_id: 2,
	purchase_date: '20-08-2025',
	chalan_no: '52775',
	payment_id: 3,
	total_qty: 20,
	purchase_discount: 0,
	total_price: 5220,
	paid_amount: 0,
	due_amount: 5220,
	status: 'ordered',
	product_id: [325, 318],
	unit_id: [2, 29],
	color_id: [137, 137],
	size_id: [154, 156],
	qty: [10, 10],
	rate: [22, 500],
	sub_total: [220, 5000],
};
