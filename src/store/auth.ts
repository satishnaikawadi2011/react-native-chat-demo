import { User } from './../models/User';
import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';

type AuthStore = {
	token: string | null;
	user: User | null;
	expiryDate: Date | null;
	setToken: (token: string | null) => void;
	setUser: (user: User | null) => void;
	setExpiryDate: (expiryDate: Date | null) => void;
	logout: () => void;
	authenticate: (user: User, expiryDate: Date, token: string) => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
	token: null,
	expiryDate: null,
	user: null,
	setToken: (token) => set((state) => ({ ...state, token })),
	setUser: (user) => set((state) => ({ ...state, user })),
	setExpiryDate: (expiryDate) => set((state) => ({ ...state, expiryDate })),
	logout:
		() => {
			set((state) => ({ ...state, token: null, user: null, expiryDate: null }));
			removeAuthDataFromAsyncStorage();
		},
	authenticate:
		(user, expiryDate, token) => {
			set((state) => ({ ...state, user, expiryDate, token }));
			saveToAsyncStorage(user, expiryDate, token);
		}
}));

export const saveToAsyncStorage = (user: User, expiryDate: Date, token: string) => {
	AsyncStorage.setItem('user', JSON.stringify(user));
	AsyncStorage.setItem(
		'tokenData',
		JSON.stringify({
			token,
			expiryDate: expiryDate.toISOString()
		})
	);
};

export const removeAuthDataFromAsyncStorage = () => {
	client.setHeader('Authorization', '');
	AsyncStorage.removeItem('user');
	AsyncStorage.removeItem('tokenData');
};

export const getUserDataFromAsyncStorage = async () => {
	try {
		const tokenData: any = await AsyncStorage.getItem('tokenData');
		const user: any = await AsyncStorage.getItem('user');
		if (user && tokenData) {
			return {
				tokenData: JSON.parse(tokenData),
				user: JSON.parse(user)
			};
		}
		return null;
	} catch (error) {
		console.log(error);
	}
};
