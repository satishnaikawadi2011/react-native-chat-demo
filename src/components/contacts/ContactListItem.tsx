import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, List, Paragraph } from 'react-native-paper';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage';
import myRelTime from '../../utils/myRelativeTime';

interface Props {
	username: string;
	latestMessage: string;
	avatar: AvatarImageSource;
	onPress?: any;
	createdAt: string;
}

const ContactListItem: React.FC<Props> = ({ avatar, latestMessage, username, onPress, createdAt }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View>
				<List.Item
					title={username}
					description={latestMessage}
					left={(props) => <Avatar.Image {...props} source={avatar} />}
					right={(props) => <Paragraph {...props}>{myRelTime(new Date(), new Date(createdAt))}</Paragraph>}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ContactListItem;

const styles = StyleSheet.create({});
