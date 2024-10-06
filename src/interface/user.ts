export interface IUser {
  id: string;
  name: string;
  role: string;
  date: string;
  status: string;
  email: string;
  image?: string;
  account_type?: string;
  brand_name?: string;
  dob?: string;
  firstName?: string;
  first_name?: string;
  id_number?: string;
  id_type?: string;
  lastName?: string;
  mail?: string;
  phone?: string;
  businessName?: string;
  businessType?: string;
  cac?: string;
  city?: string;
  coc?: string;
  country?: string;
  idcard?: string;
  industry?: string;
  logo?: string;
  rc_number?: string;
  responseCode?: string;
  responseMessage?: string;
  state?: string;
  website?: string;
  wallet_id: string;
}

export interface IRole {
  id: string;
  description: string;
  role: string;
  date: string;
}
