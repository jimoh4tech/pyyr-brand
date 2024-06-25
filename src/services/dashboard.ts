import axios from 'axios';
import { baseUrl } from './auth';

const brandDashboard = async ({
	brand_dashboard,
	from,
	to,
}: {
	brand_dashboard: string;
	to: string;
	from: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			brand_dashboard,
			from,
			to,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

const merchantDashboard = async ({
	merchant_dashboard,
	from,
	to,
}: {
	merchant_dashboard: string;
	to: string;
	from: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			merchant_dashboard,
			from,
			to,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};
const updateVoucher = async ({
	update_voucher,
	exp,
	v_code,
}: {
	update_voucher: string;
	v_code: string;
	exp: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			update_voucher,
			'exp[]': exp,
			'v_code[]': v_code,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

export default {
	brandDashboard,
	merchantDashboard,
	updateVoucher,
};
