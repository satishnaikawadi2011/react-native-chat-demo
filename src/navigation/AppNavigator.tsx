import { createStackNavigator } from '@react-navigation/stack';
import { defaltNavOptions } from './options/defaultNavigationOptions';
import React from 'react';
import ContactListScreen, { screenOptions as ContactListScreenOptions } from '../screens/ContactListScreen';
import { User } from '../models/User';
import ChatScreen, { screenOptions as ChatScreenOptions } from '../screens/ChatScreen';

export type HomeStackParamList = {
	ContactList: undefined;
	Chat: { contact: User };
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
			<HomeStackNavigator.Screen name="Chat" component={ChatScreen} options={ChatScreenOptions} />
		</HomeStackNavigator.Navigator>
	);
};

export default AppNavigator;
