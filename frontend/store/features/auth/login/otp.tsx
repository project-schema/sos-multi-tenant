'use client';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { BackNavigation, NotAccSignUp } from '../_ctx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useOtpVerifyParentMutation } from '../sign-up/sign-up-api-slice';
import { useSession } from 'next-auth/react';

export function Otp() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { data: session } = useSession();
	console.log(session?.user?._id, 'session');

	type FieldType = {
		new_password?: string;
		old_password?: string;
		remember?: string;
	};
	const [store, { isLoading }] = useOtpVerifyParentMutation();

	const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
		if (searchParams.get('from') === 'parent_signup') {
			const { data } = await store({ ...values, userId: session?.user?._id });

			if (data?.statusCode === 200 && data?.status) {
				router.push(
					'/auth?in_page=parent_add_child&from=' + searchParams.get('from')
				);
			}
		} else if (searchParams.get('from') === 'child_signup') {
			const { data } = await store({ ...values, userId: session?.user?._id });

			if (data?.statusCode === 200 && data?.status) {
				router.push(
					'/auth?in_page=child_add_parent&from=' + searchParams.get('from')
				);
			}
		}
	};

	return (
		<div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 ">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm border p-5 rounded-lg relative group">
				<BackNavigation />

				<h2 className="modal_title mb-3">Check your mail for a code</h2>
				<p className="modal_sub_title">
					We’ve sent a code to Johndoe@gmail.com Please enter it in the next
					step to continue. If you don’t see the email, be sure to check your
					spam or junk folder.
				</p>
				<div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
					<Form
						name="dependencies"
						autoComplete="off"
						layout="vertical"
						onFinish={onFinish}
						className="space-y-3"
					>
						<Form.Item
							label={null}
							className="flex justify-center"
							hasFeedback
							validateStatus="success"
							name="otp"
						>
							<Input.OTP size="large" length={6} />
						</Form.Item>

						<Form.Item className="!mb-0" label={null}>
							<Button
								disabled={isLoading}
								loading={isLoading}
								type="primary"
								htmlType="submit"
								className="w-full"
								size="large"
							>
								Submit{isLoading ? 'ing...' : ''}
							</Button>
						</Form.Item>
					</Form>
					<p className="text-center text-sm/6 text-gray-500 mt-2">
						Expire in 10 minutes
					</p>
					<NotAccSignUp />
				</div>
			</div>
		</div>
	);
}
