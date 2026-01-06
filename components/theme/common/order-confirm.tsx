export default function OrderConfirm() {
	return (
		<section className="max-w-xl text-center mx-auto px-4 sm:px-6 lg:px-8 py-10">
			<h3 className="text-2xl font-bold mb-4 text-orange-500">
				🎉 Order Confirmed!
			</h3>
			<p className="text-sm text-gray-800 mb-4">
				Thank you for your purchase! Your payment was successful and your order
				has been placed.
			</p>
			<p className="text-sm text-gray-800 mb-4">
				Order Number: <span className="text-blue-400">#123456</span>
			</p>
		</section>
	);
}
