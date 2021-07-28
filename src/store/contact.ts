import { User } from './../models/User';
import create from 'zustand';

type ContactStore = {
	contacts: User[];
	setContacts: (contacts: User[]) => void;
};

export const useContactStore = create<ContactStore>((set, get) => ({
	contacts: [],
	setContacts: (contacts) => set((state) => ({ ...state, contacts }))
}));
