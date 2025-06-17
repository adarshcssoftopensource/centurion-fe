export type SignInDto = {
	email: string;
	password: string;
};

export type SendOtp = {
	method: 'email' | 'sms';
};

export type VerifyOtp = {
	email: string;
	otp: string
};
