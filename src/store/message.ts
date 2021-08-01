import { Message } from './../models/Message';
import { User } from './../models/User';
import create from 'zustand';
import message from '../api/message';

type MessageStore = {
	latestMessages: any;
	setLatestMessages: (latestMessages: any) => void;
	totalPages: number;
	currentPage: number;
	messages: Message[];
	setMessages: (messages: Message[]) => void;
	setTotalPages: (tp: number) => void;
	setCurrentPage: (cp: number) => void;
	setMsgAsSent: (mag: Message, cname: string) => void;
	addNewMessage: (msg: Message, s: string) => void;
	removeMessage: (clientSideId: string) => void;
};

export const useMessageStore = create<MessageStore>((set, get) => ({
	latestMessages: null,
	setLatestMessages: (latestMessages) => set((state) => ({ ...state, latestMessages })),
	totalPages: 0,
	currentPage: 0,
	messages: [],
	setMessages:
		(messages) => {
			set((state) => ({ ...state, messages: sortMessages(messages) }));
		},
	setTotalPages: (tp) => set((state) => ({ ...state, totalPages: tp })),
	setCurrentPage: (cp) => set((state) => ({ ...state, currentPage: cp })),
	setMsgAsSent:
		(msg, cname) => {
			get().removeMessage(msg.clientSideId as any);
			const isExistsAlready = get().messages.find((m) => m.clientSideId === msg.clientSideId);
			if (isExistsAlready) {
				console.log('Something is wrong');
				// return;
			}
			get().addNewMessage({ ...msg, isSent: true }, 'msgSent');
			const latMsgs = { ...get().latestMessages };
			latMsgs[cname] = msg;
			get().setLatestMessages(latMsgs);
		},
	addNewMessage:
		(msg, s) => {
			const isExistsAlready = get().messages.find((m) => m._id === msg._id);
			if (isExistsAlready) {
				console.log(`😂 => calling from ${s}`, isExistsAlready);
				return;
			}
			set((state) => ({
				...state,
				messages:
					sortMessages([
						...state.messages,
						msg
					])
			}));
		},
	removeMessage:
		(clientSideId) => {
			const messages = get().messages;
			const updatedMessages = messages.filter((m) => m.clientSideId != clientSideId);
			set((state) => ({ ...state, messages: sortMessages(updatedMessages) }));
		}
}));

const sortMessages = (messages: Message[]): Message[] => {
	const newMessages = [
		...messages
	];
	newMessages.sort(function(a, b) {
		return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
	});
	return newMessages;
};
