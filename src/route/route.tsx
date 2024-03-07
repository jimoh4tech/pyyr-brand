import { Route, Routes } from 'react-router-dom';
import { SignUpPage } from '../pages/auth/register';
import { SignInPage } from '../pages/auth/login';
import { ForgotPasswordPage } from '../pages/auth/forgot-password';
import { ResetPasswordPage } from '../pages/auth/reset-password';
import { MerchantLayout } from '../layout/merchant-layout';
import { MerchantDashboard } from '../pages/merchant/dashboard';
import { MerchantKYC } from '../pages/merchant/kyc';
import { BrandDashboard } from '../pages/brand/dashboard';
import { BrandKYC } from '../pages/brand/kyc';
import { BrandLayout } from '../layout/brand-layout';
import { Voucher } from '../pages/brand/vouchers';
import { Wallet } from '../pages/brand/wallet';
import { Report } from '../pages/brand/report';
export const Router = () => {
	return (
		<Routes>
			<Route path='/signup' element={<SignUpPage />} />
			<Route path='/signin' element={<SignInPage />} />
			<Route path='/forgot-password' element={<ForgotPasswordPage />} />
			<Route path='/reset-password' element={<ResetPasswordPage />} />

			<Route path='/' element={<BrandLayout />}>
				<Route index element={<BrandDashboard />} />
				<Route path='kyc' element={<BrandKYC />} />
				<Route path='vouchers' element={<Voucher />} />
				<Route path='wallet' element={<Wallet />} />
				<Route path='report' element={<Report />} />
				
				
			</Route>

			<Route path='/merchants' element={<MerchantLayout />}>
				<Route index element={<MerchantDashboard />} />
				<Route path='kyc' element={<MerchantKYC />} />
			</Route>
		</Routes>
	);
};
