import { Route, Routes } from "react-router-dom";
import { ForgotPasswordPage } from "../pages/auth/forgot-password";
// import { ResetPasswordPage } from '../pages/auth/reset-password';
import { MerchantLayout } from "../layout/merchant-layout";
import { MerchantDashboard } from "../pages/merchant/dashboard";
import { BrandDashboard } from "../pages/brand/dashboard";
import { BrandLayout } from "../layout/brand-layout";
import { Voucher } from "../pages/brand/vouchers";
import { Wallet } from "../pages/brand/wallet";
import { Report } from "../pages/brand/report";
import { SalesDetails } from "../pages/brand/sales-details";
import { Profile } from "../pages/brand/profile";
import { Privilege, Role, User } from "../pages/brand/user-control";
import { MerchantKYC } from "../pages/merchant/kyc";
import { RegistrationPage } from "../pages/auth/register/index";
import { LoginPage } from "../pages/auth/login/index";
import { BrandKYC } from "../pages/brand/kyc/index";
import { CustomerPage } from "../pages/merchant/customers";
import { CampaignPage } from "../pages/merchant/campaigns";
import { MerchantWalletPage } from "../pages/merchant/wallet";
import { MerchantVoucherPage } from "../pages/merchant/vouchers";
import { MarketPlacePage } from "../pages/merchant/market-place";
import { MerchantProfile } from "../pages/merchant/profile";
import { CustomerDetails } from "../pages/merchant/customer-details";
import { CurrentUserProvider } from "../context/user.context";
import { GiftsPage } from "../pages/merchant/gifts";
import { PaymentLinkPage } from "../pages/payment-link";
import { PageNotFound } from "../pages/page-not-found";

export const Router = () => {
  return (
    <Routes>
      <Route path="/signup" element={<RegistrationPage />} />
      <Route path="/payment-link/:link" element={<PaymentLinkPage />} />
      <Route
        path="/signin"
        element={
          <CurrentUserProvider>
            <LoginPage />
          </CurrentUserProvider>
        }
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      {/* <Route path='/reset-password' element={<ResetPasswordPage />} /> */}

      <Route
        path="/"
        element={
          <CurrentUserProvider>
            <BrandLayout />
          </CurrentUserProvider>
        }
      >
        <Route index element={<BrandDashboard />} />
        <Route path="kyc" element={<BrandKYC />} />
        <Route path="vouchers" element={<Voucher />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="report" element={<Report />} />
        <Route path="report/:id" element={<SalesDetails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="user" element={<User />} />
        <Route path="role" element={<Role />} />
        <Route path="privileges" element={<Privilege />} />
      </Route>

      <Route
        path="/merchant"
        element={
          <CurrentUserProvider>
            <MerchantLayout />
          </CurrentUserProvider>
        }
      >
        <Route index element={<MerchantDashboard />} />
        <Route path="kyc" element={<MerchantKYC />} />
        <Route path="customers" element={<CustomerPage />} />
        <Route path="customers/:id" element={<CustomerDetails />} />
        <Route path="gifts" element={<GiftsPage />} />
        <Route path="campaigns" element={<CampaignPage />} />
        <Route path="wallet" element={<MerchantWalletPage />} />
        <Route path="vouchers" element={<MerchantVoucherPage />} />
        <Route path="marketplace" element={<MarketPlacePage />} />
        <Route path="profile" element={<MerchantProfile />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
