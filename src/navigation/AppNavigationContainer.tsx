import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../store/auth';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import client from '../api/client';

const AppNavigationContainer = () => {
	const { user,expiryDate,token } = useAuthStore();
	const isTokenExpired = expiryDate?.getTime() === new Date().getTime();
	if (user && !isTokenExpired) {
		client.setHeader('Authorization', `Bearer ${token}`);
	}
	return (
		<React.Fragment>
			<NavigationContainer>
			{
				user && !isTokenExpired ? <AppNavigator /> :
				<AuthNavigator />}
		</NavigationContainer>
		</React.Fragment>
	);
};

export default AppNavigationContainer;
