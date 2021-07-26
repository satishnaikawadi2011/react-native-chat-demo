import { createStackNavigator } from '@react-navigation/stack';
import { defaltNavOptions } from './options/defaultNavigationOptions';
import React from 'react';
import ContactListScreen, { screenOptions as ContactListScreenOptions } from '../screens/ContactListScreen';

export type HomeStackParamList = {
	ContactList: undefined;
};

const HomeStackNavigator = createStackNavigator<HomeStackParamList>();

const AppNavigator = () => {
	return (
		<HomeStackNavigator.Navigator screenOptions={defaltNavOptions}>
			<HomeStackNavigator.Screen
				name="ContactList"
				component={ContactListScreen}
				options={ContactListScreenOptions}
			/>
		</HomeStackNavigator.Navigator>
	);
};

export default AppNavigator;
