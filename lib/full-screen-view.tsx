'use client';

import { Button } from '@/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Maximize, Minimize } from 'lucide-react';
import { useEffect, useState } from 'react';

export function FullscreenButton() {
	const [isFullscreen, setIsFullscreen] = useState(false);

	useEffect(() => {
		const handleChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener('fullscreenchange', handleChange);

		return () => {
			document.removeEventListener('fullscreenchange', handleChange);
		};
	}, []);

	const toggleFullscreen = async () => {
		if (!document.fullscreenElement) {
			await document.documentElement.requestFullscreen();
		} else {
			await document.exitFullscreen();
		}
	};

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant="ghost" size="icon" onClick={toggleFullscreen}>
						{isFullscreen ? (
							<Minimize className="h-4 w-4" />
						) : (
							<Maximize className="h-4 w-4" />
						)}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					{isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
