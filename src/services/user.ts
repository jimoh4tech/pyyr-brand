import axios from 'axios';
import { baseUrl } from './auth';

const getUserInfo = async ({ pyyr_user }: { pyyr_user: string }) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			pyyr_user,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

const getUserBusinessDetails = async ({
	business_user,
}: {
	business_user: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			business_user,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

const getUserDocs = async ({ document_user }: { document_user: string }) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			document_user,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

const getBankDetails = async ({ get_bank }: { get_bank: string }) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			get_bank,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

const topUp = async ({
	email,
	card_topup,
}: {
	email: string;
	card_topup: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			email,
			card_topup,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

const verifyTopUp = async ({
	email,
	transactionCode,
	status,
}: {
	email: string;
	transactionCode: string;
	status: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			email,
			transactionCode,
			status,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

export default {
	getUserInfo,
	getUserDocs,
	getBankDetails,
	topUp,
	verifyTopUp,
	getUserBusinessDetails,
};
