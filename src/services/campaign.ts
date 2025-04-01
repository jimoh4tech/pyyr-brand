import axios from "axios";
import { baseUrl } from "./auth";

const addCampaign = async ({
  campaign_name,
  campaign_des,
  sdate,
  edate,
  image,
  campaign_voucher,
  campaign_customer,
  user_campaign,
}: {
  campaign_name: string;
  campaign_des: string;
  sdate: string;
  edate: string;
  image: string;
  campaign_voucher: string[];
  campaign_customer: string[];
  user_campaign: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      campaign_name,
      campaign_des,
      sdate,
      edate,
      image,
      campaign_voucher,
      campaign_customer,
      user_campaign,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const getAllCampaigns = async ({
  list_campaign,
}: {
  list_campaign: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      list_campaign,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

export default { addCampaign, getAllCampaigns };
