import axios from 'axios';
import { baseUrl } from './auth';
const token = import.meta.env.VITE_PAYSTACK_PRIVATE_KEY;

const getBankList = async () => {
	const res = await axios.get(`https://api.paystack.co/bank`, {
		headers: { Authorization: `bearer ${token}` },
	});
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

const walletBalance = async ({ pyyr_accounts }: { pyyr_accounts: string }) => {
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
}: {
	email: string;
	payment_ref: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			email,
			payment_ref,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

const withdrawal = async ({
	ptb,
	accountNumber,
	beneficiaryAccountName,
	beneficiaryBank,
	recipient_code,
	amount,
}: {
	ptb: string;
	accountNumber: string;
	beneficiaryAccountName: string;
	beneficiaryBank: string;
	recipient_code: string;
	amount: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			ptb,
			accountNumber,
			beneficiaryAccountName,
			beneficiaryBank,
			recipient_code,
			amount,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

const confirmWithdrawal = async ({
	confirm_ptb,
	pin,
	email,
}: {
	confirm_ptb: string;
	pin: string;
	email: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			confirm_ptb,
			pin,
			email,
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
	walletBalance,
	withdrawal,
	confirmWithdrawal,
};
