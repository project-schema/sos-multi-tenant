export interface iOrder {
	id: number;
	order_id: string;
	total: number;
	status: 'pending' | 'processing' | 'completed' | 'cancelled';
	payment_status: 'paid' | 'unpaid' | 'partial';
	created_at: string;
	updated_at: string;
	// Add other order fields as needed
}

export interface iOrderStatistics {
	all_order: number;
	pending_order: number;
	processing_order: number;
	completed_order: number;
	cancelled_order: number;
}

export interface iOrderResponse {
	orders: iOrder[];
	all_order: number;
	pending_order: number;
	processing_order: number;
	completed_order: number;
	cancelled_order: number;
}
