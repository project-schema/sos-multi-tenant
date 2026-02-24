import { imageFormat } from '@/lib';
import { iService } from '@/store/features/vendor/cms/home-page';

export default function Card06({ services }: { services: iService[] }) {
	return (
		<div className="w-full bg-white py-6 sm:py-4 px-4 sm:px-6 lg:px-8">
			<div className="max-w-[1720px] mx-auto border border-gray-200 rounded-lg px-4 py-2">
				<div className=" flex  flex-row flex-wrap items-center 2xl:justify-between justify-center">
					{services.map((service, index) => {
						return (
							<div
								key={index}
								className=" sm:pr-10 2xl:not-last:border-r not-last:border-gray-200 py-3 lg:py-4 2xl:py-9"
							>
								<div className="flex-col sm:flex-row flex items-center gap-2 sm:gap-4 px-4 sm:px-6   w-full sm:w-auto justify-center sm:justify-start text-center sm:text-left">
									<div className="flex-shrink-0">
										<img
											src={imageFormat(service?.icon ?? null)}
											alt={service?.title ?? ''}
											className="w-10 h-10 object-cover"
										/>
									</div>
									<div className="flex flex-col">
										<h3 className="text-sm md:text-base font-bold text-gray-900 mb-1">
											{service.title}
										</h3>
										<p className="text-xs sm:text-sm text-gray-600 font-normal">
											{service.description}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
