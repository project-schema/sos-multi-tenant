'use client';
import { Avatar, Button, Form, Input, List, Modal } from 'antd';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
	useFindByChildEmailQuery,
	useFindByParentEmailQuery,
} from './sign-up/sign-up-api-slice';
import { IParent } from '@/types';

export const NotAccSignUp = () => {
	return (
		<p className="mt-10 text-center text-sm/6 text-gray-500">
			Not a have account?{' '}
			<Link
				href={`/auth?in_page=signup`}
				className="font-semibold text-indigo-600 hover:text-indigo-500"
			>
				Sign up now
			</Link>
		</p>
	);
};

export const HaveAccLogin = () => {
	return (
		<p className="mt-10 text-center text-sm/6 text-gray-500">
			Have account?{' '}
			<Link
				href={`/auth?in_page=login`}
				className="font-semibold text-indigo-600 hover:text-indigo-500"
			>
				Log in
			</Link>
		</p>
	);
};

export const BackNavigation = () => {
	const router = useRouter();
	return (
		<Button
			onClick={() => router.back()}
			className="!absolute top-2 left-2  hidden  group-hover:inline-flex"
			icon={<ChevronLeft />}
			type="dashed"
			size="small"
		></Button>
	);
};

export const AddParent = ({
	modal,
	setModalHandler,
	add,
	data,
}: {
	modal: {
		status: boolean;
		data: any;
	};
	// eslint-disable-next-line no-unused-vars
	add: (data: any) => void;
	setModalHandler: Function;
	data: IParent[];
}) => {
	const [email, setEmail] = useState('');
	const { data: parents, isLoading } = useFindByChildEmailQuery(email, {
		skip: !email,
	});
	type FieldType = {
		emailX?: string;
	};
	const [form] = Form.useForm<FieldType>();

	const onFinish = (values: FieldType) => {
		setEmail(values?.emailX || '');
	};

	return (
		<>
			<Modal
				title="Add Parent"
				open={modal.status}
				centered
				onOk={() =>
					setModalHandler({
						status: false,
						data: null,
					})
				}
				onCancel={() =>
					setModalHandler({
						status: false,
						data: null,
					})
				}
			>
				<Form
					initialValues={{ have_child_account: 'yes' }}
					form={form}
					name="parent-auth"
					layout="vertical"
					onFinish={onFinish}
					autoComplete="off"
					className="space-y-2"
				>
					<Form.Item<FieldType>
						label="Email"
						name="emailX"
						rules={[{ required: true, message: 'Please input your email!' }]}
						className="!mb-0"
					>
						<Input placeholder="Search by email" />
					</Form.Item>

					<Form.Item label={null} className="flex justify-end">
						<Button type="primary" htmlType="submit" size="small">
							Search Account
						</Button>
					</Form.Item>

					<div className="max-h-44 overflow-y-auto"></div>
				</Form>
			</Modal>
		</>
	);
};
export const AddChild = ({
	modal,
	setModalHandler,
	add,
	data,
}: {
	modal: {
		status: boolean;
		data: any;
	};
	// eslint-disable-next-line no-unused-vars
	add: (data: any) => void;
	setModalHandler: Function;
	data: IParent[];
}) => {
	const [email, setEmail] = useState('');
	const { data: parents, isLoading } = useFindByParentEmailQuery(email, {
		skip: !email,
	});
	type FieldType = {
		emailX?: string;
	};
	const [form] = Form.useForm<FieldType>();

	const onFinish = (values: FieldType) => {
		setEmail(values?.emailX || '');
	};

	return (
		<>
			<Modal
				title="Add Child"
				open={modal.status}
				centered
				onOk={() =>
					setModalHandler({
						status: false,
						data: null,
					})
				}
				onCancel={() =>
					setModalHandler({
						status: false,
						data: null,
					})
				}
			>
				<Form
					initialValues={{ have_child_account: 'yes' }}
					form={form}
					name="parent-auth"
					layout="vertical"
					onFinish={onFinish}
					autoComplete="off"
					className="space-y-2"
				>
					<Form.Item<FieldType>
						label="Email"
						name="emailX"
						rules={[{ required: true, message: 'Please input your email!' }]}
						className="!mb-0"
					>
						<Input placeholder="Search by email" />
					</Form.Item>

					<Form.Item label={null} className="flex justify-end">
						<Button type="primary" htmlType="submit" size="small">
							Search Account
						</Button>
					</Form.Item>

					<div className="max-h-44 overflow-y-auto">
						<List
							loading={isLoading}
							itemLayout="horizontal"
							dataSource={parents?.data || []}
							renderItem={(item) => (
								<List.Item
									className={`cursor-pointer hover:bg-slate-200   !px-2 rounded-md !border ${
										data?.some((i) => i._id === item._id) ? 'bg-gray-100' : ''
									}`}
									onClick={() => {
										if (!data?.some((i) => i._id === item._id)) {
											add(item);
										}
									}}
								>
									<List.Item.Meta
										avatar={
											<Avatar style={{ backgroundColor: '#87d068' }}>U</Avatar>
										}
										title={<span>{item.name}</span>}
										description={<span>{item.email}</span>}
									/>
								</List.Item>
							)}
						/>
					</div>
				</Form>
			</Modal>
		</>
	);
};
