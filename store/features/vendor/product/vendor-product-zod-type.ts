import z from 'zod';

const SpecItemSchema = z.object({
	question: z
		.string({ error: 'Question is required' })
		.min(1, 'Question is required'),
	answer: z
		.string({ error: 'Answer is required' })
		.min(1, 'Answer is required'),
});

const SellingDetailSchema = z.object({
	min_bulk_qty: z
		.number({ error: 'Min bulk qty is required' })
		.min(0, { message: 'Min bulk qty must be at least 0' })
		.max(10000000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Min bulk qty must be a number',
		})
		.optional(),
	min_bulk_price: z
		.number({ error: 'Min bulk price is required' })
		.min(0, { message: 'Min bulk price must be at least 0' })
		.max(10000000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Min bulk price must be a number',
		})
		.optional(),
	bulk_commission: z
		.number({ error: 'Bulk commission is required' })
		.min(0, { message: 'Bulk commission must be at least 0' })
		.max(10000000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Bulk commission must be a number',
		})
		.optional(),
	bulk_commission_type: z.enum(['flat', 'percent']).optional(),
	advance_payment_type: z.enum(['flat', 'percent']).optional(),
	advance_payment: z
		.number({ error: 'Advance payment is required' })
		.min(0, { message: 'Advance payment must be at least 0' })
		.max(10000000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Advance payment must be a number',
		})
		.optional(),
});

export const VendorProductCreateSchema = z
	.object({
		market_place_brand_id: z.string({ error: 'Brand is required' }).optional(),
		market_place_category_id: z
			.string({ error: 'Category is required' })
			.optional(),
		market_place_subcategory_id: z
			.string({ error: 'Subcategory is required' })
			.optional(),

		image: z.instanceof(File).optional(),
		images: z.array(z.instanceof(File)).optional(),
		name: z
			.string({ error: 'Product name is required' })
			.trim()
			.min(1, 'Product name is required'),
		brand_id: z
			.string({ error: 'Brand is required' })
			.min(1, 'Brand is required'),
		category_id: z
			.string({ error: 'Category is required' })
			.min(1, 'Category is required'),
		subcategory_id: z.string({ error: 'Subcategory is required' }),
		supplier_id: z
			.string({ error: 'Supplier is required' })
			.min(1, 'Supplier is required'),
		warehouse_id: z
			.string({ error: 'Warehouse is required' })
			.min(1, 'Warehouse is required'),

		original_price: z
			.number({ error: 'Original price is required' })
			.min(1, { message: 'Original price must be at least 1' })
			.max(10000000000, { message: 'Too long' })
			.refine((val) => !isNaN(val), {
				message: 'Original price must be a number',
			}),
		selling_price: z
			.number({ error: 'Selling price is required' })
			.min(1, { message: 'Selling price must be at least 1' })
			.max(10000000000, { message: 'Too long' })
			.refine((val) => !isNaN(val), {
				message: 'Selling price must be a number',
			}),
		discount_price: z
			.number({ error: 'Discount price is required' })
			.min(0, { message: 'Discount price must be at least 0' })
			.max(10000000000, { message: 'Too long' })
			.optional(),
		alert_qty: z
			.number({ error: 'Alert quantity is required' })
			.min(1, { message: 'Alert quantity must be at least 1' })
			.max(10000000000, { message: 'Too long' })
			.refine((val) => !isNaN(val), {
				message: 'Alert quantity must be a number',
			}),

		sku: z.string({ error: 'SKU is required' }),
		warranty: z.string({ error: 'Warranty is required' }),
		exp_date: z.date({ error: 'Expire Date is required' }),

		short_description: z.string().optional(),
		long_description: z.string().optional(),

		// dynamic arrays
		specifications: z.array(SpecItemSchema),
		selling_details: z.array(SellingDetailSchema).optional(),
		// feature toggles
		is_feature: z.number().int().nullable().optional(),
		pre_order: z.number().int().nullable().optional(),
		is_affiliate: z.boolean().optional(),
		selling_type: z.enum(['single', 'bulk', 'both']).optional(),
		is_connect_bulk_single: z.boolean().optional(),
		// global advance
		single_advance_payment_type: z.enum(['flat', 'percent']).optional(),
		advance_payment: z
			.number({ error: 'Advance payment is required' })
			.min(0, { message: 'Advance payment must be at least 0' })
			.max(1000000, { message: 'Too long' })
			.refine((val) => !isNaN(val), {
				message: 'Advance payment must be a number',
			}),

		// global discount/commission
		discount_type: z.enum(['flat', 'percent']).optional(),
		discount_rate: z
			.number({ error: 'Discount rate is required' })
			.min(0, { message: 'Discount rate must be at least 0' })
			.max(1000000, { message: 'Too long' })
			.refine((val) => !isNaN(val), {
				message: 'Discount rate must be a number',
			}),
	})
	.refine((data) => {
		// Validation for selling_type specific requirements
		if (data.selling_type === 'single' || data.selling_type === 'both') {
			if (!data.advance_payment && data.advance_payment !== 0) {
				return false;
			}
			if (!data.single_advance_payment_type) {
				return false;
			}
			if (!data.discount_rate && data.discount_rate !== 0) {
				return false;
			}
			if (!data.discount_type) {
				return false;
			}
		}

		if (data.selling_type === 'bulk' || data.selling_type === 'both') {
			if (!data.selling_details || data.selling_details.length === 0) {
				return false;
			}
		}

		return true;
	})
	.refine(
		(data) => {
			// Validate that selling_price is not greater than original_price
			if (data.selling_price < data.original_price) {
				return false;
			}
			return true;
		},
		{
			message: 'Selling price cannot be less than original price',
			path: ['selling_price'],
		}
	)
	.refine(
		(data) => {
			if (data.discount_price !== undefined && data.discount_price !== null) {
				return (
					data.discount_price >= data.original_price &&
					data.discount_price <= data.selling_price
				);
			}
			return true;
		},
		{
			message:
				'Discount price must be between original price and selling price',
			path: ['discount_price'],
		}
	)

	.refine(
		(data) => {
			// Validate specifications array is not empty
			if (!data.specifications || data.specifications.length === 0) {
				return false;
			}
			return true;
		},
		{
			message: 'At least one specification is required',
			path: ['specifications'],
		}
	);

