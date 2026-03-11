import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { getApiData } from '@/lib';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iOrgTwoType } from '@/types';

export default async function WebAccordion() {
	const data = await getApiData<iOrgTwoType>('/org-two');

	return (
		<Accordion type="single" collapsible>
			{data?.message?.map((item, index) => (
				<MotionFadeIn key={index} delay={index * 0.03}>
					<AccordionItem
						key={index}
						value={`item-${index}`}
						className="md:mb-[33px] mb-[13px] border border-[#0000001d] bg-white   py-3 px-[20px] rounded-[12px] border-l-4 border-l-primary last:border-b"
					>
						<AccordionTrigger className="xl:text-[26px] lg:text-[20px] text-[18px] leading-[28px] text-secondary font-semibold hover:no-underline">
							{item.title}
						</AccordionTrigger>

						<AccordionContent className="text-secondary">
							<p className="text-[18px] leading-[22px] md:mb-[0] my-[17px]">
								{item.description}
							</p>
						</AccordionContent>
					</AccordionItem>
				</MotionFadeIn>
			))}
		</Accordion>
	);
}
