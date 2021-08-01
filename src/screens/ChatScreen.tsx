import { RouteProp } from '@react-navigation/core';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { HomeStackParamList } from '../navigation/AppNavigator';
import messagesApi from '../api/message';
import useApi from '../hooks/useApi';
import { useMessageStore } from '../store/message';
import AppActivityIndicator from '../animations/AppActivityIndicator';
import MessageBubble from '../components/messages/MessageBubble';
import MessageInput from '../components/messages/MessageInput';
import 'react-native-get-random-values';
// import socket from '../api/socketClient';
import { EVENTS, messageDataType } from '../utils/socketRelFunctions';
import { Message } from '../models/Message';
import { nanoid } from 'nanoid';
import { useAuthStore } from '../store/auth';
import { useSocketStore } from '../store/socket';

type ChatScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Chat'>;

type ChatScreenRouteProp = RouteProp<HomeStackParamList, 'Chat'>;

interface ChatScreenProps {
	navigation: ChatScreenNavigationProp;
	route: ChatScreenRouteProp;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation, route }) => {
	const messaagesListRef: any = useRef();
	const contact = route.params.contact;
	const [
		msg,
		setMsg
	] = useState('');
	const {
		currentPage,
		messages,
		totalPages,
		setCurrentPage,
		setTotalPages,
		setMessages,
		setMsgAsSent,
		addNewMessage
	} = useMessageStore();
	const { socket } = useSocketStore();
	const { user } = useAuthStore();

	const messagesRes = useApi(messagesApi.getMessages);
	const sendMsgRes = useApi(messagesApi.sendMessage);

	const handleMessageSend = () => {
		if (msg.trim() === '') {
			// console.log('ref');
			// console.log(
			// messaagesListRef.current._listRef.__reactInternalMemoizedMergedChildContext.virtualizedList.getScrollMetrics();
			// );
			return;
		}
		const message: Message = {
			_id: nanoid(),
			cause: 'server',
			from: user!.username,
			__v: 11,
			content: msg,
			createdAt: new Date().toISOString(),
			seen: false,
			to: contact.username,
			updatedAt: new Date().toISOString(),
			type: 'personal',
			clientSideId: nanoid(),
			isSent: false
		};

		setMsg('');

		addNewMessage(message, 'From sendHandler');

		sendMsgRes.request({
			content: message.content,
			to: contact._id,
			clientSideId: message.clientSideId,
			token: ''
		});
		// }
	};

	useEffect(
		() => {
			if (!sendMsgRes.loading && !sendMsgRes.error) {
				const data: any = sendMsgRes.data;
				if (data) {
					setMsgAsSent(data, contact.username);
					if (contact.isOnline) {
						socket.emit(EVENTS.sendMessage, {
							message: data,
							uId: contact._id
						});
					}
				}
			}
		},
		[
			sendMsgRes.loading,
			sendMsgRes.data,
			sendMsgRes.error
		]
	);

	useEffect(() => {
		socket.on(EVENTS.message, ({ message }: messageDataType) => {
			if (contact) {
				if (user?.username === message.from) {
					console.log('Its Wrong')
				}
				addNewMessage(message, 'From message listener');
			}
		});

		return () => {
			socket.off();
		};
	}, []);

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
				setMessages(data.messages.map((m: any) => ({ ...m, isSent: true })));
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
			{/* <ScrollView
				onContentSizeChange={() => messaagesListRef.current.scrollToEnd({ animated: true })}
				style={{ flexGrow: 1 }}
				ref={messaagesListRef}
			>
				{messages.map((m) => {
					return <MessageBubble key={m._id} message={m} />;
				})}
			</ScrollView> */}
			<FlatList
				// inverted={true}
				onContentSizeChange={() => messaagesListRef.current.scrollToEnd({ animated: true })}
				style={{ flexGrow: 1 }}
				keyExtractor={(item) => item._id}
				data={messages}
				ref={messaagesListRef}
				renderItem={({ item }) => {
					return <MessageBubble key={item._id} message={item} />;
				}}
			/>
			<MessageInput
				value={msg}
				onChangeText={(text) => setMsg(text)}
				placeholder=" Type message ...."
				onPressSend={handleMessageSend}
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
