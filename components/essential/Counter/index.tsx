'use client';
import { iSettingsType } from '@/types';
import { motion } from 'motion/react';
import style from './counter.module.css';

function Counter({ settings }: { settings: iSettingsType }) {
	const data = settings.message;

	return (
		<div className={style.counter}>
			<div className={style.counterContent}>
				{[
					{ count: data.count_one, title: data.one_title, delay: 0.2 },
					{ count: data.count_two, title: data.count_two_title, delay: 0.25 },
					{
						count: data.count_three,
						title: data.count_three_title,
						delay: 0.3,
					},
					{ count: data.count_four, title: data.count_four_title, delay: 0.35 },
				].map((item, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0 }}
						whileInView={{
							opacity: 1,
							transition: {
								duration: 0.5,
								delay: item.delay,
							},
						}}
						viewport={{ once: true, amount: 0.2 }}
						className={style.items}
					>
						<h6 className={style.h1}>{item.count}</h6>
						<p className={style.p}>{item.title}</p>
					</motion.div>
				))}
			</div>
		</div>
	);
}

export default Counter;
