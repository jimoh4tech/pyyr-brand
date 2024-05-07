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
}




export interface IRole {
  id: string;
  description: string;
  role: string;
  date: string;
}
