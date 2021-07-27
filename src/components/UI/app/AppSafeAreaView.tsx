import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, StyleProp, ViewStyle } from 'react-native';

interface Props {
	style: StyleProp<ViewStyle>;
}

const AppSafeAreaView: React.FC<Props> = ({ children, style }) => {
	return (
		<SafeAreaView
			style={[
				styles.view,
				style
			]}
		>
			{children}
		</SafeAreaView>
	);
};

export default AppSafeAreaView;

const styles = StyleSheet.create({
	view:
		{
			marginTop: StatusBar.currentHeight
		}
});
