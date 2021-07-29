import { RouteProp } from '@react-navigation/core';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';

import { HomeStackParamList } from '../navigation/AppNavigator';
import messagesApi from '../api/message';
import useApi from '../hooks/useApi';
import { useMessageStore } from '../store/message';
import AppActivityIndicator from '../animations/AppActivityIndicator';
import MessageBubble from '../components/messages/MessageBubble';

type ChatScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Chat'>;

type ChatScreenRouteProp = RouteProp<HomeStackParamList, 'Chat'>;

interface ChatScreenProps {
	navigation: ChatScreenNavigationProp;
	route: ChatScreenRouteProp;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation, route }) => {
	const contact = route.params.contact;
	const { currentPage, messages, totalPages, setCurrentPage, setTotalPages, setMessages } = useMessageStore();

	const messagesRes = useApi(messagesApi.getMessages);

	useEffect(
		() => {
			messagesRes.request(contact._id, currentPage);
		},
		[
			currentPage
		]
	);

	useEffect(
		() => {
			const data = messagesRes.data as any;
			if (data) {
				setMessages(data.messages);
				setTotalPages(data.totalPages);
			}
		},
		[
			messagesRes.data
		]
	);

	if (messagesRes.loading) {
		return <AppActivityIndicator visible={true} />;
	}

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				keyExtractor={(item) => item._id}
				data={messages.reverse()}
				renderItem={({ item }) => {
					return <MessageBubble message={item} />;
				}}
			/>
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
