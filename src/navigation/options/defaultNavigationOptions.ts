import { Platform } from 'react-native';
import { Colors } from '../../../constants/colors';

export const defaltNavOptions = {
	headerStyle:
		{
			backgroundColor:

					Platform.OS === 'android' ? Colors.primary :
					''
		},
	headerBackTitleStyle:
		{
			fontFamily: 'Ubuntu'
		},
	headerTitleStyle:
		{
			fontFamily: 'UbuntuBold'
		},
	headerTintColor:

			Platform.OS === 'android' ? 'white' :
			Colors.primary
};
