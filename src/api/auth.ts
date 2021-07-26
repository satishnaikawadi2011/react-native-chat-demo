import client from './client';

const endpoint = '/user';

const loginUser = (username: string, password: string) => {
	return client.post(`${endpoint}/login`, { username, password });
};

const registerUser = (firstName: string, lastName: string, username: string, password: string) => {
	return client.post(`${endpoint}/register`, { username, firstName, lastName, password });
};

export default {
	loginUser,
	registerUser
};
