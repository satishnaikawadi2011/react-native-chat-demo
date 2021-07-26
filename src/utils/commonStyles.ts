import { DEVICE_WIDTH } from './../../constants/index';
import { StyleProp, ViewStyle } from 'react-native';

export const centered: StyleProp<ViewStyle> = {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	width: DEVICE_WIDTH
};

export const fab: StyleProp<ViewStyle> = {
	position: 'absolute',
	margin: 16,
	right: 0,
	bottom: 0
};
