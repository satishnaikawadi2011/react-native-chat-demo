export interface User {
	isOnline: boolean;
	_id: string;
	firstName: string;
	lastName: string;
	lastOnlineAt: string | null;
	username: string;
	createdAt: string;
	updatedAt: string;
	socketId: string | null;
	__v: number;
}
