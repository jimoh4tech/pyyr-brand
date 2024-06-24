import { createContext, useEffect, useState } from 'react';
import { IUser } from '../interface/user';
import { useNavigate } from 'react-router-dom';
import authServices from '../services/auth';
import userServices from '../services/user';

export const CurrentUserContext = createContext<{
	currentUser: IUser | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setCurrentUser: any;
}>({ currentUser: null, setCurrentUser: null });

export const CurrentUserProvider = ({ ...props }) => {
	const [currentUser, setCurrentUser] = useState<IUser | null>(null);
	const navigate = useNavigate();
	useEffect(() => {
		async function validateToken() {
			try {
				const token = localStorage.getItem('PYMAILYR') || '';
				console.log(token);
				if (!token) navigate('/signin');
				// Validate token with the server and set isAuthenticated accordingly
				authServices.setToken(token);
				const res = await userServices.getFullUserDetail({ full_user: token });
				if (res.responseCode == 200) {
					console.log(res);
					setCurrentUser({ ...res });
				} else {
					navigate('/signin');
				}
			} catch (error) {
				navigate('/signin');
				console.error(error);
			}
		}
		if (!currentUser) validateToken();

		// Prevent brands from accessing merchant portal and vice versa.
		if (currentUser) {
			if (currentUser?.brand_name) {
				!window.location.pathname.includes('merchant') ? '' : navigate('/');
			} else {
				window.location.pathname.includes('merchant')
					? ''
					: navigate('/merchant');
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);
	return (
		<CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
			{props.children}
		</CurrentUserContext.Provider>
	);
};
