import { iService } from '@/store/features/admin/cms/service/admin-service.type';

export const FeatureCard1 = ({ icon, title, description }: iService) => {
	return (
		<article
			className="feature--card bg-white rounded-[26px] pt-[34px] pr-[34px] pl-[34px] pb-[0px]"
			data-aos="fade-up"
			data-aos-duration="600"
		>
			<div className="flex flex-col justify-start items-start">
				{title && (
					<h3 className="mb-[14px] text-[28px] leading-[30px] text-secondary text-start font-semibold">
						{title}
					</h3>
				)}
				{description && (
					<p className="text-start text-[#969696] text-[16px] leading-[20px] md:mb-[43px] mb-[25px] paragraph">
						{description}
					</p>
				)}
			</div>

			<div
				className="w-full 
                      md:h-[210px]
                      shrink-0 
                      feature--thumb"
			>
				<img
					src="https://i.ibb.co.com/39knZFzD/f-1.png"
					alt="..."
					width="424"
					height="282"
					className="w-full h-full object-cover transition-transform duration-500 linear group-hover:scale-110"
				/>
			</div>
		</article>
	);
};
