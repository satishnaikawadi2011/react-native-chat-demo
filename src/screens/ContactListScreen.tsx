import { RouteProp } from '@react-navigation/core';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ContactListItem from '../components/contacts/ContactListItem';
import ExitButton from '../components/headerButtons/ExitButton';

import useApi from '../hooks/useApi';
import { HomeStackParamList } from '../navigation/AppNavigator';
import contactsApi from '../api/contact';
import messagesApi from '../api/message';
import { useAuthStore } from '../store/auth';
import { centered } from '../utils/commonStyles';
// import ErrorScreen from './ErrorScreen';
import AppActivityIndicator from '../animations/AppActivityIndicator';
import { useContactStore } from '../store/contact';
import { Title } from 'react-native-paper';
import SadEmojiIcon from '../svgs/SadEmojiIcon';
import { useMessageStore } from '../store/message';
import AppDivider from '../components/UI/app/AppDivider';
import socket from '../api/socketClient';
import { EVENTS, contactCameOnlineDataType, contactGoneOfflineDataType } from '../utils/socketRelFunctions';

type ContactListScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'ContactList'>;

type ContactListScreenRouteProp = RouteProp<HomeStackParamList, 'ContactList'>;

interface ContactLisScreenProps {
	navigation: ContactListScreenNavigationProp;
	route: ContactListScreenRouteProp;
}

const ContactListScreen: React.FC<ContactLisScreenProps> = ({ navigation, route }) => {
	const { contacts, setContacts } = useContactStore();
	// const { latestMessages, setLatestMessages } = useMessageStore();
	const { token } = useAuthStore();

	const contactsRes = useApi(contactsApi.getContacts);
	const messagesRes = useApi(messagesApi.getLatestMessages);

	useEffect(
		() => {
			if (token) {
				request();
			}
		},
		[
			token
		]
	);

	useEffect(
		() => {
			if (contactsRes.data && messagesRes.data) {
				setContacts(contactsRes.data as any);
				// setLatestMessages(messagesRes.data);
			}
		},
		[
			contactsRes.data,
			messagesRes.data
		]
	);

	const request = () => {
		contactsRes.request();
		messagesRes.request();
	};

	if (contactsRes.loading || messagesRes.loading) {
		return <AppActivityIndicator visible={true} />;
	}

	// if (categoriesRes.error || productsRes.error) {
	// 	return <ErrorScreen errorMessage='Could not load product listings !!' icon='alert' ButtonComponent={<Button mode='contained' onPress={request}>Try Again</Button>}/>
	// }
	return (
		<View style={{ flex: 1 }}>
			{
				contacts.length === 0 ? <View
					style={[
						centered
					]}
				>
					<SadEmojiIcon height={150} width={150} />
					<Title style={styles.title}>No contacts found !!</Title>
				</View> :
				<FlatList
					keyExtractor={(item) => item._id}
					data={contacts}
					renderItem={({ item }) => {
						return (
							<View>
								<ContactListItem
									onPress={() => navigation.navigate('Chat', { contact: item })}
									username={item.username}
									// latestMessage={latestMessages[item.username].content}
									latestMessage={'WWE'}
									avatar={require('../../assets/user.png')}
									createdAt={new Date().toISOString()}
								/>
								<AppDivider />
							</View>
						);
					}}
				/>}
		</View>
	);
};

export default ContactListScreen;

const styles = StyleSheet.create({
	title:
		{
			fontSize: 20,
			marginVertical: 20
		}
});

export const screenOptions:
	| StackNavigationOptions
	| ((
			props: {
				route: RouteProp<HomeStackParamList, 'ContactList'>;
				navigation: any;
			}
		) => StackNavigationOptions)
	| undefined = ({ route }) => {
	return {
		title: 'GupShup',
		headerRight: () => <ExitButton />
	};
};
