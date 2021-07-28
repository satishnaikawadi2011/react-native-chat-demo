import client from './client';

const endpoint = '/message';

const getLatestMessages = () => {
	return client.get(`${endpoint}/latest`);
};

export default {
	getLatestMessages
};
