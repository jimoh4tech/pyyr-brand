import axios from "axios";
import { baseUrl } from "./auth";

const getUserInfo = async ({ pyyr_user }: { pyyr_user: string }) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      pyyr_user,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const getFullUserDetail = async ({ full_user }: { full_user: string }) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      full_user,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
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
      headers: { "Content-Type": "multipart/form-data" },
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
      headers: { "Content-Type": "multipart/form-data" },
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
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const getNotifications = async ({ notification }: { notification: string }) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      notification,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

export default {
  getUserInfo,
  getUserDocs,
  getBankDetails,
  getUserBusinessDetails,
  getFullUserDetail,
  getNotifications,
};
