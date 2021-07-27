import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import AppButton from '../../components/UI/app/Button';
import WelcomeIllustration from '../../svgs/Welcome';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../constants';

type WelcomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>;

interface WelcomeScreenProps {
	navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
	useEffect(() => {
		console.log('on welcome');
	}, []);
	return (
		<View style={styles.background}>
			<WelcomeIllustration height={DEVICE_HEIGHT * 0.7} width={DEVICE_WIDTH} />
			<View style={styles.buttonsContainer}>
				<AppButton
					title="login"
					onPress={() => {
						navigation.navigate('Login');
					}}
				/>
				<AppButton
					title="register"
					bgColor={Colors.accent}
					onPress={() => {
						navigation.navigate('Register');
					}}
				/>
			</View>
		</View>
	);
};

export default WelcomeScreen;

const styles = StyleSheet.create({
	background:
		{
			flex: 1,
			alignItems: 'center',
			justifyContent: 'flex-end'
		},
	buttonsContainer:
		{
			width: '100%',
			padding: 20
		},
	logo:
		{
			width: 200,
			height: 200,
			position: 'absolute',
			top: 50
		}
});
