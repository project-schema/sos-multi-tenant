import { imageFormat } from '@/lib';
import { iVendorBrand } from '@/store/features';

export default function Card09({ data }: { data: iVendorBrand }) {
	return (
		<div className="flex items-center gap-6">
			<div className="max-w-[150px] w-full h-[150px] relative">
				<img
					src={imageFormat(data.image)}
					alt="image"
					className="object-cover rounded-full object-center bg-gray-200"
				/>
			</div>
			<div>
				<h3 className="fs-28 text-primary3 mb-3 font-medium font-montserrat">
					{data.name}
				</h3>
				{data.description && (
					<p className="fs-14 text-gray-500  ">{data.description}</p>
				)}
			</div>
		</div>
	);
}
