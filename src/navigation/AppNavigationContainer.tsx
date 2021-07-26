import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../store/auth';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const AppNavigationContainer = () => {
	const { user,expiryDate } = useAuthStore();
	const isTokenExpired = expiryDate?.getTime() === new Date().getTime()
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
