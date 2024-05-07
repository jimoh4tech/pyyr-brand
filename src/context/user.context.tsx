import { createContext, useEffect, useState } from "react";
import { IUser } from "../interface/user";
import { useNavigate } from "react-router-dom";
import authServices from '../services/auth';
import userServices from "../services/user";

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
        const email = localStorage.getItem('PYMAILYR') || '';
				console.log(email);
				if (!email)
					navigate('/signin');
				// Validate token with the server and set isAuthenticated accordingly
				authServices.setEmail(email);
				const res = await userServices.getFullUserDetail({full_user: email});
        console.log(res);
				setCurrentUser({ ...res });
			} catch (error) {
				navigate('/signin');
				console.error(error);
			}
		}
		validateToken();
	}, []);
	return (
		<CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
			{props.children}
		</CurrentUserContext.Provider>
	);
};