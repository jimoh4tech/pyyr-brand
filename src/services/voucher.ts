import axios from 'axios';
import { baseUrl } from './auth';

const createVoucher = async ({
	add_voucher,
	voucher_name,
	promotional_title,
	voucher_des,
	redemption,
	visibility,
	usage_limit,
	live,
	worth,
	amount,
	image,
	location_name,
	url,
	description,
	redeem,
	video,
}: {
	add_voucher: string;
	voucher_name?: string;
	promotional_title?: string;
	voucher_des?: string;
	redemption?: string;
	visibility?: string;
	usage_limit?: string;
	live?: string;
	worth?: string;
	amount?: string;
	image?: string;
	location_name?: string;
	url?: string;
	description?: string;
	redeem?: string;
	video?: string;
}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			add_voucher,
			voucher_name,
			promotional_title,
			voucher_des,
			redemption,
			visibility,
			usage_limit,
			live,
			worth,
			amount,
			image,
			location_name,
			url,
			description,
			redeem,
			video,
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

const getVouchers = async ({
	get_voucher,
	
}: {
	get_voucher: string;

}) => {
	const res = await axios.post(
		`${baseUrl}`,
		{
			get_voucher,
			
		},
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	return res.data;
};

export default {
  createVoucher,
  getVouchers
};
