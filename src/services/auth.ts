import axios from 'axios';

export const baseUrl = import.meta.env.VITE_BASE_URL;

export let email = '';

 const setEmail = (userMail: string): void => {
	email = userMail;
};

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

const kyc = async ({
	logo,
	businessType,
	businessName,
	city,
	date,
	email,
	state,
	country,
	b_mail,
	b_phone,
	website,
	rc_number,
	industry,
	firstName,
	lastName,
	mail,
	phone,
	dob,
	id_type,
	id_nummber,
	accountNumber,
	accountBank,
	accountName,
	bankCode,
	bvn,
	coc,
	cac,
	idcard,
}: {
	logo?: string;
	businessType?: string;
	businessName: string;
	email: string;
	city?: string;
	date: string;
	state?: string;
	country?: string;
	b_mail?: string;
	b_phone?: string;
	website?: string;
	rc_number?: string;
	industry?: string;
	firstName?: string;
	lastName?: string;
	mail?: string;
	phone?: string;
	dob?: string;
	id_type?: string;
	id_nummber?: string;
	accountNumber?: string;
	accountBank?: string;
	accountName?: string;
	bankCode?: string;
	bvn?: string;
	coc?: string;
	cac?: string;
	idcard?: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			logo,
			businessType,
			businessName,
			city,
			date,
			email,
			state,
			country,
			b_mail,
			b_phone,
			website,
			rc_number,
			industry,
			firstName,
			lastName,
			mail,
			phone,
			dob,
			id_type,
			id_nummber,
			accountNumber,
			accountBank,
			accountName,
			bankCode,
			bvn,
			coc,
			cac,
			idcard,
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
	kyc,
	setEmail
};
