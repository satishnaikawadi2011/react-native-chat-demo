import { io } from 'socket.io-client';

const socket = io('http://192.168.43.49:5000');

export default socket;
