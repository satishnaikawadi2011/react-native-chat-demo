import { sendMessageDataType } from './../utils/socketRelFunctions';
import client from './client';

const endpoint = '/message';

const getLatestMessages = () => {
	return client.get(`${endpoint}/latest`);
};

const getMessages = (contactId: string, pageNum: number) => {
	return client.get(`${endpoint}/${contactId}?page=${pageNum}`);
};

const sendMessage = (data: any) => {
	const { to, clientSideId, content } = data;
	return client.post(`${endpoint}/sendMessage`, { to, content, clientSideId });
};

export default {
	getLatestMessages,
	getMessages,
	sendMessage
};
