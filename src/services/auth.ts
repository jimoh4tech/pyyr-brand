import axios from "axios";

export const baseUrl = import.meta.env.VITE_BASE_URL;

const COUNTRY_API_KEY = import.meta.env.VITE_COUNTRY_API_KEY;
// const IDENTITY_PASS_API_KEY = import.meta.env.VITE_IDENTITY_PASS_API_KEY;
// const IDENTITY_PASS_APP_ID = import.meta.env.VITE_IDENTITY_PASS_APP_ID;

export let email = "";

const setToken = (userMail: string): void => {
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
      headers: { "Content-Type": "multipart/form-data" },
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
      headers: { "Content-Type": "multipart/form-data" },
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
      headers: { "Content-Type": "multipart/form-data" },
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
      headers: { "Content-Type": "multipart/form-data" },
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
      headers: { "Content-Type": "multipart/form-data" },
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
      headers: { "Content-Type": "multipart/form-data" },
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
  mail,
  state,
  country,
  b_mail,
  b_phone,
  website,
  rc_number,
  industry,
  firstName,
  lastName,
  phone,
  dob,
  id_type,
  id_number,
  accountNumber,
  accountBank,
  accountName,
  bankcode,
  bvn,
  coc,
  cac,
  idcard,
}: {
  logo?: string;
  businessType?: string;
  businessName: string;
  city?: string;
  email: string;
  mail: string;
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
  phone?: string;
  dob?: string;
  id_type?: string;
  id_number?: string;
  accountNumber?: string;
  accountBank?: string;
  accountName?: string;
  bankcode?: string;
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
      id_number,
      accountNumber,
      accountBank,
      accountName,
      bankcode,
      bvn,
      coc,
      cac,
      idcard,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const addManager = async ({
  add_manager,
  name,
  phone,
  location,
}: {
  add_manager: string;
  name: string;
  phone: string;
  location: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      add_manager,
      name,
      phone,
      location,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const editManager = async ({
  edit_manager,
  manager_id,
  name,
  phone,
  location,
}: {
  edit_manager: string;
  manager_id: string;
  name: string;
  phone: string;
  location: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      edit_manager,
      manager_id,
      name,
      phone,
      location,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const removeManager = async ({
  remove_manager,
  email,
}: {
  remove_manager: string;
  email: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      remove_manager,
      email,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};
const getManagers = async ({ get_managers }: { get_managers: string }) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      get_managers,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};
const resendCode = async ({ resend_otp }: { resend_otp: string }) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      resend_otp,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const getAllCountries = async () => {
  const res = await axios.get("https://api.countrystatecity.in/v1/countries", {
    headers: {
      "X-CSCAPI-KEY": COUNTRY_API_KEY,
    },
  });
  return res.data;
};
const getAllStatesByCountry = async (iso2: string) => {
  const res = await axios.get(
    `https://api.countrystatecity.in/v1/countries/${iso2}/states`,
    {
      headers: {
        "X-CSCAPI-KEY": COUNTRY_API_KEY,
      },
    }
  );
  return res.data;
};
// const verifyBVN = async (number: string) => {
//   const res = await axios.post(
//     `https://api.prembly.com/identitypass/verification/bvn_validation`,
//     { number },
//     {
//       headers: {
//         "app-id": IDENTITY_PASS_APP_ID,
//         "x-api-key": IDENTITY_PASS_API_KEY,
//       },
//     }
//   );
//   return res.data;
// };

export default {
  register,
  verifyOTP,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
  kyc,
  setToken,
  addManager,
  editManager,
  removeManager,
  getManagers,
  getAllCountries,
  getAllStatesByCountry,
  resendCode,
  // verifyBVN,
};
