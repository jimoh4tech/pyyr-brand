import axios from 'axios';
import { baseUrl } from './auth';

const getBankList = async () => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			list_banks: 1,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

const getAccountName = async ({
	get_account,
	bankcode,
}: {
	get_account: string;
	bankcode: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			get_account,
			bankcode,
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

const walletBalance = async ({
	pyyr_accounts,
	
}: {
	pyyr_accounts: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			pyyr_accounts,
			
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

const verifyTopUp = async ({
	email,
	payment_ref,
	payment_status,
	card_topup,
}: {
	email: string;
	payment_ref: string;
	payment_status: string;
	card_topup: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			email,
			payment_ref,
			payment_status,
			card_topup,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

export default {
	getBankList,
	getAccountName,
	topUp,
	verifyTopUp,
	walletBalance
};
