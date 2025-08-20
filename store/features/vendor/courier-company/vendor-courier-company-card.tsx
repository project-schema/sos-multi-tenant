'use client';

import style from './courier.module.css';
import { VendorCourierCompanyCreateModal } from './vendor-courier-company-create-modal';
import { VendorCourierCompanySetDefault } from './vendor-courier-company-set-default';
import { VendorCourierCompanyStatusChange } from './vendor-courier-company-status-change';
import { iVendorCourierCompany } from './vendor-courier-company-type';
import { VendorCourierCompanyUpdateModal } from './vendor-courier-company-update-modal';

type CourierType = 'pathao' | 'redx' | 'steadfast';

interface VendorCourierCardProps {
	type: CourierType;
	data?: iVendorCourierCompany;
}

const courierData: Record<
	CourierType,
	{
		id: string;
		name: string;
		description: string;
		previewClass?: string;
	}
> = {
	pathao: {
		id: 'Courier 1',
		name: 'Patho Courier',
		description: 'Apply Patho Courier in your store',
		previewClass: '', // Default styling
	},
	redx: {
		id: 'Courier 2',
		name: 'Redx Courier',
		description: 'Apply Redx Courier in your store',
		previewClass: 'two',
	},
	steadfast: {
		id: 'Courier 3',
		name: 'Steadfast Courier',
		description: 'Apply Steadfast Courier in your store',
		previewClass: 'three',
	},
};

export const VendorCourierCard = ({ type, data }: VendorCourierCardProps) => {
	const courier = courierData[type];

	return (
		<div className={style['courses-container']}>
			<div className={style.badgePosition}>
				{data?.default === 'no' && (
					<VendorCourierCompanySetDefault data={data} />
				)}
				{data?.default === 'yes' && (
					<span className={style.default}>Default</span>
				)}
				{data && <VendorCourierCompanyStatusChange data={data} />}
			</div>
			<div className={style.course}>
				<div
					className={`${style['course-preview']} ${
						style[courier.previewClass || '']
					}`}
				>
					<h6>{courier.id}</h6>
					<h2>{courier.name}</h2>
					<a href="#">
						View Details About {courier.name}{' '}
						<i className="fas fa-chevron-right"></i>
					</a>
				</div>
				<div className={style['course-info']}>
					<h6>Installation</h6>
					<h2>{courier.description}</h2>
					{data ? (
						<VendorCourierCompanyUpdateModal
							courier_name={type}
							editData={data}
						/>
					) : (
						<VendorCourierCompanyCreateModal courier_name={type} />
					)}
				</div>
				{/* <span className={`${style.btn} ${style['btn-3']}`}>Install</span> */}
			</div>
		</div>
	);
};
