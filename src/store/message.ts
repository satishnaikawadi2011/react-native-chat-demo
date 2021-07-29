import { Message } from './../models/Message';
import { User } from './../models/User';
import create from 'zustand';

type MessageStore = {
	latestMessages: any;
	setLatestMessages: (latestMessages: any) => void;
	totalPages: number;
	currentPage: number;
	messages: Message[];
	setMessages: (messages: Message[]) => void;
	setTotalPages: (tp: number) => void;
	setCurrentPage: (cp: number) => void;
};

export const useMessageStore = create<MessageStore>((set, get) => ({
	latestMessages: null,
	setLatestMessages: (latestMessages) => set((state) => ({ ...state, latestMessages })),
	totalPages: 0,
	currentPage: 0,
	messages: [],
	setMessages: (messages) => set((state) => ({ ...state, messages })),
	setTotalPages: (tp) => set((state) => ({ ...state, totalPages: tp })),
	setCurrentPage: (cp) => set((state) => ({ ...state, currentPage: cp }))
}));
