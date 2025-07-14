import style from './heading.module.css';

function Heading({
	h1,
	p,
	center = 'center',
}: {
	h1: string;
	p: string;
	center?: 'center' | 'left';
}) {
	return (
		<>
			<h1
				className={`${style.h1} ${
					center === 'center' ? 'text-center' : 'text-left'
				}`}
			>
				{h1}
			</h1>
			<p
				className={`${style.p} ${
					center === 'center' ? 'text-center' : 'text-left'
				}`}
			>
				{p}
			</p>
		</>
	);
}

export default Heading;
