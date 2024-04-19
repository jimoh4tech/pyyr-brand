import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

const register = async ({
	fname,
	password,
	cpassword,
	brand_name,
	account_type,
	email,
}: {
	fname?: string;
	password: string;
	cpassword: string;
	email: string;
	brand_name?: string;
	account_type: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			fname,
			password,
			cpassword,
			brand_name,
			account_type,
			email,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

const verifyOTP = async ({
	email,
	checkotp,
}: {
	email: string;
	checkotp: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			email,
			checkotp,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

const login = async ({
	username,
	password,
}: {
	username: string;
	password: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			username,
			password,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

const forgetPassword = async ({ forgot }: { forgot: string }) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			forgot,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

const resetPassword = async ({
	email,
	n_password,
	cnpassword,
}: {
	email: string;
	n_password: string;
	cnpassword: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			email,
			n_password,
			cnpassword,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

const changePassword = async ({
	email,
	npassword,
	cnpassword,
	
}: {
	email: string;
	npassword: string;
	cnpassword: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			email,
			npassword,
			cnpassword,
			
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};
export default {
	register,
	verifyOTP,
	login,
	forgetPassword,
	resetPassword,
	changePassword,
};
