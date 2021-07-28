import client from './client';

const endpoint = '/user';

const getContacts = () => {
	return client.get(`${endpoint}/contacts`);
};

export default {
	getContacts
};
