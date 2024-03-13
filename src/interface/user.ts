export interface IUser {
	id: string;
	name: string;
	role: string;
	date: string;
	status: string;
	email: string;
	image?: string;
}

export interface IRole {
  id: string;
  description: string;
  role: string;
  date: string;
}
