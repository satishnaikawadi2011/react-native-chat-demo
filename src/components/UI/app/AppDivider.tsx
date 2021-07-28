import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';

const AppDivider: React.FC<ViewProps> = ({ style, ...props }) => {
	const theme = useTheme();
	return (
		<View
			style={[
				styles.divider,
				{ backgroundColor: theme.colors.placeholder, height: 0.4 },
				style
			]}
			{...props}
		/>
	);
};

export default AppDivider;

const styles = StyleSheet.create({
	divider:
		{
			width: '100%',
			marginVertical: 5
		}
});
