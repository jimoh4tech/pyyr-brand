export interface IVoucherTable {
  worth: string;
  qty: number;
  expireDate?: string;
  merchant?: string;
  price?: string;
  usage?: string;
  date?: string;
  qty_used?: string;
  exp?: string;
  qty_gifted?: number;
  redeem?: number;

  // Date: string;
  Name: string;
  amount: string;
  code: string;
  description: string;
  image: string;
  live: string;
  promotional_title: string;
  redemption: string;
  // usage_limit: string;
  visibility: string;
}
