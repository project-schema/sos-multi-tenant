'use client';
import style from './progressbar.module.css';
export function AdvertiserFormProgressbar({
	currentStep,
}: {
	currentStep: number;
}) {
	return (
		<div className={style.itemsSuccessBox}>
			<Progressbar
				line={true}
				text="Objective"
				value="1"
				active={currentStep >= 1}
			/>
			<Progressbar
				line={true}
				text="Ad Set"
				value="2"
				active={currentStep >= 2}
			/>
			<Progressbar
				line={false}
				text="Create Ad"
				value="3"
				active={currentStep >= 3}
			/>
		</div>
	);
}

function Progressbar({
	value,
	text,
	line,
	active,
}: {
	value: string;
	text: string;
	line: boolean;
	active?: boolean;
}) {
	return (
		<div className={`${style.item} ${active && style.init}`}>
			<span className={style.num}>{value}</span>
			<span className={style.title}>{text}</span>
			{line && <span className={style.line}></span>}
		</div>
	);
}
