import { Feather, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { DEVICE_WIDTH } from '../../../constants';
import { Colors } from '../../../constants/colors';
import { Message } from '../../models/Message';
import { useAuthStore } from '../../store/auth';
import PendingIcon from '../../svgs/PendingIcon';

interface Props {
	message: Message;
}

const MessageBubble: React.FC<Props> = ({ message }) => {
    const { user } = useAuthStore();
    let style;
    switch (message.from) {
        case user?.username:
            style = styles.me;
            break;
        case 'server':
            style = styles.server;
            break;
        default:
            style = styles.otherUser
            break;
    }
	return (
		<View
			style={[styles.common,style,	
			]}
		>
			<Text style={styles.text}>{message.content}</Text>
			{message.isSent && message.from !== 'server' && message.from === user?.username && <MaterialIcons name="done" size={15} color={Colors.white} style={styles.icon} />}
			{!message.isSent && message.from !== 'server' && message.from === user?.username && <Feather name="clock" size={15} color={Colors.white} style={styles.icon} />}
		</View>
	);
};

export default MessageBubble;

const styles = StyleSheet.create({
	server:
		{
			maxWidth: DEVICE_WIDTH * 0.8,
			alignSelf: 'center',
            backgroundColor: '#000000',
            marginVertical:8
		},
	me:
		{
			backgroundColor: Colors.primary,
			borderTopRightRadius: 0,
            alignSelf:'flex-end'
		},
	otherUser:
		{
			backgroundColor: '#999999',
			borderTopLeftRadius: 0,
			alignSelf:'flex-start'
		},
	text:
		{
			color: Colors.white,
		textAlign: 'left',
			marginRight:20
		},
	common:
		{
			maxWidth: DEVICE_WIDTH * 0.6,
			minWidth: DEVICE_WIDTH * 0.2,
			padding: 10,
			borderRadius: 15,
			marginVertical: 1.5,
		    marginHorizontal: 15,
		flexDirection: 'row',
			position:'relative'
	},
	icon: {
		alignSelf: 'baseline',
		position: 'absolute',
		right: 0,
		bottom: 0,
		padding: 5,
	}
});
