import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

export type AuthStackParamList = {
	Welcome: undefined;
	Login: undefined;
	Register: undefined;
};

const StackNavigator = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
	return (
		<StackNavigator.Navigator screenOptions={{ headerShown: false }}>
			<StackNavigator.Screen name="Welcome" component={WelcomeScreen} />
			<StackNavigator.Screen name="Login" component={LoginScreen} />
			<StackNavigator.Screen name="Register" component={SignupScreen} />
		</StackNavigator.Navigator>
	);
};

export default AuthNavigator;
