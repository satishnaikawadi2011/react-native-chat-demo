import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { GestureResponderEvent, TextInput, ViewStyle } from 'react-native';
import { StyleSheet, TextInputProps, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { DEVICE_WIDTH } from '../../../constants';
import { Colors } from '../../../constants/colors';

interface Props extends TextInputProps {
	onPressSend?: ((event: GestureResponderEvent) => void) | undefined;
	style?: ViewStyle;
}

const MessageInput: React.FC<Props> = ({ onPressSend, style, ...props }) => {
	const theme = useTheme();
	return (
		<View
			style={[
				styles.container,
				style
			]}
		>
			<FontAwesome5 name="smile" style={{ marginRight: 10 }} size={30} color={Colors.primary} />
			<TextInput
				placeholderTextColor={theme.colors.placeholder}
				style={[
					styles.textInput
				]}
				{...props}
			/>
			<MaterialCommunityIcons
				onPress={onPressSend}
				name="send"
				size={35}
				style={{ marginLeft: 10 }}
				color={Colors.primary}
			/>
		</View>
	);
};

export default MessageInput;

const styles = StyleSheet.create({
	textInput:
		{
			fontFamily: 'UbuntuRegular',
			fontSize: 18,
			backgroundColor: Colors.white,
			width: '80%',
			height: 45,
			borderRadius: 50,
			padding: 5,
			paddingHorizontal: 25,
			shadowColor: '#000',
			shadowOffset:
				{
					width: 0,
					height: 1
				},
			shadowOpacity: 0.22,
			shadowRadius: 2.22,

			elevation: 3
		},
	container:
		{
			marginTop: 10,
			flexDirection: 'row',
			width: DEVICE_WIDTH,
			paddingVertical: 5,
			paddingHorizontal: 20,
			height: 70,
			alignSelf: 'center',
			alignItems: 'center',
			overflow: 'hidden',
			backgroundColor: '#e6e6e6'
			// backgroundColor: 'red'
		}
});
