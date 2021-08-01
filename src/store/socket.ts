import { SOCKET_URL_DEV } from './../../constants/index';
import { User } from './../models/User';
import create from 'zustand';
import { Socket, io } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

type SocketStore = {
	socket: Socket<DefaultEventsMap, DefaultEventsMap>;
};

export const useSocketStore = create<SocketStore>((set, get) => ({
	socket: io(SOCKET_URL_DEV)
}));
