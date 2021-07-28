import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import { useAuthStore } from './src/store/auth';
import AppNavigationContainer from './src/navigation/AppNavigationContainer';
import { Provider as PaperProvider } from 'react-native-paper';
import getDataFromAsyncStorageOnStart from './src/utils/getDataFromAsyncStorageOnStart';

export default function App() {
	const [
		isReady,
		setIsReady
	] = useState(false);
	const { setExpiryDate: b, setUser: c, setToken: d } = useAuthStore();
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
			<AppNavigationContainer />
			{/* <View style={{ flex: 1 }}>
				{messages.reverse().map((m) => {
					return <MessageBubble message={m} key={m._id} />;
				})}
			</View> */}
		</PaperProvider>
	);
}
