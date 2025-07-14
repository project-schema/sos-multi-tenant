import { ToastPosition, toast } from 'react-toastify';
import Swal, { SweetAlertResult } from 'sweetalert2';
type i_alert = {
	title: string;
	message: string;
};
export function alertSuccess(
	title: string,
	message: string
): Promise<SweetAlertResult<any>> {
	return Swal.fire(title, message, 'success');
}
export function alertError(title: string, message: string, footer?: string) {
	return Swal.fire({
		icon: 'error',
		title: title,
		text: message,
		footer: footer,
		customClass: {
			confirmButton: 'swal-btn-order-1',
			denyButton: 'swal-btn-order-2',
		},
	});
}

export function tostSuccess(
	text: string,
	position = 'top-right' as ToastPosition
) {
	return toast.success(text, {
		position: position,
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: 0,
		theme: 'light',
	});
}

export default function Abc() {
	return <p>Default Fun</p>;
}

type i_swalIcon = 'warning' | 'error' | 'success' | 'info' | 'question';

export const popUpAlert = async (
	title: string,
	text: string,
	icon: i_swalIcon,
	cb: Function
) => {
	return Swal.fire({
		title: title,
		text: text,
		icon: icon,
		showDenyButton: true,
		// showCancelButton: true,
		denyButtonText: `Cancel`,
		confirmButtonText: 'Ok',
		customClass: {
			confirmButton: 'swal-btn-order-1',
			denyButton: 'swal-btn-order-2',
		},
	}).then((result) => {
		if (result.isConfirmed) {
			cb();
		}
	});
};
