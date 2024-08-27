import axios from "axios";
import { baseUrl } from "./auth";

const createVoucher = async ({
  add_voucher,
  voucher_name,
  promotional_title,
  voucher_des,
  redemption,
  visibility,
  // usage_limit,
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
  // usage_limit?: string;
  live?: string;
  worth?: string;
  amount?: string;
  image?: string;
  location_name?: string[];
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
      // usage_limit,
      live,
      worth,
      amount,
      image,
      "location_name[]": location_name,
      url,
      description,
      redeem,
      video,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const getVouchers = async ({ get_voucher }: { get_voucher: string }) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      get_voucher,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const getAllVouchers = async ({ all_voucher }: { all_voucher: string }) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      all_voucher,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};
const getGiftVouchers = async ({
  list_giftvoucher,
}: {
  list_giftvoucher: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      list_giftvoucher,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const addVoucherToCart = async ({
  add_cart,
  email,
}: {
  add_cart: string;
  email: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      add_cart,
      email,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const reduceQtyVoucherFromCart = async ({
  reduce_cart,
  email,
}: {
  reduce_cart: string;
  email: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      reduce_cart,
      email,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const clearVoucherCart = async ({
  clear_cart,
  email,
}: {
  clear_cart: string;
  email: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      clear_cart,
      email,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const removeVoucherFromCart = async ({
  remove_cart,
  email,
}: {
  remove_cart: string;
  email: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      remove_cart,
      email,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const getAllCartVouchers = async ({ get_cart }: { get_cart: string }) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      get_cart,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};
const getAllMerchantVouchers = async ({
  list_voucher,
}: {
  list_voucher: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      list_voucher,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};
const checkoutOrder = async ({
  checkout,
  exp,
}: {
  checkout: string;
  exp: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      checkout,
      exp,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};
const viewGiftVoucher = async ({
  gift_all,
  code,
}: {
  gift_all: string;
  code: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      gift_all,
      code,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};
const giftVoucher = async ({
  gift_voucher,
  code,
  user,
}: {
  gift_voucher: string;
  code: string;
  user: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      gift_voucher,
      code,
      user,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

const toggleVoucherAvailabiility = async ({
  voucher_code,
  update_availability,
}: {
  voucher_code: string;
  update_availability: string;
}) => {
  const res = await axios.post(
    `${baseUrl}`,
    {
      voucher_code,
      update_availability,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};
export default {
  createVoucher,
  getVouchers,
  getAllVouchers,
  getGiftVouchers,
  giftVoucher,
  addVoucherToCart,
  removeVoucherFromCart,
  reduceQtyVoucherFromCart,
  clearVoucherCart,
  getAllCartVouchers,
  getAllMerchantVouchers,
  viewGiftVoucher,
  checkoutOrder,
  toggleVoucherAvailabiility,
};
