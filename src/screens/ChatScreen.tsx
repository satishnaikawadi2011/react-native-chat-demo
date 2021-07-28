import { RouteProp } from '@react-navigation/core';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';

import { HomeStackParamList } from '../navigation/AppNavigator';
import { centered } from '../utils/commonStyles';

type ChatScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Chat'>;

type ChatScreenRouteProp = RouteProp<HomeStackParamList, 'Chat'>;

interface ChatScreenProps {
	navigation: ChatScreenNavigationProp;
	route: ChatScreenRouteProp;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation, route }) => {
	return (
		<View style={centered}>
			<Text>Chat Screen</Text>
		</View>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({});

export const screenOptions:
	| StackNavigationOptions
	| ((
			props: {
				route: RouteProp<HomeStackParamList, 'Chat'>;
				navigation: any;
			}
		) => StackNavigationOptions)
	| undefined = ({ route }) => {
	return {
		title: route.params.contact.username
		// headerRight: () => <ExitButton />
	};
};
