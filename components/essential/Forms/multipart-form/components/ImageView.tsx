/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { AppDispatch, AppState, i_file } from '../action/type';
import style from './styles/fileUpLoad.module.css';

interface IFileType {
	state: AppState;
	dispatch: AppDispatch;
	name: i_file;
}
function ImageView({ dispatch, state, name }: IFileType) {
 	return (
		<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
			{state?.level2?.[(name + '_url') as i_file]?.map((e) => (
				<div key={e.id} className="relative">
					<span
						onClick={() =>
							dispatch({
								type: 'DELETE_IMAGE',
								payload: {
									id: e.id,
									name: name,
									url: (name + '_url') as i_file,
								},
							})
						}
						className="px-2 absolute right-0 top-0 z-10 bg-red-600 text-white cursor-pointer"
					>
						Delete
					</span>
					<img
						className={`w-full h-full object-cover rounded-md shadow`}
						src={e.url}
						alt="view url"
					/>
				</div>
			))}
		</div>
	);
}

export default ImageView;
