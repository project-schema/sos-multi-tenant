const data = {
	status: true,
	message: 'Operation successful',
	data: {
		name: 'test',
		email: 've23ndor@gmail.com',
		status: 'inactive',
		_id: '676a7336b4b303bda21dd155',
		createdAt: '2024-12-24T08:39:18.754Z',
		updatedAt: '2024-12-24T08:39:18.754Z',
		__v: 0,
		accessToken:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJfaWQiOiI2NzZhNzMzNmI0YjMwM2JkYTIxZGQxNTUiLCJyb2xlX3R5cGUiOiJwYXJlbnQiLCJpYXQiOjE3MzUwMjk1NTgsImV4cCI6MTczNzYyMTU1OH0.PDpC6_3AZpdmQlX-Y_DFqV6U4wY-cUaoNMsRCunrem8',
	},
	statusCode: 200,
};

const otpData = {
	status: true,
	message: 'Operation successful',
	data: 'OTP verified successfully',
	statusCode: 200,
};
export type SignUpParentResponse = typeof data;
export type OtpVerifyParentResponse = typeof otpData;
