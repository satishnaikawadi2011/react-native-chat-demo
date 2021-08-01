import { Message } from './../models/Message';

export const EVENTS = {
	myConnection: 'myConnection',
	online: 'online',
	contactCameOnline: 'contactCameOnline',
	contactGoneOffline: 'contactGoneOffline',
	sendMessage: 'sendMessage',
	message: 'message'
};

export type onlineDataType = {
	userId: string;
};

export type contactCameOnlineDataType = {
	socketId: string | null;
	userId: string;
};

export type contactGoneOfflineDataType = {
	socketId: string | null;
	userId: string;
};

export type sendMessageDataType = {
	message: Message;
	uId: string;
};

export type messageDataType = {
	message: Message;
};
