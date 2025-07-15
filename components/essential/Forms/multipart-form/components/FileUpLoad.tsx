import { HiOutlineUpload } from 'react-icons/hi';
import style from './styles/fileUpLoad.module.css';
import { AppDispatch, AppState, i_file } from '../action/type';
interface IFileType {
	state: AppState;
	dispatch: AppDispatch;
	name: string;
	error: string;
	label: string;
}
function FileUpLoad({ state, dispatch, name, error, label }: IFileType) {
	return (
		<div className={style.adSetFlexColumn}>
			<label className={style.adSetLabel}>
				{label}
				{error && <span className="text-sm text-red-500">{error}</span>}
			</label>
			<div className={style.adSetImgUploadBox}>
				<h1 className={style.adSetImgUpload}>
					Upload <HiOutlineUpload className={style.adSetImgUploadIcon} />
				</h1>

				<p className={style.adSetImgUploadLimit}>
					Image upload Max <span className={style.adSetImgUploadSpan}>1Mb</span>
				</p>
				{/* {state.level2[`${name}_url`] && (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						className={style.view_url}
						src={state.level2[`${name}_url`]}
						alt="view url"
					/>
				)} */}
				<input
					onChange={(e) =>
						dispatch({
							type: 'FILE',
							payload: {
								name: name as i_file,
								value: e.target.files as any,
								url: (name + '_url') as i_file,
								id: state.level2.advertise_audience_files.length,
							},
						})
					}
					className={style.adSetInputFileField}
					type="file"
					name=""
					id=""
					multiple
					accept=".jpg,.png,.jpeg"
				/>
			</div>
		</div>
	);
}

export default FileUpLoad;
