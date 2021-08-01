import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

const useAppState = () => {
	const appState = useRef(AppState.currentState);
	const [
		appStateVisible,
		setAppStateVisible
	] = useState(appState.current);

	useEffect(() => {
		AppState.addEventListener('change', _handleAppStateChange);

		return () => {
			AppState.removeEventListener('change', _handleAppStateChange);
		};
	}, []);

	const _handleAppStateChange = (nextAppState: any) => {
		// if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
		// 	console.log('App has come to the foreground!');
		// }

		appState.current = nextAppState;
		setAppStateVisible(appState.current);
		// console.log('AppState', appState.current);
	};

	return appStateVisible;
};

export default useAppState;
