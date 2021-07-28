import { User } from './../models/User';
import create from 'zustand';

type MessageStore = {
	latestMessages: any;
	setLatestMessages: (latestMessages: any) => void;
};

export const useMessageStore = create<MessageStore>((set, get) => ({
	latestMessages: null,
	setLatestMessages: (latestMessages) => set((state) => ({ ...state, latestMessages }))
}));
