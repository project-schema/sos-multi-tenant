import style from './Contact.style.module.css';
import { useReducer, useState } from 'react';
import {
	reducer,
	initialState,
} from '@/components/reducer-actions/contact-action';
import Loader from '@/components/ui/Loader/Loader';
import { alertSuccess } from '@/components/ui/alert';
import ContactContent from './ContactContent';
import { motion } from 'framer-motion';
import { BASE_URL } from '@/lib/env';

const Contact = ({ data }: any) => {
	const [loading, setLoading] = useState(false);

	const [state, dispatch] = useReducer(reducer, initialState);

	const handleSubmitData = (e: any) => {
		e.preventDefault();
		setLoading(true);
		const form = e.target;
		submitDataServer(form);
	};
	const submitDataServer = async (form: any) => {
		const res = await fetch(BASE_URL + '/api/contact-store', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(state?.data),
		});
		const data = await res.json();
		if (data?.status === 400) {
			const errors = data?.errors;
			const validationError = {
				first_name: errors['first_name'] ? errors['first_name'] : null,
				last_name: errors['last_name'] ? errors['last_name'] : null,
				email: errors['email'] ? errors['email'] : null,
				number: errors['number'] ? errors['number'] : null,
				message: errors['message'] ? errors['message'] : null,
			};
			dispatch({
				type: 'VALIDATION_ERROR',
				payload: validationError,
			});
			setLoading(false);
			return;
		}
		if (data?.status === 200) {
			alertSuccess('Yes!', data?.message);
			form.reset();
			setLoading(false);
		}
	};
	return (
		<div className={style.contactSection}>
			<div className="layout">
				<div className={style.contact}>
					<ContactContent data={data.message} />
					<div className={style.rightForm}>
						<form onSubmit={handleSubmitData}>
							<div className={style.firstField}>
								<motion.div
									initial={{ y: 50, opacity: 0 }}
									whileInView={{
										y: 0,
										opacity: 1,
										transition: {
											delay: 0.14,
											duration: 0.3,
										},
									}}
									className={style.middleGap}
								>
									<label className={style.userName}>First Name</label>
									<p style={{ color: 'red', fontSize: '12px' }}>
										{state?.apiRes?.first_name
											? state?.apiRes?.first_name
											: null}
									</p>
									<input
										className={style.inputField}
										type="text"
										name="first_name"
										id=""
										placeholder="Ex: Rifat"
										onChange={(e) => {
											dispatch({
												type: 'INPUT',
												payload: { name: e.target.name, value: e.target.value },
											});
										}}
									/>
								</motion.div>
								<motion.div
									initial={{ y: 50, opacity: 0 }}
									whileInView={{
										y: 0,
										opacity: 1,
										transition: {
											delay: 0.14,
											duration: 0.3,
										},
									}}
									className={style.middleGap}
								>
									<label className={style.userName}>Last Name</label>
									<p style={{ color: 'red', fontSize: '12px' }}>
										{state?.apiRes?.last_name ? state?.apiRes?.last_name : null}
									</p>
									<input
										className={style.inputField}
										type="text"
										name="last_name"
										id=""
										placeholder="Ex: Rifat"
										onChange={(e) => {
											dispatch({
												type: 'INPUT',
												payload: { name: e.target.name, value: e.target.value },
											});
										}}
									/>
								</motion.div>
							</div>
							<motion.div
								initial={{ y: 50, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: {
										delay: 0.14,
										duration: 0.3,
									},
								}}
								className={style.middleGap}
							>
								<label className={style.userName}>Mail</label>
								<p style={{ color: 'red', fontSize: '12px' }}>
									{state?.apiRes?.email ? state?.apiRes?.email : null}
								</p>
								<input
									id={style.mail}
									className={style.inputField}
									type="email"
									name="email"
									placeholder="Ex: abc@gmail.com"
									onChange={(e) => {
										dispatch({
											type: 'INPUT',
											payload: { name: e.target.name, value: e.target.value },
										});
									}}
								/>
							</motion.div>
							<motion.div
								initial={{ y: 50, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: {
										delay: 0.14,
										duration: 0.3,
									},
								}}
								className={style.middleGap}
							>
								<label className={style.userName}>Number</label>
								<p style={{ color: 'red', fontSize: '12px' }}>
									{state?.apiRes?.number ? state?.apiRes?.number : null}
								</p>
								<input
									className={style.inputField}
									type="number"
									name="number"
									id={style.number}
									placeholder="(+88) 0123456789"
									onChange={(e) => {
										dispatch({
											type: 'INPUT',
											payload: { name: e.target.name, value: e.target.value },
										});
									}}
								/>
							</motion.div>
							<motion.div
								initial={{ y: 50, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: {
										delay: 0.14,
										duration: 0.3,
									},
								}}
								className={style.middleGap}
							>
								<label className={style.userName}>Message</label>
								<p style={{ color: 'red', fontSize: '12px' }}>
									{state?.apiRes?.message ? state?.apiRes?.message : null}
								</p>
								<textarea
									className={style.message}
									placeholder="Type Here"
									name="message"
									id=""
									onChange={(e) => {
										dispatch({
											type: 'INPUT',
											payload: { name: e.target.name, value: e.target.value },
										});
									}}
								></textarea>
							</motion.div>
							<motion.button
								initial={{ y: 50, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: {
										delay: 0.14,
										duration: 0.3,
									},
								}}
								className={style.submitBtn}
								type="submit"
							>
								{loading ? <Loader /> : 'Send'}
							</motion.button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
