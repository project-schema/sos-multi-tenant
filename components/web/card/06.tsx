import { imageFormat } from '@/lib';
import { iService } from '@/store/features/vendor/cms/home-page';

export default function Card06({ services }: { services: iService[] }) {
	return (
		<div className="w-full bg-white py-6 sm:py-4 px-4 sm:px-6 lg:px-8">
			<div className="max-w-[1720px] mx-auto border border-gray-200 rounded-lg px-4 py-2">
				<div className="flex  flex-row flex-wrap items-center 2xl:justify-between justify-center">
					{services.map((service, index) => {
						return (
							<div
								key={index}
								className=" pr-10 2xl:not-last:border-r not-last:border-gray-200 py-9"
							>
								<div className="flex items-center gap-4 px-4 sm:px-6 py-4 sm:py-0 w-full sm:w-auto justify-center sm:justify-start">
									<div className="flex-shrink-0">
										<img
											src={imageFormat(service?.icon ?? null)}
											alt={service?.title ?? ''}
											className="w-10 h-10 object-cover"
										/>
									</div>
									<div className="flex flex-col">
										<h3 className="text-base font-bold text-gray-900 mb-1">
											{service.title}
										</h3>
										<p className="text-sm text-gray-600 font-normal">
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
