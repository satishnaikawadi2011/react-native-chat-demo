import { User } from './../models/User';
import create from 'zustand';

type ContactStore = {
	contacts: User[];
	setContacts: (contacts: User[]) => void;
	setContactAsOnline: (userId: string, socketId: string) => void;
	setContactAsOffline: (userId: string) => void;
};

export const useContactStore = create<ContactStore>((set, get) => ({
	contacts: [],
	setContacts: (contacts) => set((state) => ({ ...state, contacts })),
	setContactAsOnline:
		(userId: string, socketId: string) => {
			const contacts = get().contacts;
			const contact: any = contacts.find((c) => c._id === userId);
			const updatedContacts = contacts.filter((c) => c._id !== userId);
			get().setContacts([
				{ ...contact, isOnline: true, socketId },
				...updatedContacts
			]);
		},
	setContactAsOffline:
		(userId: string) => {
			const contacts = get().contacts;
			const contact: any = contacts.find((c) => c._id === userId);
			const updatedContacts = contacts.filter((c) => c._id !== userId);
			get().setContacts([
				{ ...contact, isOnline: false, socketId: null },
				...updatedContacts
			]);
		}
}));
