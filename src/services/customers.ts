import axios from "axios";
import { baseUrl } from "./auth";

const addCustomer = async ({
  cfname,
  lname,
  email,
  gender,
  phone,
  interests,
  ig,
  twitter,
  city,
  state,
  user_token,
}: {
  cfname: string;
  lname: string;
  email: string;
  gender: string;
  phone: string;
  interests: string;
  ig: string;
  twitter: string;
  city: string;
  state: string;
  user_token: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      cfname,
      lname,
      email,
      gender,
      phone,
      interests,
      ig,
      twitter,
      city,
      state,
      user_token,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const addCustomersFromFile = async ({
  customerFile,
  fileupload,
}: {
  customerFile: string;
  fileupload: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      customerFile,
      fileupload,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const getAllCustomers = async ({
  list_customer,
}: {
  list_customer: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      list_customer,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const viewCustomerDetails = async ({
  view_customer,
  id,
}: {
  view_customer: string;
  id: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      view_customer,
      id,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

export default {
  addCustomer,
  addCustomersFromFile,
  getAllCustomers,
  viewCustomerDetails,
};
