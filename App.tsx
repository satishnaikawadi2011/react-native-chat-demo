import { useFonts } from 'expo-font';
import React, { useEffect, useRef, useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import { useAuthStore } from './src/store/auth';
import AppNavigationContainer from './src/navigation/AppNavigationContainer';
import { Provider as PaperProvider } from 'react-native-paper';
import getDataFromAsyncStorageOnStart from './src/utils/getDataFromAsyncStorageOnStart';
import { View } from 'react-native';
import MessageInput from './src/components/messages/MessageInput';
import useAppState from './src/hooks/useAppState';
// import socket from './src/api/socketClient';
// import { io } from 'socket.io-client';
import {
	contactCameOnlineDataType,
	contactGoneOfflineDataType,
	EVENTS,
	messageDataType
} from './src/utils/socketRelFunctions';

import { useSocketStore } from './src/store/socket';
import { useMessageStore } from './src/store/message';
import { useContactStore } from './src/store/contact';

export default function App() {
	const appState = useAppState();
	const [
		isReady,
		setIsReady
	] = useState(false);
	const { setExpiryDate: b, setUser: c, setToken: d, user } = useAuthStore();
	const { latestMessages, setLatestMessages, setMessages, messages } = useMessageStore();
	const { setContactAsOffline, setContactAsOnline } = useContactStore();
	const { socket } = useSocketStore();
	useEffect(
		() => {
			if (user) {
				socket.emit(EVENTS.myConnection, { uId: user._id });
				if (appState === 'active' && socket) {
					socket.emit(EVENTS.online, { userId: user._id });
					console.log('emitted onlie');
				}
			}
		},
		[
			user,
			appState
		]
	);

	useEffect(() => {
		// socket.on(EVENTS.message, ({ message }: messageDataType) => {
		// 	console.log('Its is message event');
		// 	// const newLatestMessages = { ...latestMessages, [message.to]: message };
		// 	// setLatestMessages(newLatestMessages);
		// 	setMessages([
		// 		message,
		// 		...messages
		// 	]);
		// });

		socket.on(EVENTS.contactCameOnline, ({ socketId, userId }: contactCameOnlineDataType) => {
			setContactAsOnline(userId, socketId as any);
		});

		socket.on(EVENTS.contactGoneOffline, ({ socketId, userId }: contactGoneOfflineDataType) => {
			setContactAsOffline(userId);
		});
	}, []);
	// console.log(appState);
	if (socket) {
		if (appState === 'background') {
			socket.emit('disconnect');
			socket.off();
		}
	}
	useEffect(
		() => {
			launch();
		},
		[
			isReady
		]
	);
	const launch = async () => {
		if (isReady) {
			// await SplashScreen.hideAsync();
			setTimeout(() => SplashScreen.hideAsync(), 2000);
		}
	};
	const [
		loaded
	] = useFonts({
		UbuntuRegular: require('./assets/fonts/Ubuntu-Regular.ttf'),
		UbuntuLight: require('./assets/fonts/Ubuntu-Light.ttf'),
		UbuntuMedium: require('./assets/fonts/Ubuntu-Medium.ttf'),
		UbuntuBold: require('./assets/fonts/Ubuntu-Bold.ttf')
	});
	if (!loaded || !isReady) {
		return (
			<AppLoading
				autoHideSplash={false}
				onError={(error) => console.log('Error from AppLoading', error)}
				startAsync={() => getDataFromAsyncStorageOnStart(b, c, d)}
				onFinish={() => setIsReady(true)}
			/>
		);
	}
	console.log(appState);
	return (
		<PaperProvider>
			<AppNavigationContainer />
			{/* <View style={{ flex: 1 }}>
				<MessageInput placeholder="Type message ...." onPressSend={() => console.log('Pressed Send')} />
			</View> */}
		</PaperProvider>
	);
}
