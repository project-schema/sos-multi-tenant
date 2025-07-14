import { ICON } from '@/lib/img';
import style from './PricingCard.module.css';

function ExtraFeature({ data, text }: { data: string; text: string }) {
	return (
		data && (
			<div className={style.items}>
				<ICON.checkBox className={`${style.features_ico} ${style.active}`} />
				<span className={`${style.features_item} ${style.active}`}>{text}</span>
				<span className={`${style.features_item} ${style.active}`}>{data}</span>
			</div>
		)
	);
}

export default ExtraFeature;
