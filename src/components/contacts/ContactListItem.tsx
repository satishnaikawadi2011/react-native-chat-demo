import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage';

interface Props {
	username: string;
	latestMessage: string;
	avatar: AvatarImageSource;
	onPress?: any;
}

const ContactListItem: React.FC<Props> = ({ avatar, latestMessage, username, onPress }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View>
				<List.Item
					title={username}
					description={latestMessage}
					left={(props) => <Avatar.Image {...props} source={avatar} />}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ContactListItem;

const styles = StyleSheet.create({});
