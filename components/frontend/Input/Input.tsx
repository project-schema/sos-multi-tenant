import { IInput } from '@/types/Ui-Types';
import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';
import style from './Input.module.css';

interface InputProps extends IInput {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
	[key: string]: any; // Allow additional props for react-hook-form
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			type = 'text',
			name,
			label,
			onChange,
			error,
			placeholder,
			value,
			...props
		},
		ref
	) => {
		const [eye, setEye] = useState(false);

		return (
			<div>
				<label className={style.loginLabel} htmlFor={name}>
					{label}
				</label>
				<div className="relative">
					{type === 'password' && (
						<button
							type="button"
							onClick={() => setEye((e) => !e)}
							className={style.eyeIcon}
						>
							{eye ? <EyeOff /> : <Eye />}
						</button>
					)}
					<input
						ref={ref}
						onChange={onChange}
						value={value}
						id={name}
						name={name}
						className={`${style.loginInput} ${error && style.error}`}
						placeholder={placeholder}
						type={eye ? 'text' : type}
						autoComplete="off"
						{...props}
					/>
				</div>
				{error && <span className="text-red-500 text-sm">{error}</span>}
			</div>
		);
	}
);

Input.displayName = 'Input';

export default Input;
