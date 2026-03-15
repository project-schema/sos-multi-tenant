'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type Props = {
	children: React.ReactNode;
};

export function SmoothScrollPage({ children }: Props) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [contentHeight, setContentHeight] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	const { scrollY } = useScroll();

	const smoothY = useSpring(scrollY, {
		damping: 20,
		stiffness: 100,
		mass: 0.5,
	});

	const y = useTransform(smoothY, (v) => -v);

	// detect mobile
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	useLayoutEffect(() => {
		if (scrollRef.current) {
			setContentHeight(scrollRef.current.getBoundingClientRect().height);
		}
	}, [children]);

	// disable smooth scroll on mobile
	if (isMobile) {
		return <>{children}</>;
	}

	return (
		<>
			<div style={{ height: contentHeight }} />

			<motion.div
				ref={scrollRef}
				style={{
					y,
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
				}}
			>
				{children}
			</motion.div>
		</>
	);
}
