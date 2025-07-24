import {
	Loader1,
	Loader2,
	Loader3,
	Loader4,
	Loader5,
	Loader6,
	Loader7,
	Loader8,
} from '@/components/dashboard/loader';
import { Loader1 as FrontEnd1 } from '@/components/frontend/Loader';

export default function Page() {
	return (
		<div className="flex flex-col gap-4 p-4">
			<h1>Loader </h1>
			<FrontEnd1 />
			<h2>Loader 1</h2>
			<Loader1 />
			<h2>Loader 2</h2>
			<Loader2 />
			<h2>Loader 3</h2>
			<Loader3 />
			<h2>Loader 4</h2>
			<Loader4 />
			<h2>Loader 5</h2>
			<Loader5 />
			<h2>Loader 6</h2>
			<Loader6 />
			<h2>Loader 7</h2>
			<Loader7 />
			<h2>Loader 8</h2>
			<Loader8 />
		</div>
	);
}
