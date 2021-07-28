import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme } from '@react-navigation/native';

interface Props {
	visible: boolean;
}

const AppActivityIndicator: React.FC<Props> = ({ visible }) => {
	const theme = useTheme();
	if (!visible) return null;
	return (
		<LottieView
			source={require('../../assets/animations/loader.json')}
			autoPlay
			loop
			style={{ backgroundColor: theme.colors.background }}
		/>
	);
};

export default AppActivityIndicator;

const styles = StyleSheet.create({});
