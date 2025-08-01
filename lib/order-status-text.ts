export const changeOrderStatusText = (status: string) => {
	switch (status) {
		case 'hold':
			return 'Order Hold';
		case 'pending':
			return 'Order Pending';
		case 'cancel':
			return 'Order Cancel';
		case 'received':
			return 'Order Received';
		case 'progress':
			return 'Order Delivery Processing';
		case 'delivered':
			return 'Product Delivered';
		case 'return':
			return 'Product Return';
		case 'processing':
			return 'Product Processing';
		case 'ready':
			return 'Product Ready';
		default:
			return 'Order Hold';
	}
};
