import React from 'react';
import { Platform, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useAuthStore } from '../../store/auth';
import CustomHeaderButton from '../navigation/CustomHeaderButton';

const ExitButton = () => {
	const { logout } = useAuthStore();
	return (
		<View style={{ marginRight: 10 }}>
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Logout"
					iconName={

							Platform.OS === 'android' ? 'md-exit' :
							'ios-exit'
					}
					onPress={() => {
						logout();
					}}
				/>
			</HeaderButtons>
		</View>
	);
};

export default ExitButton;
