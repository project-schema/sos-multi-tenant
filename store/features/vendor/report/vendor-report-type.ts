import { iPagination } from '@/types';

export type iVendorStockReportResponse = {
	status: number;
	stock_report: iPagination<{
		id: number;
		name: string;
		purchase_price: string;
		stock: string;
		selling_price: string;
		pos_sale_details_sum_qty: null | number;
		purchase_details_sum_qty: null | number;
	}>;
};

export type iVendorSalesReportResponse = {
	status: number;
	sales_report: iPagination<{
		id: number;
		sale_date: string;
		barcode: string;
		customer_id: number;
		total_price: string;
		paid_amount: string;
		due_amount: string;
		customer: {
			id: number;
			customer_name: string;
		};
	}>;
};

export type iVendorDueSalesReportResponse = {
	status: number;
	due_sales_report: iPagination<{
		id: number;
		sale_date: string;
		barcode: string;
		customer_id: number;
		total_price: string;
		paid_amount: string;
		due_amount: string;
		customer: {
			id: number;
			customer_name: string;
		};
	}>;
};

export type iVendorPurchaseReportResponse = {
	status: number;
	purchase_report: iPagination<{
		id: number;
		purchase_date: string;
		chalan_no: string;
		supplier_id: number;
		total_price: string;
		paid_amount: string;
		due_amount: string;
		supplier: {
			id: number;
			supplier_name: string;
		};
	}>;
};

export type iVendorWarehouseReportResponse = {
	status: number;
	warehouse_report: iPagination<{
		id: number;
		warehouse_name: string;
		products: {
			id: number;
			name: string;
			selling_price: string;
			purchase_price: string;
			stock: string;
			warehouse_id: number;
		}[];
	}>;
};

export type iVendorStockShortageReportResponse = {
	status: number;
	stock_shortage_report: iPagination<{
		id: number;
		name: string;
		purchase_price: string;
		alert_qty: number;
		stock: string;
		selling_price: string;
	}>;
};

export type iTopRepeatCustomerReportResponse = {
	status: number;
	top_customers: iPagination<{
		customer_id: number;
		order_count: number;
		customer: {
			id: number;
			customer_name: string;
			customer_id: string;
			email: null;
			phone: string;
			status: string;
		};
	}>;
};

export type iVendorDailySalesResponse = {
	status: number;
	variantSalesReport: iPagination<{
		id: number;
	}>;
};

export type iVendorByProductIdResponse = {
	status: number;
	products: {
		id: number;
		name: string;
	}[];
};
