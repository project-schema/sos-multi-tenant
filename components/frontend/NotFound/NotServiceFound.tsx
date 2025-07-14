import Image from 'next/image';
import Link from 'next/link';

export default function NotServiceFound({
	setPage,
	setSearch,
	setSortBy,
	seCategoryId,
	setTags,
}: any) {
	const clearSearch = () => {
		setPage('');
		setSearch('');
		setSortBy('');
		seCategoryId('');
		setTags('');
	};
	return (
		<div className="min-h-[50vh] bg-gray-50 flex items-center">
			<div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
				<div className="w-full lg:w-1/2 mx-8">
					<div className="text-7xl text-green-500 font-dark font-extrabold mb-8">
						{' '}
						404
					</div>
					<p className="text-2xl md:text-3xl font-light leading-normal mb-8">
						Sorry we could not find the Service you are looking for
					</p>

					<Link
						href={'/'}
						className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
					>
						Back to Home
					</Link>
					<button
						onClick={clearSearch}
						className="ml-4 px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-blue-600 active:bg-red-600 hover:bg-blue-700"
					>
						Clear Search
					</button>
				</div>
				<div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
					<Image
						src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
						className=""
						alt="Page not found"
						width={100}
						height={100}
					/>
				</div>
			</div>
		</div>
	);
}
