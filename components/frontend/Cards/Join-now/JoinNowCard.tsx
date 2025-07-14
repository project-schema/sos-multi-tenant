import React from 'react';

export function JoinNowCard({
	text,
	details,
	bg,
}: {
	text: string;
	details: string;
	bg: string;
}) {
	return (
		<div
			className={`relative flex w-96 flex-col rounded-xl  bg-clip-border text-white shadow-md  bg-${bg}-500`}
		>
			<div className="p-6">
				<h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
					Join As a {text}
				</h5>
				<p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
					{details}
				</p>
			</div>
			<div className="p-6 pt-0">
				<button
					className={`select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-${bg}-50 transition-all hover:shadow-lg hover:shadow-${bg}-500/10 focus:opacity-[0.85]   active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none  bg-${bg}-700`}
					type="button"
					data-ripple-light="true"
				>
					Join Now
				</button>
			</div>
		</div>
	);
}
