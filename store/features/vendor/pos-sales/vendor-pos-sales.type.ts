export type iVendorPosSalesResponse = {
	data: {
		resource: {
			id: number;
			name: string;
		}[];
		customer: {
			id: number;
			customer_name: string;
			phone: string;
			email: string;
			address: string;
		}[];
		brand: {
			id: number;
			name: string;
		}[];
		category: {
			id: number;
			name: string;
			subcategory: {
				id: number;
				name: string;
				category_id: number;
			}[];
		}[];
		payment_methods: {
			id: number;
			payment_method_name: string;
		}[];
	};
	status: number;
	barcode: string;
	video: string;
	products: {
		id: number;
		category_id: number;
		brand_id: number;
		image: string;
		is_feature: number;
		name: string;
		slug: string;
		sku: string;
		selling_price: string;
	}[];
};

export type iVendorPosSalesProductDetailsResponse = {
	status: number;
	product: {
		id: number;
		category_id: number;
		brand_id: number;
		name: string;
		slug: string;
		sku: string;
		discount_price: string;
		discount_percentage: string;
		selling_price: string;
		product_variant: {
			id: number;
			product_id: number;
			unit_id: number;
			size_id: number;
			color_id: number;
			qty: number;
			product: {
				id: number;
				name: string;
				sku: string;
				selling_price: string;
			};
			color: {
				id: number;
				name: string;
			};
			size: {
				id: number;
				name: string;
			};
			unit: {
				id: number;
				unit_name: string;
			};
		}[];
	};
};
