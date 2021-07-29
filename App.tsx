import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import { useAuthStore } from './src/store/auth';
import AppNavigationContainer from './src/navigation/AppNavigationContainer';
import { Provider as PaperProvider } from 'react-native-paper';
import getDataFromAsyncStorageOnStart from './src/utils/getDataFromAsyncStorageOnStart';
import { View } from 'react-native';
import MessageInput from './src/components/messages/MessageInput';
// import { io } from 'socket.io-client';

export default function App() {
	const [
		isReady,
		setIsReady
	] = useState(false);
	const { setExpiryDate: b, setUser: c, setToken: d } = useAuthStore();
	// useEffect(() => {
	// 	const socket = io('http://localhost:5000');
	// 	socket.emit('online', { socketId: 'ksksk', userId: 'skksksks' });
	// }, []);
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
	return (
		<PaperProvider>
			{/* <AppNavigationContainer /> */}
			<View style={{ flex: 1 }}>
				<MessageInput placeholder="Type message ...." onPressSend={() => console.log('Pressed Send')} />
			</View>
		</PaperProvider>
	);
}
