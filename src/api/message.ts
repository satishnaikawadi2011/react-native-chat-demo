import client from './client';

const endpoint = '/message';

const getLatestMessages = () => {
	return client.get(`${endpoint}/latest`);
};

const getMessages = (contactId: string, pageNum: number) => {
	return client.get(`${endpoint}/${contactId}?page=${pageNum}`);
};

export default {
	getLatestMessages,
	getMessages
};