export type VendorProductCreateZod = z.infer<typeof VendorProductCreateSchema>;

export const VendorProductCreateData = (values: VendorProductCreateZod) => {
	let data = {
		name: values.name,

		brand_id: values.brand_id,
		category_id: values.category_id,
		subcategory_id: values.subcategory_id,

		selling_price: values.selling_price,
		original_price: values.original_price,
		discount_price: values.discount_price,

		alert_qty: values.alert_qty,
		supplier_id: values.supplier_id,
		warehouse_id: values.warehouse_id,

		exp_date: values.exp_date,

		sku: values.sku,
		warranty: values.warranty,

		short_description: values.short_description,
		long_description: values.long_description,

		specification: values.specifications?.map((e) => e.question),
		specification_ans: values.specifications?.map((e) => e.answer),

		is_feature: values.is_feature ? '1' : '0',

		meta_title: '',
		meta_keyword: '',
		meta_description: '',

		image: values.image,
		images: values.images?.map((e) => e),
		is_affiliate: values.is_affiliate ? '1' : '0',
		qty: 0,
		pre_order: values.pre_order ? '1' : '0',
		is_connect_bulk_single: 1,
	};
	let single = {
		selling_type: values.selling_type,
		advance_payment: values.advance_payment,
		single_advance_payment_type: values.single_advance_payment_type,
		discount_rate: values.discount_rate,
		discount_type: values.discount_type,
	};
	let bulk = {
		selling_type: values.selling_type,
		selling_details: values.selling_details,
	};
	let both = {
		selling_type: values.selling_type,
		advance_payment: values.advance_payment,
		single_advance_payment_type: values.single_advance_payment_type,
		discount_rate: values.discount_rate,
		discount_type: values.discount_type,
		selling_details: values.selling_details,
		is_connect_bulk_single: values.is_connect_bulk_single ? '0' : '1',
	};

	let market_place = {
		market_place_brand_id: values.market_place_brand_id ?? undefined,
		market_place_category_id: values.market_place_category_id ?? undefined,
		market_place_subcategory_id:
			values.market_place_subcategory_id ?? undefined,
	};

	if (data.pre_order.toString() === '1') {
		return {
			...data,
		};
	}

	if (data.is_affiliate.toString() === '1') {
		if (values.selling_type === 'both') {
			return {
				...data,
				...both,
				...market_place,
			};
		} else if (values.selling_type === 'bulk') {
			return {
				...data,
				...bulk,
				...market_place,
			};
		} else {
			return {
				...data,
				...single,
				...market_place,
			};
		}
	}
};
