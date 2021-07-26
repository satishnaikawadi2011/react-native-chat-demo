import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../../../constants/colors';
import { ActivityIndicator, Text } from 'react-native-paper';

interface ButtonProps {
	title: string;
	bgColor?: string;
	titleColor?: string;
	loading?: boolean;
	onPress?: any;
	disabled?: boolean;
}

const AppButton: React.FC<ButtonProps> = ({
	title,
	bgColor = Colors.primary,
	titleColor = Colors.white,
	loading = false,
	onPress = () => {},
	disabled
}) => {
	return (
		<Pressable
			onPress={

					disabled ? () => {} :
					onPress
			}
			style={{
				...styles.button,
				backgroundColor: bgColor,
				opacity:

						disabled ? 0.7 :
						1
			}}
		>
			{
				loading ? <ActivityIndicator size="small" color={Colors.white} /> :
				<Text style={{ ...styles.text, color: titleColor }}>{title}</Text>}
		</Pressable>
	);
};

export default AppButton;

const styles = StyleSheet.create({
	button:
		{
			backgroundColor: Colors.primary,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 25,
			padding: 15,
			width: '100%',
			marginVertical: 10
		},
	text:
		{
			color: Colors.white,
			fontSize: 18,
			textTransform: 'uppercase',
			fontWeight: 'bold'
		}
});
